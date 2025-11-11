import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SentenceOfTheDayCard } from './components/SentenceOfTheDayCard';
import { WordOfTheDayCard } from './components/WordOfTheDayCard';
import { CardData, SentenceData, WordData } from './types';
import { parseSentenceOfDayText, parseWordOfDayText } from './utils/parser';
import { getRandomGradient, GradientInfo } from './utils/colors';
import { toPng } from 'html-to-image';

type CardType = 'sentence' | 'word';

const initialTextTemplates: Record<CardType, string> = {
  sentence: `Sentence of the day
Oct, 24
Slang
This project is fun, man.
Formal
This project is very enjoyable.
Kanmani
II CIVIL
Yacker Club Member`,
  word: `Word of the day
Nov, 11
Serendipity
/ˌsɛr(ə)nˈdɪpɪti/
THE OCCURRENCE AND DEVELOPMENT OF EVENTS BY CHANCE IN A HAPPY OR BENEFICIAL WAY.
Finding a five-dollar bill in an old coat pocket was a delightful moment of serendipity.
Kanmani
II CIVIL
Yacker Club Member`,
};

function App() {
  const [cardType, setCardType] = useState<CardType>('sentence');
  const [text, setText] = useState<string>(initialTextTemplates.sentence);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [gradient, setGradient] = useState<GradientInfo>(getRandomGradient());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleCardTypeChange = (type: CardType) => {
    setCardType(type);
    setText(initialTextTemplates[type]);
    setCardData(null);
    setError('');
  };

  const handleGenerate = useCallback(() => {
    setError('');
    setGradient(getRandomGradient());
    const parsed = cardType === 'sentence'
      ? parseSentenceOfDayText(text)
      : parseWordOfDayText(text);

    if (parsed) {
      setCardData(parsed);
    } else {
      setCardData(null);
      setError('Could not parse the text. Please ensure it follows the correct format.');
    }
  }, [text, cardType]);

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) return;
    
    setIsLoading(true);
    toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 2, // for higher resolution
        backgroundColor: '#111827'
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${cardType}-of-the-day.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Download failed', err);
        setError('Something went wrong during image creation.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cardRef, cardType]);
  
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType]);

  // Re-generate when text changes
  useEffect(() => {
      handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            The <span className="text-yellow-400">Creator</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            
            <div className="flex items-center gap-2 bg-gray-800 border-2 border-gray-700 rounded-lg p-1">
                {(['sentence', 'word'] as CardType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => handleCardTypeChange(type)}
                        className={`w-full font-bold py-2 px-4 rounded-md transition-colors text-sm uppercase tracking-wider ${
                            cardType === type
                                ? 'bg-yellow-600 text-white shadow'
                                : 'bg-transparent text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        {type} of the day
                    </button>
                ))}
            </div>

            <div>
                <label htmlFor="text-input" className="text-lg font-semibold text-gray-300">
                  Paste your content here:
                </label>
                <textarea
                  id="text-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-96 bg-gray-800 border-2 border-gray-700 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 resize-none mt-2"
                  placeholder="Enter text in the specified format..."
                />
            </div>

             {error && <p className="text-red-400 text-sm -mt-4">{error}</p>}
            <button
              onClick={handleGenerate}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-150 ease-in-out active:scale-95 text-lg shadow-lg"
            >
              Generate Card
            </button>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-sm">
                {cardType === 'sentence' && cardData && (
                    <SentenceOfTheDayCard ref={cardRef} data={cardData as SentenceData | null} gradient={gradient} />
                )}
                {cardType === 'word' && cardData && (
                    <WordOfTheDayCard ref={cardRef} data={cardData as WordData | null} gradient={gradient} />
                )}
                {!cardData && (
                    <div className="aspect-[1080/1350] w-full bg-gray-800 rounded-2xl flex items-center justify-center text-center p-8">
                        <p className="text-xl font-bold text-gray-500">
                            Click "Generate Card" to see a preview.
                        </p>
                    </div>
                )}
            </div>
            <button
              onClick={handleDownload}
              disabled={!cardData || isLoading}
              className="w-full max-w-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-transform duration-150 ease-in-out active:scale-95 text-lg shadow-lg"
            >
              {isLoading ? 'Downloading...' : 'Download as PNG'}
            </button>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12 py-4">
          <p>by Logadharshan</p>
          <p>CSE dept</p>
        </footer>
      </div>
    </div>
  );
}

export default App;