
import React from 'react';

const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a10 10 0 0 0-3.54 19.54" />
    <path d="M12 22a10 10 0 0 0 3.54-19.54" />
    <path d="M4 12H2" />
    <path d="M22 12h-2" />
    <path d="M12 4V2" />
    <path d="M12 22v-2" />
    <path d="m4.93 4.93-.01.01" />
    <path d="m19.07 19.07-.01.01" />
    <path d="m4.93 19.07-.01-.01" />
    <path d="m19.07 4.93-.01-.01" />
    <path d="M12 12a5 5 0 0 0-5 5" />
    <path d="M17 12a5 5 0 0 1-5 5" />
    <path d="M12 12a5 5 0 0 1 5-5" />
    <path d="M7 12a5 5 0 0 0 5-5" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="relative py-6 bg-slate-900/80 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-orange-500/5 z-20">
      {/* Warm orange glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-500/5"></div>

      <div className="container mx-auto px-4 flex items-center justify-center relative">
        <div className="flex items-center gap-4">
          {/* Glowing logo with orange accent */}
          <div className="relative group/logo">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-lg opacity-40 group-hover/logo:opacity-60 transition-opacity duration-500"></div>
            <div className="relative p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/30 group-hover/logo:scale-105 transition-all duration-500 border border-orange-400/30">
              <BrainCircuitIcon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title with warm gradient */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent">
              Learn and Practice Coding
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">Learn comfortably in a relaxed, focused environment</p>
          </div>
        </div>
      </div>
    </header>
  );
};
