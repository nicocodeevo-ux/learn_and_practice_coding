
import React from 'react';

interface LessonSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SelectArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);


export const LessonSelector: React.FC<LessonSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  topics,
  selectedTopic,
  onTopicChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-secondary/50 p-6 rounded-xl shadow-lg border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="relative">
          <label htmlFor="language" className="block text-sm font-medium text-slate-400 mb-1">
            1. Choose a Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full appearance-none bg-primary border border-slate-600 rounded-md py-2 pl-3 pr-10 text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="">Select Language...</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-slate-400">
            <SelectArrowIcon />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="topic" className="block text-sm font-medium text-slate-400 mb-1">
            2. Pick a Topic
          </label>
          <select
            id="topic"
            value={selectedTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            disabled={!selectedLanguage || topics.length === 0}
            className="w-full appearance-none bg-primary border border-slate-600 rounded-md py-2 pl-3 pr-10 text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Topic...</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-slate-400">
             <SelectArrowIcon />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={!selectedLanguage || !selectedTopic || isLoading}
          className="w-full flex items-center justify-center bg-accent hover:bg-sky-400 text-primary font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-accent/50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Lesson...
            </>
          ) : 'Teach Me!'}
        </button>
      </div>
    </div>
  );
};
