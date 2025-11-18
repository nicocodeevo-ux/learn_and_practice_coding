// FIX: Add React import to use React types like React.FC
import type React from 'react';

export interface LanguageTopic {
  title: string;
  prompt: string;
}

export interface Language {
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  topics: LanguageTopic[];
}

export interface LanguagesData {
  [key: string]: Language;
}
