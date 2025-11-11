import React, { forwardRef, useState, useCallback, useRef } from 'react';
import { SentenceData } from '../types';
import { SethuLogo, NaacLogo } from './Icons';
import { GradientInfo } from '../utils/colors';

interface SentenceOfTheDayCardProps {
  data: SentenceData | null;
  gradient: GradientInfo;
}

export const SentenceOfTheDayCard = forwardRef<HTMLDivElement, SentenceOfTheDayCardProps>(({ data, gradient }, ref) => {
  const [width, setWidth] = useState(384);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new ResizeObserver(entries => {
        if (entries[0] && entries[0].contentRect.width > 0) {
          setWidth(entries[0].contentRect.width);
        }
      });
      observerRef.current.observe(node);
    }
    
    // Forward ref
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  // Base font size is 1% of the container width. All 'em' units are relative to this.
  const baseFontSize = width / 100;

  const titleTextStyle = {
    color: '#facc15', // text-yellow-400
    textShadow: `0.05em 0.05em 0.1em rgba(0,0,0,0.2)`,
  };
  
  const content = data ? (
    <>
      {/* HEADER */}
      <header 
        className="flex justify-between items-start w-full"
        style={{ padding: `2.08em` }}
      >
        <div style={{ width: '12.5em', height: '12.5em' }}><SethuLogo /></div>
        <div className="text-center" style={{paddingTop: '0.26em'}}>
          <p className="font-black uppercase whitespace-nowrap" style={{...titleTextStyle, fontSize: '3.64em' }}>SETHU INSTITUTE OF TECHNOLOGY</p>
          <p className="text-white/90 font-semibold" style={{fontSize: '2.34em'}}>An Autonomous Institution Accredited with 'A++' Grade by NAAC</p>
        </div>
        <div style={{ width: '12.5em', height: '12.5em' }}><NaacLogo /></div>
      </header>
      
      {/* MAIN TITLE */}
      <div className="text-center font-black">
        <h1 className="tracking-wide uppercase" style={{...titleTextStyle, fontSize: '5.2em'}}>DEPARTMENT OF ENGLISH</h1>
        <h2 className="tracking-wider" style={{...titleTextStyle, fontSize: '4.68em'}}>YACKER CLUB</h2>
        <h1 className="tracking-wide uppercase" style={{...titleTextStyle, fontSize: '6.25em'}}>SENTENCE OF THE DAY</h1>
      </div>

      {/* CONTENT */}
      <div className="relative w-full flex-grow flex flex-col justify-center items-center" style={{ padding: '0 8.33em', gap: '4.16em'}}>
        <div className="absolute" style={{ top: '1.04em', left: '2.08em'}}>
            <div className="relative shadow-lg rounded-md bg-white flex flex-col items-center" style={{width: '15em', height: '15em', borderRadius: '0.75em'}}>
                 <div className="w-full relative flex justify-center items-center" style={{background: '#9c3325', height: '3.75em', borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em'}}>
                    <div className="absolute flex" style={{top: '-0.5em', gap: '0.4em'}}>
                         <div className="bg-gray-200 rounded-full border border-gray-300" style={{width: '1.8em', height: '1.8em'}}></div>
                         <div className="bg-gray-200 rounded-full border border-gray-300" style={{width: '1.8em', height: '1.8em'}}></div>
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                    <span className="font-black text-amber-600" style={{fontSize: '3.2em'}}>{data.month}</span>
                    <span className="font-black text-amber-600" style={{fontSize: '5.4em', marginTop: '-0.2em'}}>{data.day}</span>
                </div>
            </div>
        </div>

        <div className="w-full flex flex-col items-center" style={{gap: '4.16em', paddingTop: '2.6em'}}>
            <div>
                <h3 className="font-black text-center" style={{...titleTextStyle, fontSize: '5.2em'}}>SLANG:</h3>
                <div className="bg-white rounded-full shadow-md border-2 border-white" style={{padding: '3.125em 6.25em', marginTop: '0.26em'}}>
                    <p className="font-semibold uppercase text-amber-700" style={{fontSize: '4.16em'}}>{data.slang}</p>
                </div>
            </div>
            <div>
                <h3 className="font-black text-center" style={{...titleTextStyle, fontSize: '5.2em'}}>FORMAL:</h3>
                <div className="bg-white rounded-full shadow-md border-2 border-white" style={{padding: '3.125em 6.25em', marginTop: '0.26em'}}>
                    <p className="font-semibold uppercase text-center text-amber-700" style={{fontSize: '3.9em'}}>{data.formal}</p>
                </div>
            </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center font-bold" style={{...titleTextStyle, fontSize: '4.16em', paddingBottom: '1em'}}>
        {data.author.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </footer>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-center p-8">
      <p className="text-2xl font-bold text-white/60">
        Paste your text into the box and click "Generate" to create your Sentence of the Day card.
      </p>
    </div>
  );
  
  return (
    <div ref={measuredRef} style={{ fontSize: `${baseFontSize}px` }} className={`relative w-full aspect-[1080/1500] bg-gradient-to-br ${gradient.class} overflow-hidden rounded-2xl shadow-2xl flex flex-col items-center`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)]" style={{backgroundSize: '1.95em 1.95em'}}></div>
       <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
        {content}
       </div>
    </div>
  );
});