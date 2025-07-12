"use client";
import React from 'react';

const CreativeLabLanding: React.FC = () => {
  const handleKeywordClick = (keyword: string) => {
    let targetElement: Element | null = null;
    switch (keyword) {
      case 'ARに行く':
        targetElement = document.querySelector('[data-section="ar"]');
        break;
      case '情報技術研究室':
        targetElement = document.querySelector('[data-section="research"]');
        break;
      case 'Idea×Tech':
        targetElement = document.querySelector('[data-section="ideatech"]');
        break;
    }

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleARClick = () => {
    alert('🌳 AR体験を開始します！\n\nスマートフォンでQRコードをスキャンして、\n魔法の森での願いの体験をお楽しみください！');
  };

  const handleLinkClick = (linkName: string) => {
    alert(linkName + 'のページに移動します');
  };

  return (
    <div className="min-h-[200vh] bg-[#E5E5E5]">
      {/* First Screen */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#FF9600] px-4 py-3 text-white">
          <div className="flex items-center text-xl font-bold">
            <img src="/icon.svg" alt="Creative Lab Icon" className="w-8 h-8 mr-2" />
            <div className="leading-tight">
              Creative<br />Lab
            </div>
          </div>
        </div>

        {/* Spacer - takes remaining space */}
        <div className="flex-1"></div>
        
        {/* Keywords Bar - fixed at bottom */}
        <div className="bg-[#FF9600] px-4 py-2">
          <div className="flex gap-3 items-center">
            <span className="text-white text-xs font-bold bg-white/20 px-2 py-1 rounded">KEY WORDS</span>
            <span
              className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleKeywordClick('ARに行く')}
            >
              <span className="text-[#FF9600] mr-1 text-sm">&gt;&gt;</span>ARに行く
            </span>
            <span
              className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleKeywordClick('情報技術研究室')}
            >
              <span className="text-[#FF9600] mr-1 text-sm">&gt;&gt;</span>情報技術研究室
            </span>
            <span
              className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleKeywordClick('Idea×Tech')}
            >
              <span className="text-[#FF9600] mr-1 text-sm">&gt;&gt;</span>Idea×Tech
            </span>
          </div>
        </div>
      </div>

      {/* Second Screen - Content */}
      <div className="h-screen flex flex-col items-center px-6 pt-16 pb-8 bg-[#F7F1E8]">
        {/* Apple Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-red-500"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-12 text-center">
          なにかしら文章
        </h1>

        {/* AR Button */}
        <button
          className="bg-[#FF9600] text-white px-8 py-4 rounded-xl text-lg font-bold mb-16 hover:bg-[#E8860C] transition-colors"
          onClick={handleARClick}
        >
          AR体験にいく →
        </button>

        {/* Links Section */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
            情報工学部リンク
            <div className="absolute bottom-[-8px] left-0 w-full h-1 bg-gray-400"></div>
          </h2>
          
          <div className="space-y-4">
            <div
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLinkClick('情報技術研究会')}
              data-section="research"
            >
              <div className="h-32 bg-gray-300 rounded mb-3"></div>
              <h3 className="font-bold text-gray-800">情報技術研究会</h3>
            </div>

            <div
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLinkClick('Idea×Tech')}
              data-section="ideatech"
            >
              <div className="h-32 bg-gray-300 rounded mb-3"></div>
              <h3 className="font-bold text-gray-800">Idea×Tech</h3>
            </div>

            <div
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLinkClick('名城大学 情報工学部')}
            >
              <div className="h-32 bg-gray-300 rounded mb-3"></div>
              <h3 className="font-bold text-gray-800">名城大学 情報工学部</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeLabLanding;