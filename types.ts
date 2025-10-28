
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TarotCardDetails {
  name: string;
  description: string;
  story: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  quiz: QuizQuestion[];
}

export type ArcanaType = 'major' | 'minor';
