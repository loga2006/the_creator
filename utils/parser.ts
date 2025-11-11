import { SentenceData, WordData } from '../types';

export const parseSentenceOfDayText = (text: string): SentenceData | null => {
  if (!text.trim()) {
    return null;
  }

  const lines = text.trim().split('\n').map(line => line.trim()).filter(Boolean);

  if (lines.length < 7) {
    return null;
  }

  try {
    const dateLine = lines[1]; 
    const [month, day] = dateLine.replace(',', '').split(' ');
    if (!month || !day) return null;
    
    const slang = lines[3];
    const formal = lines[5];
    const author = lines.slice(6);
    
    if(!slang || !formal || author.length === 0) {
        return null;
    }

    return {
      month: month.toUpperCase(),
      day,
      slang,
      formal,
      author,
    };
  } catch (error) {
    console.error("Failed to parse sentence text:", error);
    return null;
  }
};

export const parseWordOfDayText = (text: string): WordData | null => {
  if (!text.trim()) {
    return null;
  }

  const lines = text.trim().split('\n').map(line => line.trim()).filter(Boolean);

  if (lines.length < 8) {
    return null;
  }

  try {
    const dateLine = lines[1];
    const [month, day] = dateLine.replace(',', '').split(' ');
    if (!month || !day) return null;

    const word = lines[2];
    const pronunciation = lines[3];
    const meaning = lines[4];

    const authorLineCount = 3;
    const authorStartIndex = lines.length - authorLineCount;
    
    const examples = lines.slice(5, authorStartIndex);
    const author = lines.slice(authorStartIndex);
    
    if(!word || !pronunciation || !meaning || examples.length === 0 || author.length === 0) {
        return null;
    }

    return {
      month: month.toUpperCase(),
      day,
      word,
      pronunciation,
      meaning: meaning.toUpperCase(),
      examples: examples.map(ex => ex.toUpperCase()),
      author,
    };
  } catch (error) {
    console.error("Failed to parse word text:", error);
    return null;
  }
};
