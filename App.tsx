import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LessonSelector } from './components/LessonSelector';
import { LessonDisplay } from './components/LessonDisplay';
import { Footer } from './components/Footer';
import { generateLesson } from './services/geminiService';
import { useEffect } from 'react';
import { loadLanguages } from './services/languagesService';
import type { LanguageTopic } from './types';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [lessonContent, setLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [languagesData, setLanguagesData] = useState<any>({});

  const languages = Object.keys(languagesData);
  const topics = selectedLanguage ? languagesData[selectedLanguage]?.topics || [] : [];

  const handleGenerateLesson = useCallback(async () => {
    if (!selectedLanguage || !selectedTopic) {
      setError("Please select a language and a topic.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLessonContent('');

    try {
      const topicData = languagesData[selectedLanguage]?.topics.find((t: any) => t.title === selectedTopic);
      if (!topicData) {
        throw new Error("Selected topic not found.");
      }

      const content = await generateLesson(topicData.prompt);
      setLessonContent(content);
    } catch (err) {
      console.error(err);
      setError("Failed to generate lesson. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage, selectedTopic, languagesData]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setSelectedTopic(''); // Reset topic when language changes
    setLessonContent('');
    setError(null);
  };

  useEffect(() => {
    const stored = loadLanguages();
    setLanguagesData(stored);
  }, []);

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  const currentTopic = selectedLanguage ? languagesData[selectedLanguage]?.topics.find((t: any) => t.title === selectedTopic) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Warm ambient glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.04),transparent_60%)] animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* Subtle dark grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c15_1px,transparent_1px),linear-gradient(to_bottom,#fb923c15_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* Floating warm ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-600/8 to-red-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-amber-500/6 to-yellow-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '3s' }}></div>

      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16 flex flex-col items-center relative z-10">
        <div className="w-full max-w-4xl space-y-10">
          <LessonSelector
            languages={languages.map(l => languagesData[l]?.name).filter(Boolean)}
            selectedLanguage={languagesData[selectedLanguage]?.name || ''}
            onLanguageChange={(name) => {
              const langKey = Object.keys(languagesData).find(key => languagesData[key]?.name === name) || '';
              handleLanguageChange(langKey);
            }}
            topics={topics.map((t: LanguageTopic) => t.title)}
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
            onSubmit={handleGenerateLesson}
            isLoading={isLoading}
          />
          {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">{error}</div>}
          <LessonDisplay
            content={lessonContent}
            isLoading={isLoading}
            languageKey={selectedLanguage}
            topicTitle={selectedTopic}
            topic={currentTopic}
          />

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
