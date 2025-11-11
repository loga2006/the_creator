export interface SentenceData {
  month: string;
  day: string;
  slang: string;
  formal: string;
  author: string[];
}

export interface WordData {
  month: string;
  day: string;
  word: string;
  pronunciation: string;
  meaning: string;
  examples: string[];
  author: string[];
}

export type CardData = SentenceData | WordData;
