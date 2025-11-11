import React, { forwardRef } from 'react';
import { WordData } from '../types';
import { SethuLogo, NaacLogo } from './Icons';
import { GradientInfo } from '../utils/colors';

interface WordOfTheDayCardProps {
  data: WordData | null;
  gradient: GradientInfo;
}

export const WordOfTheDayCard = forwardRef<HTMLDivElement, WordOfTheDayCardProps>(({ data, gradient }, ref) => {
  const titleTextStyle = {
    color: '#facc15', // text-yellow-400
    textShadow: '1px 2px 4px rgba(45, 20, 0, 0.5)', // Softer, darker orange shadow with blur
  };

  const whiteTextStyle = {
    textShadow: '1px 1px 4px rgba(0,0,0,0.7)', // Soft, slightly darker shadow for readability
  };
  
  const content = data ? (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-start px-2 pt-2 w-full -mt-4">
        <div className="w-14 h-14"><SethuLogo /></div>
        <div className="text-center pt-1">
          <p className="text-[14px] font-black uppercase whitespace-nowrap" style={titleTextStyle}>SETHU INSTITUTE OF TECHNOLOGY</p>
          <p className="text-white/90 font-semibold text-[9px]" style={whiteTextStyle}>An Autonomous Institution Accredited with 'A++' Grade by NAAC</p>
        </div>
        <div className="w-16 h-16"><NaacLogo /></div>
      </header>
      
      {/* MAIN TITLE */}
      <div className="text-center font-black text-yellow-300 drop-shadow-lg -mt-4">
        <h1 className="text-xl tracking-wide uppercase whitespace-nowrap" style={titleTextStyle}>DEPARTMENT OF ENGLISH</h1>
        <h2 className="text-base tracking-wider text-white font-bold" style={whiteTextStyle}>YACKER CLUB</h2>
        <h1 className="text-2xl tracking-wide uppercase" style={titleTextStyle}>WORD OF THE DAY</h1>
      </div>

      {/* WORD SECTION */}
      <div className="flex flex-row items-center justify-center gap-3 px-4 w-full">
        <div className="relative shadow-lg rounded-md">
           <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
             <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
          </div>
          <div className="bg-white rounded-t-md px-4 py-0.5"></div>
          <div 
            style={{ backgroundColor: gradient.color }}
            className="border-2 border-white/80 text-white font-bold rounded-md w-12 h-12 flex flex-col items-center justify-center pt-1 shadow-inner"
          >
            <span className="text-sm tracking-wider font-bold">{data.month}</span>
            <span className="text-lg font-black">{data.day}</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl px-3 py-1.5 text-center flex-grow">
          <p className="font-bold text-xl text-amber-600">{data.word}</p>
          <p className="font-semibold text-base text-amber-600/90">{data.pronunciation}</p>
        </div>
      </div>
      
      {/* CONTENT */}
      <div className="px-4 space-y-3 text-center w-full">
        <div>
          <h3 className="font-black text-base text-yellow-300" style={titleTextStyle}>MEANING:</h3>
          <p className="font-bold text-white text-sm mt-0.5" style={whiteTextStyle}>{data.meaning}</p>
        </div>
        <div>
          <h3 className="font-black text-base text-yellow-300" style={titleTextStyle}>EXAMPLE SENTENCE:</h3>
          <div className="mt-1 space-y-0.5">
            {data.examples.map((ex, i) => (
              <p key={i} className="font-bold text-white text-sm" style={whiteTextStyle}>{ex}</p>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="pb-4 text-center text-yellow-300 font-bold text-sm" style={{ textShadow: '1px 2px 4px rgba(45, 20, 0, 0.5)'}}>
        {data.author.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </footer>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-center p-8">
      <p className="text-2xl font-bold text-white/80">
        Paste your text into the box and click "Generate" to create your Word of the Day card.
      </p>
    </div>
  );
  
  return (
    <div ref={ref} className={`relative w-full aspect-[1080/1500] bg-gradient-to-br ${gradient.class} overflow-hidden rounded-2xl shadow-2xl flex flex-col items-center`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:0.75rem_0.75rem]"></div>
       <div className="relative z-10 w-full h-full flex flex-col items-center justify-evenly">
        {content}
       </div>
    </div>
  );
});