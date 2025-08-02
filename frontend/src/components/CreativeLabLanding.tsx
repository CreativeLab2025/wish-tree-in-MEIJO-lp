"use client";
import React, { useState, useEffect } from 'react';
import Title from './Title';

const CreativeLabLanding: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const handleARClick = () => {
    // alert('🌳 AR体験を開始します！\n\nスマートフォンでQRコードをスキャンして、\n魔法の森での願いの体験をお楽しみください！');
    if(window.confirm("🌳 AR体験を開始します！\n\nスマートフォンでQRコードをスキャンして、\n魔法の森での願いの体験をお楽しみください！")) {
      window.location.href("https://c56a09a68363.ngrok-free.app/");
    }
  };

  const handleLinkClick = (linkName: string) => {
    alert(linkName + 'のページに移動します');
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50 animate-fade-out">
        <div className="text-center">
          <Title />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[400vh] bg-[#F7F1E8] scroll-smooth animate-fade-in">
      {/* First Screen */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#FF9600] px-4 py-3 text-white">
          <div className="flex items-center text-xl font-bold">
            <img src={`${process.env.NODE_ENV === 'production' ? '/wish-tree-in-MEIJO-lp' : ''}/icon.svg`} alt="Creative Lab Icon" className="w-8 h-8 mr-2" />
            <div className="leading-tight">
              Creative<br />Lab
            </div>
          </div>
        </div>

        {/* Spacer - takes remaining space */}
        <div className="flex-1"></div>

        {/* Keywords Bar - fixed at bottom */}
        <div className="bg-[#FF9600] px-4 py-2">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-white text-xs font-bold bg-white/20 px-2 py-1 rounded">KEY WORDS</span>
            <a className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-200" href="https://c56a09a68363.ngrok-free.app/">
              <span className="text-[#FF9600] mr-1 text-sm">&gt;&gt;</span>ARに行く
            </a>
            <a className="text-xs bg-white text-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-200" href="#link">
              <span className="text-[#FF9600] mr-1 text-sm">&gt;&gt;</span>情報工学部
            </a>
          </div>
        </div>
      </div>

      {/* Second Screen - Content */}
      <div className="flex flex-col items-center px-6 pt-16 pb-8" id="ar">
        {/* Apple Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-red-500"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <Title />
          <p className="text-xl text-gray-600">願いの木を実らせよう</p>
        </div>

        {/* AR Experience */}
        <div className="bg-white rounded-lg p-6 mb-12 shadow-md">
          <h3 className="text-xl font-bold text-[#FF9600] mb-6 flex items-center">
            <span className="w-10 h-10 bg-[#FF9600] text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">🌳</span>
            AR体験の手順
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="w-6 h-6 bg-[#FF9600] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">1</span>
              <div>
                <p className="font-semibold text-gray-800">ボタンをタップ</p>
                <p className="text-sm text-gray-600">「AR体験にいく」ボタンをタップ</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 h-6 bg-[#FF9600] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">2</span>
              <div>
                <p className="font-semibold text-gray-800">カメラを起動</p>
                <p className="text-sm text-gray-600">ブラウザでカメラアクセスを許可</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 h-6 bg-[#FF9600] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">3</span>
              <div>
                <p className="font-semibold text-gray-800">AR体験開始</p>
                <p className="text-sm text-gray-600">動作要件は<a href="#guide" className="text-[#FF9600]">こちら</a>をご覧ください</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 h-6 bg-[#FF9600] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">4</span>
              <div>
                <p className="font-semibold text-gray-800">願いを入力</p>
                <p className="text-sm text-gray-600">好きな木のみを選んで願いを入力</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-6 h-6 bg-[#FF9600] text-white rounded-full flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">5</span>
              <div>
                <p className="font-semibold text-gray-800">木のみに飾る</p>
                <p className="text-sm text-gray-600">木のみをWishTreeに飾って願いを成就させよう</p>
              </div>
            </div>
          </div>
        </div>


        {/* AR Button */}
        <button
          className="bg-[#FF9600] text-white px-8 py-4 rounded-xl text-lg font-bold mb-16 hover:bg-[#E8860C] transition-colors"
          onClick={handleARClick}
        >
          AR体験にいく →
        </button>

        {/* Links Section */}
        <div className="w-full max-w-md" id="link">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
            情報工学部リンク
            <div className="absolute bottom-[-8px] left-0 w-full h-1 bg-black"></div>
          </h2>

          <div className="space-y-4">
            <div
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLinkClick('情報技術研究会')}
              id="research"
            >
              <div className="h-32 bg-gray-300 rounded mb-3"></div>
              <h3 className="font-bold text-gray-800">情報技術研究会</h3>
            </div>

            <div
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLinkClick('Idea×Tech')}
              id="ideatech"
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

      {/* Fourth Screen - Operation Guide */}
      <div className="flex flex-col items-center px-6 pt-16 pb-8 bg-[#F7F1E8]" id="guide">
        <div className="w-full max-w-4xl">

          {/* Tips Section */}
          <div className="mt-8 bg-[#FFF8E7] border border-[#FF9600] rounded-lg p-6">
            <h4 className="text-lg font-bold text-[#FF9600] mb-4 flex items-center">
              <span className="mr-2">💡</span>
              AR体験 使用時のコツ
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-1">• 推奨ブラウザ</p>
                <p>Safari（iOS）、Chrome（Android）の最新版をお使いください</p>
              </div>
              <div>
                <p className="font-semibold mb-1">• 最適な環境</p>
                <p>明るい場所で、平らな表面を対象にしてください</p>
              </div>
              <div>
                <p className="font-semibold mb-1">• 動作推奨</p>
                <p>ゆっくりと動かしてください</p>
              </div>
              <div>
                <p className="font-semibold mb-1">• トラブル対処</p>
                <p>動作しない場合は、ページをリロードしてお試しください</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeLabLanding;
