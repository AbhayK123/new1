// Enhanced sentiment analysis with weighted keywords and contextual patterns
const SENTIMENT_PATTERNS = {
  positive: {
    strong: {
      words: ['excellent', 'amazing', 'outstanding', 'perfect', 'brilliant', 'fantastic', 'wonderful', 'superb', 'incredible'],
      weight: 2.0
    },
    moderate: {
      words: ['good', 'great', 'happy', 'pleased', 'glad', 'nice', 'enjoy', 'satisfied', 'love', 'like', 'helpful'],
      weight: 1.0
    },
    mild: {
      words: ['okay', 'fine', 'alright', 'cool', 'decent', 'better'],
      weight: 0.5
    }
  },
  negative: {
    strong: {
      words: ['terrible', 'horrible', 'awful', 'dreadful', 'disastrous', 'pathetic', 'disgusting', 'furious', 'hate'],
      weight: -2.0
    },
    moderate: {
      words: ['bad', 'poor', 'sad', 'angry', 'upset', 'annoyed', 'disappointed', 'frustrated', 'dislike'],
      weight: -1.0
    },
    mild: {
      words: ['not good', 'not great', 'meh', 'could be better', 'mediocre', 'worse'],
      weight: -0.5
    }
  }
};

// Emotional modifiers that can intensify sentiment
const EMOTIONAL_MODIFIERS = {
  intensifiers: {
    words: ['very', 'really', 'extremely', 'absolutely', 'totally', 'completely', 'highly'],
    multiplier: 1.5
  },
  diminishers: {
    words: ['somewhat', 'kind of', 'sort of', 'a little', 'slightly', 'barely'],
    multiplier: 0.5
  },
  negators: {
    words: ['not', 'never', 'no', "don't", "doesn't", "won't", 'cannot', "can't"],
    multiplier: -1
  }
};

// Topic-specific sentiment patterns
const TOPIC_KEYWORDS = {
  technical: {
    positive: ['works', 'fixed', 'solved', 'improved', 'optimized', 'efficient', 'reliable', 'stable'],
    negative: ['broken', 'bug', 'error', 'crash', 'slow', 'unstable', 'failed', 'issue'],
    weight: 1.2
  },
  personal: {
    positive: ['proud', 'inspired', 'motivated', 'confident', 'relaxed', 'comfortable'],
    negative: ['stressed', 'worried', 'anxious', 'confused', 'uncomfortable', 'overwhelmed'],
    weight: 1.5
  },
  question: ['how', 'what', 'why', 'when', 'where', 'who', 'can', 'could', 'would'],
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  farewell: ['goodbye', 'bye', 'see you', 'talk to you later', 'take care']
};

// Communication style patterns
const STYLE_PATTERNS = {
  emoji: /[\u{1F300}-\u{1F9FF}]/u,
  abbreviations: /(lol|omg|tbh|idk|imo|fyi|asap|btw)/i,
  punctuation: {
    ellipsis: /\.{3,}/g,
    exclamation: /!/g,
    question: /\?/g,
    multiPunctuation: /(!|\?){2,}/g
  },
  casing: {
    allCaps: /^[A-Z\s]+$/,
    mixedCaps: /[A-Z][a-z]*[A-Z]/
  }
};

function analyzeMessageStyle(text: string) {
  return {
    hasEmoji: STYLE_PATTERNS.emoji.test(text),
    hasAbbreviations: STYLE_PATTERNS.abbreviations.test(text),
    punctuationStyle: {
      hasEllipsis: STYLE_PATTERNS.punctuation.ellipsis.test(text),
      exclamationCount: (text.match(STYLE_PATTERNS.punctuation.exclamation) || []).length,
      questionCount: (text.match(STYLE_PATTERNS.punctuation.question) || []).length,
      hasMultiPunctuation: STYLE_PATTERNS.punctuation.multiPunctuation.test(text)
    },
    casing: {
      isAllCaps: STYLE_PATTERNS.casing.allCaps.test(text),
      hasMixedCaps: STYLE_PATTERNS.casing.mixedCaps.test(text)
    },
    averageWordLength: text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / text.split(/\s+/).length,
    sentenceLength: text.split(/[.!?]+/).filter(Boolean).length,
    wordCount: text.split(/\s+/).length
  };
}

