import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LessonSelector } from './components/LessonSelector';
import { LessonDisplay } from './components/LessonDisplay';
import { Footer } from './components/Footer';
import { generateLesson } from './services/geminiService';
import { LANGUAGES } from './data/lessons';
import type { LanguageTopic } from './types';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [lessonContent, setLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const languages = Object.keys(LANGUAGES);
  const topics = selectedLanguage ? LANGUAGES[selectedLanguage].topics : [];

  const handleGenerateLesson = useCallback(async () => {
    if (!selectedLanguage || !selectedTopic) {
      setError("Please select a language and a topic.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLessonContent('');

    try {
      const topicData = LANGUAGES[selectedLanguage]?.topics.find(t => t.title === selectedTopic);
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
  }, [selectedLanguage, selectedTopic]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setSelectedTopic(''); // Reset topic when language changes
    setLessonContent('');
    setError(null);
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary to-slate-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          <LessonSelector
            languages={languages.map(l => LANGUAGES[l].name)}
            selectedLanguage={LANGUAGES[selectedLanguage]?.name || ''}
            onLanguageChange={(name) => {
                const langKey = Object.keys(LANGUAGES).find(key => LANGUAGES[key].name === name) || '';
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
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
