import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-900/50 border-green-700/50';
      case 'negative':
        return 'bg-red-900/50 border-red-700/50';
      default:
        return isBot ? 'bg-blue-900/50 border-blue-700/50' : 'bg-purple-900/50 border-purple-700/50';
    }
  };

  return (
    <div className={`flex items-start gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        isBot ? 'bg-blue-600' : 'bg-purple-600'
      }`}>
        {isBot ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
      </div>
      <div className={`max-w-[70%] rounded-xl px-5 py-3 border ${getSentimentColor(message.sentiment)}`}>
        <p className="text-gray-100">{message.text}</p>
        <div className="flex gap-3 text-xs text-gray-400 mt-2">
          {message.language && (
            <span className="bg-gray-800 px-2 py-1 rounded-md">
              {message.language}
            </span>
          )}
          {message.sentiment && (
            <span className="bg-gray-800 px-2 py-1 rounded-md">
              {message.sentiment}
            </span>
          )}
          {message.topic && (
            <span className="bg-gray-800 px-2 py-1 rounded-md">
              {message.topic}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};