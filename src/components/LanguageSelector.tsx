import React from 'react';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../utils/responses';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5 text-gray-400" />
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
        className="bg-gray-800 text-gray-100 rounded-lg border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-700 transition-colors"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};