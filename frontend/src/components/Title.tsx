import React from 'react'

export default function Title({ onAnimationEnd, disappear }: { onAnimationEnd?: () => void, disappear?: boolean }) {
  const title = "Wish Tree in MEIJO";

  return (
    <div className="text-center mt-4">
      <style>{`
        @keyframes char-disappear {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .char-disappear {
          animation: char-disappear 0.4s forwards;
        }
      `}</style>
      <h1 className="text-4xl md:text-6xl font-roboto-slab font-semibold" style={{ color: '#fbc140' }}>
        {title.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block animate-char-bounce-in${disappear ? ' char-disappear' : ''}`}
            style={{
              animationDelay: disappear
                ? `${index * 0.05}s`
                : `${index * 0.05}s`,
              opacity: 0
            }}
            onAnimationEnd={index === title.length - 1 ? onAnimationEnd : undefined}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  )
}