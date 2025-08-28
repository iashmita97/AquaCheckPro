import React from 'react';
import { Droplets, Waves, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-cyan-400 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-400 blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 rounded-full bg-teal-400 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
              <Droplets className="w-12 h-12 text-cyan-300" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent mb-2 tracking-tight">
              AquaCheck Pro
            </h1>
            <div className="flex items-center justify-center space-x-2 text-cyan-200">
              <Waves className="w-4 h-4" />
              <p className="text-lg font-medium">AI-Powered Water Quality Analysis</p>
              <Waves className="w-4 h-4" />
            </div>
            <p className="text-slate-300 text-sm mt-2 font-light">Advanced Machine Learning for Water Safety Assessment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;