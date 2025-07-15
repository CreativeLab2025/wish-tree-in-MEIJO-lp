import React from 'react';
import Link from 'next/link';

export default function Jogiken() {
  return (
    <section className="z-[100] max-w-3xl h-200px ml-auto flex flex-col justify-center py-80 my-32 px-10 md:py-80 md:px-20 bg-[#F7F1E8] rounded-3xl shadow-2xl text-left">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-black drop-shadow"style={{ lineHeight: 10.0 }}>情報技術研究部</h2>
      <h3 className="text-2xl md:text-4xl font-bold mb-10 text-black drop-shadow"style={{ lineHeight: 2.5 }}>Wish tree in MEIJOへようこそ</h3>
      <p className="mb-12 text-xl md:text-2xl text-black tracking-wide" style={{ lineHeight: 2.5 }}>
        名城大学100周年を記念して作成されたこのプロダクト。
      </p>
      <p className="mb-12 text-xl md:text-2xl text-black tracking-wide" style={{ lineHeight: 2.5 }}>
        この木にお願い事を書いた実を投げ込むと、そのお願いが叶うというものです。
      </p>
      <p className="mb-12 text-xl md:text-2xl text-back tracking-wide" style={{ lineHeight: 2.5 }}>
        皆さんこの木にお願い事を投げ込んでみませんか？
      </p>
      <Link href="#ar">
        <button
          className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 text-white font-bold text-2xl md:text-3xl rounded-full px-12 py-5 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-3"
        >
          <span className="text-white text-3xl">→</span> ARに行く
        </button>
      </Link>
    </section>
  );
}