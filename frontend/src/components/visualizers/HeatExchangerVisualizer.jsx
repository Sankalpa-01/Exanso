// src/components/visualizers/HeatExchangerVisualizer.jsx
import React from 'react';

const HeatExchangerVisualizer = () => {
  return (
    <div className="bg-[#03081A] border border-[#0055FF]/20 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] h-full min-h-[450px] flex flex-col justify-center relative overflow-hidden group w-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0055FF]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-[#0055FF] flex items-center gap-2 z-10">
        <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse shadow-[0_0_10px_#0055FF]" /> Double Pipe Cross-Section
      </div>
      
      <div className="relative w-full h-48 mt-8 flex items-center shadow-2xl z-10">
        {/* Outer Shell (Cold Fluid) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900/60 to-[#0055FF]/40 rounded-lg border-y-4 border-[#020617] flex items-center px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_2s_linear_infinite]" />
          
          {/* Inner Tube (Hot Fluid) */}
          <div className="relative w-full h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-sm border-y-2 border-[#01040D] shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden z-10">
             <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_1.2s_linear_infinite]" />
          </div>
        </div>
      </div>

      <div className="relative w-full h-16 mt-4 z-10">
         <div className="absolute top-0 left-4 text-red-400 text-sm font-bold bg-red-950/50 px-2 py-1 rounded border border-red-900/50">T<sub>h,in</sub></div>
         <div className="absolute top-0 right-4 text-orange-400 text-sm font-bold bg-orange-950/50 px-2 py-1 rounded border border-orange-900/50">T<sub>h,out</sub></div>
         <div className="absolute bottom-0 left-4 text-[#4488FF] text-sm font-bold bg-blue-950/50 px-2 py-1 rounded border border-blue-900/50">T<sub>c,in</sub></div>
         <div className="absolute bottom-0 right-4 text-cyan-400 text-sm font-bold bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">T<sub>c,out</sub></div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide { 0% { background-position: 0 0; } 100% { background-position: 40px 0; } }
      `}} />
    </div>
  );
};

export default HeatExchangerVisualizer;