function findEmotionalModifiers(text: string, baseScore: number): number {
  let score = baseScore;
  const words = text.toLowerCase().split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    if (EMOTIONAL_MODIFIERS.intensifiers.words.includes(word)) {
      score *= EMOTIONAL_MODIFIERS.intensifiers.multiplier;
      continue;
    }
    
    if (EMOTIONAL_MODIFIERS.diminishers.words.includes(word)) {
      score *= EMOTIONAL_MODIFIERS.diminishers.multiplier;
      continue;
    }
    
    if (EMOTIONAL_MODIFIERS.negators.words.includes(word) && i < words.length - 1) {
      const nextWord = words[i + 1];
      const isPositiveWord = [...SENTIMENT_PATTERNS.positive.strong.words, ...SENTIMENT_PATTERNS.positive.moderate.words, ...SENTIMENT_PATTERNS.positive.mild.words].includes(nextWord);
      const isNegativeWord = [...SENTIMENT_PATTERNS.negative.strong.words, ...SENTIMENT_PATTERNS.negative.moderate.words, ...SENTIMENT_PATTERNS.negative.mild.words].includes(nextWord);
      
      if (isPositiveWord || isNegativeWord) {
        score *= EMOTIONAL_MODIFIERS.negators.multiplier;
        i++;
      }
    }
  }
  
  return score;
}

function calculateTopicSentimentScore(text: string, topic: string): number {
  let score = 0;
  const lowerText = text.toLowerCase();
  
  if (topic in TOPIC_KEYWORDS) {
    const topicPatterns = TOPIC_KEYWORDS[topic as keyof typeof TOPIC_KEYWORDS];
    if ('positive' in topicPatterns && 'negative' in topicPatterns) {
      const { positive, negative, weight } = topicPatterns as { positive: string[], negative: string[], weight: number };
      
      positive.forEach(word => {
        if (lowerText.includes(word)) score += weight;
      });
      
      negative.forEach(word => {
        if (lowerText.includes(word)) score -= weight;
      });
    }
  }
  
  return score;
}

function analyzeSentimentScore(text: string): number {
  let score = 0;
  const lowerText = text.toLowerCase();
  
  Object.entries(SENTIMENT_PATTERNS).forEach(([sentiment, categories]) => {
    Object.entries(categories).forEach(([intensity, { words, weight }]) => {
      words.forEach(word => {
        if (lowerText.includes(word)) {
          score += sentiment === 'positive' ? weight : -weight;
        }
      });
    });
  });
  
  score = findEmotionalModifiers(text, score);
  
  let detectedTopic = 'general';
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (Array.isArray(keywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedTopic = topic;
        break;
      }
    }
  }
  
  score += calculateTopicSentimentScore(text, detectedTopic);
  
  return score;
}

export interface CommunicationStyle {
  messageStyle: ReturnType<typeof analyzeMessageStyle>;
  formality: 'formal' | 'informal';
  emotionalIntensity: 'high' | 'medium' | 'low';
  responseLength: 'long' | 'medium' | 'short';
}

export function analyzeContext(text: string): ContextAnalysis & { communicationStyle: CommunicationStyle } {
  const lowerText = text.toLowerCase();
  const sentimentScore = analyzeSentimentScore(text);
  const messageStyle = analyzeMessageStyle(text);
  
  const sentiment: 'positive' | 'negative' | 'neutral' = 
    sentimentScore > 0.5 ? 'positive' : 
    sentimentScore < -0.5 ? 'negative' : 
    'neutral';
  
  let topic = 'general';
  for (const [topicName, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (Array.isArray(keywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        topic = topicName;
        break;
      }
    }
  }
  
  const formalityIndicators = ['please', 'would you', 'could you', 'thank you', 'sincerely', 'regards'];
  const casualIndicators = ['hey', 'sup', 'gonna', 'wanna', 'ya'];
  
  const formalCount = formalityIndicators.filter(word => lowerText.includes(word)).length;
  const casualCount = casualIndicators.filter(word => lowerText.includes(word)).length;
  
  const formality = formalCount > casualCount ? 'formal' : 'informal';
  
  let questionType = null;
  if (text.includes('?')) {
    const questionWords = ['what', 'why', 'how', 'when', 'where', 'who'];
    for (const word of questionWords) {
      if (lowerText.startsWith(word)) {
        questionType = word as 'what' | 'why' | 'how' | 'when' | 'where' | 'who';
        break;
      }
    }
    if (!questionType && (lowerText.startsWith('do') || lowerText.startsWith('is') || lowerText.startsWith('are'))) {
      questionType = 'yes_no';
    }
  }

  const emotionalIntensity = 
    Math.abs(sentimentScore) > 1.5 ? 'high' :
    Math.abs(sentimentScore) > 0.5 ? 'medium' :
    'low';

  const responseLength = 
    messageStyle.wordCount > 20 ? 'long' :
    messageStyle.wordCount > 10 ? 'medium' :
    'short';

  const communicationStyle: CommunicationStyle = {
    messageStyle,
    formality,
    emotionalIntensity,
    responseLength
  };

  return {
    sentiment,
    topic,
    formality,
    questionType,
    communicationStyle
  };
}