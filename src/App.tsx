import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { Send, Bot } from 'lucide-react';
import { franc } from 'franc';
import { franc as francMin } from 'franc-min';
import LanguageDetect from 'languagedetect';
import { iso6393 } from 'iso-639-3';
import { analyzeContext } from './utils/analysis';
import { generateContextualResponse, SUPPORTED_LANGUAGES } from './utils/responses';

const lngDetector = new LanguageDetect();

const detectLanguage = (text: string): string => {
  // Use multiple language detection methods for better accuracy
  const francResult = franc(text);
  const francMinResult = francMin(text);
  const languageDetectResult = lngDetector.detect(text)?.[0]?.[0];

  // Find the ISO language code that matches any of our detection results
  const isoLang = iso6393.find(lang => 
    lang.iso6393 === francResult || 
    lang.iso6393 === francMinResult || 
    lang.name.toLowerCase() === languageDetectResult?.toLowerCase()
  );

  // Return the detected language code if supported, otherwise default to English
  return SUPPORTED_LANGUAGES.some(lang => lang.code === isoLang?.iso6393) ? isoLang?.iso6393 : 'eng';
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const detectedLanguage = detectLanguage(input);
      const context = analyzeContext(input);

      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        language: detectedLanguage,
        sentiment: context.sentiment,
        topic: context.topic,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');

      // Generate response in the same language as the user's message
      const response = generateContextualResponse(context, detectedLanguage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        language: detectedLanguage,
        sentiment: context.sentiment,
        topic: context.topic,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="bg-gray-900 rounded-2xl shadow-2xl flex-1 flex flex-col border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Multilingual Assistant
              </h1>
            </div>
            <p className="text-gray-400 mt-2">Intelligent responses with automatic language detection and sentiment analysis</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bot className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg">Start a conversation in any language</p>
                <p className="text-sm">I'll automatically detect your language and respond accordingly</p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-gray-800">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message in any language..."
                className="flex-1 bg-gray-800 rounded-xl border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className={`bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 transition-colors flex items-center justify-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;