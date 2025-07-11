import React from 'react'

export default function Title() {
  const title = "Wish Tree in MEIJO";
  
  return (
    <div className="text-center py-8">
      <h1 className="text-lg md:text-xl font-roboto-slab font-semibold" style={{ color: '#fbc140' }}>
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="animate-char-bounce-in inline-block"
            style={{
              animationDelay: `${index * 0.05}s`,
              opacity: 0
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  )
}