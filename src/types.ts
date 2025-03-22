export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  language?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  topic?: string;
  timestamp: Date;
}

export interface ContextAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  topic: string;
  formality: 'formal' | 'informal';
  questionType?: 'what' | 'why' | 'how' | 'when' | 'where' | 'who' | 'yes_no' | null;
}

export interface CommunicationStyle {
  messageStyle: {
    hasEmoji: boolean;
    hasAbbreviations: boolean;
    punctuationStyle: {
      hasEllipsis: boolean;
      exclamationCount: number;
      questionCount: number;
      hasMultiPunctuation: boolean;
    };
    casing: {
      isAllCaps: boolean;
      hasMixedCaps: boolean;
    };
    averageWordLength: number;
    sentenceLength: number;
    wordCount: number;
  };
  formality: 'formal' | 'informal';
  emotionalIntensity: 'high' | 'medium' | 'low';
  responseLength: 'long' | 'medium' | 'short';
}