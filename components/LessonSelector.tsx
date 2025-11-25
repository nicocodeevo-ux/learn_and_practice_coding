
import React, { useState } from 'react';

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

const FlameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c1.5 3.5 3 5 5 7-1.5 0-2.5 1-3 2 2 0 3.5 1.5 4 3 0 3.5-2.5 6-6 6s-6-2.5-6-6c0-1.5.5-3 1.5-4C8.5 8 10 6.5 12 2z" />
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
  const [hoveredLanguage, setHoveredLanguage] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(false);

  return (
    <div className="relative group">
      {/* Warm orange glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000"></div>

      <div className="relative bg-slate-900/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-2 border-orange-500/30 shadow-orange-500/10">
        {/* Header with warm icon */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/30">
            <FlameIcon className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent">
              Choose Your Learning Path
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">Take your time and learn at your own pace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Language Selector */}
          <div className="relative group/lang">
            <label htmlFor="language" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <span className="inline-block w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-orange-500/30">1</span>
              Choose a Language
            </label>
            <div className="relative">
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                onMouseEnter={() => setHoveredLanguage(true)}
                onMouseLeave={() => setHoveredLanguage(false)}
                className="w-full appearance-none bg-slate-800/80 backdrop-blur-sm border-2 border-orange-500/40 hover:border-orange-500/70 focus:border-orange-500 rounded-2xl py-4 pl-5 pr-12 text-base text-slate-200 font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 cursor-pointer shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
              >
                <option value="" className="bg-slate-800">Select Language...</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-slate-800">{lang}</option>
                ))}
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 transition-all duration-300 ${hoveredLanguage ? 'text-orange-400' : 'text-slate-400'}`}>
                <SelectArrowIcon />
              </div>
            </div>
          </div>

          {/* Topic Selector */}
          <div className="relative group/topic">
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <span className="inline-block w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-amber-500/30">2</span>
              Pick a Topic
            </label>
            <div className="relative">
              <select
                id="topic"
                value={selectedTopic}
                onChange={(e) => onTopicChange(e.target.value)}
                onMouseEnter={() => setHoveredTopic(true)}
                onMouseLeave={() => setHoveredTopic(false)}
                disabled={!selectedLanguage || topics.length === 0}
                className="w-full appearance-none bg-slate-800/80 backdrop-blur-sm border-2 border-amber-500/40 hover:border-amber-500/70 focus:border-amber-500 rounded-2xl py-4 pl-5 pr-12 text-base text-slate-200 font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all duration-300 cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-amber-500/40 disabled:hover:shadow-amber-500/10"
              >
                <option value="" className="bg-slate-800">Select Topic...</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic} className="bg-slate-800">{topic}</option>
                ))}
              </select>
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 transition-all duration-300 ${hoveredTopic && !(!selectedLanguage || topics.length === 0) ? 'text-amber-400' : 'text-slate-400'}`}>
                <SelectArrowIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button
            onClick={onSubmit}
            disabled={!selectedLanguage || !selectedTopic || isLoading}
            className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:via-amber-400 hover:to-orange-400 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-500 ease-out disabled:from-slate-700 disabled:via-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-orange-500/40 shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.99] disabled:hover:scale-100 disabled:shadow-none border-2 border-orange-400/50 disabled:border-slate-600"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

            <span className="relative flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg">Preparing Your Lesson...</span>
                </>
              ) : (
                <>
                  <FlameIcon />
                  <span className="text-lg">Begin Learning Journey</span>
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>

        {/* Encouraging helper text */}
        {!selectedLanguage && (
          <p className="mt-6 text-center text-sm text-slate-400">
            🔥 Start by selecting a language that interests you
          </p>
        )}
        {selectedLanguage && !selectedTopic && (
          <p className="mt-6 text-center text-sm text-orange-400">
            ✨ Great choice! Now pick a topic to explore
          </p>
        )}
        {selectedLanguage && selectedTopic && (
          <p className="mt-6 text-center text-sm text-amber-400 font-medium">
            🎯 Ready to learn! Click when you're ready
          </p>
        )}
      </div>
    </div>
  );
};
