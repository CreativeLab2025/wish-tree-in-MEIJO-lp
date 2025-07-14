import React from 'react';
import Link from 'next/link';

export default function Abot() {
  return (
    <section className="max-w-3xl ml-auto h-screen flex flex-col justify-center py-24 px-10 md:py-32 md:px-20 bg-orange-400 rounded-3xl shadow-2xl text-left">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow">about product</h2>
      <h3 className="text-2xl md:text-4xl font-bold mb-10 text-white drop-shadow">Wish tree in MEIJOへようこそ</h3>
      <p className="mb-6 text-xl md:text-2xl text-white leading-relaxed tracking-wide">
        名城大学100周年を記念して作成されたこのプロダクト。
      </p>
      <p className="mb-6 text-xl md:text-2xl text-white leading-relaxed tracking-wide">
        この木にお願い事を書いた実を投げ込むと、そのお願いが叶うというものです。
      </p>
      <p className="mb-12 text-xl md:text-2xl text-white leading-relaxed tracking-wide">
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