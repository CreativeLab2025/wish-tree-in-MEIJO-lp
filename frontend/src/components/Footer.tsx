import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full mt-12 bg-gradient-to-r from-orange-400 to-orange-300 text-white flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-6 sm:py-8 gap-4 sm:gap-0 shadow-2xl border-t mt-auto">
    <span className="font-bold tracking-wide text-base sm:text-lg flex items-center gap-2">
      <span className="hidden sm:inline">Wish Tree in MEIJO</span>
    </span>
    <a
      href="https://github.com/aya-exe/wish-tree-in-MEIJO-lp"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-full px-4 py-2 shadow-lg border border-white/20"
      aria-label="GitHub Repository"
    >
      {/* GitHub Octocat SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" fill="currentColor"/>
      </svg>
      <span className="hidden md:inline text-base font-medium">GitHub</span>
    </a>
  </footer>
);

export default Footer; 