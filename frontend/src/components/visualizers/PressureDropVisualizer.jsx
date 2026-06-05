// import React, { useState } from "react";
// import { Activity, Gauge, Maximize2, Wind } from "lucide-react";

// const PressureDropVisualizer = () => {
//   // Local state for the interactive visualizer (independent of the main form)
//   const [velocity, setVelocity] = useState(2.0);
//   const [diameter, setDiameter] = useState(0.025);

//   // Physics Engine for the Visualizer
//   // Water kinematic viscosity ~ 1.004e-6 m^2/s at 20°C
//   const reynolds = Math.round((velocity * diameter) / 0.000001004); 
  
//   // Calculate relative pressure drop for UI feedback
//   const pressureDrop = Math.round(1000 * (Math.pow(velocity, 2) / diameter));

//   // Determine Flow Regime
//   let regime = "Laminar";
//   let regimeColor = "text-emerald-400";
//   let badgeBg = "bg-emerald-400/10 border-emerald-400/30";
//   let turbulenceScale = 0;

//   if (reynolds > 4000) {
//     regime = "Turbulent";
//     regimeColor = "text-red-400";
//     badgeBg = "bg-red-400/10 border-red-400/30";
//     turbulenceScale = 1;
//   } else if (reynolds >= 2300) {
//     regime = "Transitional";
//     regimeColor = "text-amber-400";
//     badgeBg = "bg-amber-400/10 border-amber-400/30";
//     turbulenceScale = 0.5;
//   }

//   // Generate fixed particles for animation
//   const particles = Array.from({ length: 40 }).map((_, i) => ({
//     id: i,
//     top: `${Math.random() * 80 + 10}%`,
//     speedOffset: Math.random() * 0.5,
//     wobbleOffset: Math.random() * 2,
//   }));

//   // Dynamic pipe thickness based on diameter (scaled for UI)
//   const pipeHeight = Math.max(80, Math.min(250, diameter * 4000));

//   return (
//     <div className="w-full h-[450px] bg-[#001033]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col relative overflow-hidden">
      
//       {/* HEADER STATS */}
//       <div className="flex justify-between items-start z-10 mb-4">
//         <div>
//           <h3 className="text-white font-extrabold tracking-widest uppercase text-sm flex items-center gap-2">
//             <Activity className="text-[#0055FF]" size={16} /> Live Flow Dynamics
//           </h3>
//           <p className="text-blue-200/60 text-xs mt-1">Interactive Regime Visualizer</p>
//         </div>
//         <div className="flex gap-3">
//           <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
//             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reynolds No.</p>
//             <p className={`font-mono font-black text-lg ${regimeColor}`}>{reynolds.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
//             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Est. ΔP (Pa/m)</p>
//             <p className="font-mono font-black text-lg text-white">{pressureDrop.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       {/* ANIMATION CANVAS (THE PIPE) */}
//       <div className="flex-1 flex items-center justify-center relative w-full my-4">
//         <div 
//           className="w-full relative border-y-4 border-slate-500 bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-blue-900/40 overflow-hidden shadow-inner flex items-center transition-all duration-500"
//           style={{ height: `${pipeHeight}px` }}
//         >
//           {/* Particles */}
//           {particles.map((p) => {
//             const animationDuration = 5 / (velocity + p.speedOffset);
//             return (
//               <div
//                 key={p.id}
//                 className={`absolute h-1.5 rounded-full blur-[0.5px] transition-all duration-300 ${turbulenceScale > 0 ? 'w-3 bg-blue-300' : 'w-12 bg-cyan-200'}`}
//                 style={{
//                   top: p.top,
//                   left: "-5%",
//                   animation: `moveParticle ${animationDuration}s linear infinite, wobble ${turbulenceScale > 0 ? (1 / velocity) + p.wobbleOffset : 0}s ease-in-out infinite alternate`,
//                   animationDelay: `${p.wobbleOffset * -5}s`,
//                 }}
//               />
//             );
//           })}
          
//           {/* Overlay Status Text */}
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
//             <div className={`px-6 py-2 rounded-full border backdrop-blur-md shadow-lg ${badgeBg} transition-colors duration-500`}>
//               <span className={`font-black tracking-[0.2em] uppercase text-sm ${regimeColor} drop-shadow-md`}>
//                 {regime} Flow
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CONTROLS */}
//       <div className="grid grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-2xl p-4 z-10">
//         <div className="space-y-3">
//           <div className="flex justify-between items-center">
//             <label className="text-xs text-blue-200 font-bold uppercase tracking-widest flex items-center gap-2">
//               <Wind size={14}/> Flow Velocity (m/s)
//             </label>
//             <span className="text-white font-mono text-sm">{velocity.toFixed(1)}</span>
//           </div>
//           <input 
//             type="range" min="0.1" max="5.0" step="0.1" value={velocity} 
//             onChange={(e) => setVelocity(parseFloat(e.target.value))}
//             className="w-full accent-[#0055FF] h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
//           />
//         </div>

//         <div className="space-y-3">
//           <div className="flex justify-between items-center">
//             <label className="text-xs text-blue-200 font-bold uppercase tracking-widest flex items-center gap-2">
//               <Maximize2 size={14}/> Pipe Diameter (m)
//             </label>
//             <span className="text-white font-mono text-sm">{diameter.toFixed(3)}</span>
//           </div>
//           <input 
//             type="range" min="0.010" max="0.060" step="0.005" value={diameter} 
//             onChange={(e) => setDiameter(parseFloat(e.target.value))}
//             className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Injecting specific keyframes for this component */}
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes moveParticle {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(1200px); }
//         }
//         @keyframes wobble {
//           0% { margin-top: -${turbulenceScale * 30}px; }
//           100% { margin-top: ${turbulenceScale * 30}px; }
//         }
//       `}} />
//     </div>
//   );
// };

// export default PressureDropVisualizer;

import React, { useState } from "react";
import { Activity, Maximize2, Wind } from "lucide-react";

const PressureDropVisualizer = () => {
  const [velocity, setVelocity] = useState(2.0);
  const [diameter, setDiameter] = useState(0.025);

  // Physics Engine for the Visualizer
  const reynolds = Math.round((velocity * diameter) / 0.000001004); 
  const pressureDrop = Math.round(1000 * (Math.pow(velocity, 2) / diameter));

  // Determine Flow Regime
  let regime = "Laminar";
  let regimeColor = "text-emerald-400";
  let badgeBg = "bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]";
  let turbulenceScale = 0;

  if (reynolds > 4000) {
    regime = "Turbulent";
    regimeColor = "text-red-400";
    badgeBg = "bg-red-400/10 border-red-400/30 shadow-[0_0_15px_rgba(248,113,113,0.2)]";
    turbulenceScale = 1;
  } else if (reynolds >= 2300) {
    regime = "Transitional";
    regimeColor = "text-amber-400";
    badgeBg = "bg-amber-400/10 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]";
    turbulenceScale = 0.5;
  }

  // Generate particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    speedOffset: Math.random() * 0.5,
    wobbleOffset: Math.random() * 2,
  }));

  // Constrain max height so it never breaks the layout
  const pipeHeight = Math.max(40, Math.min(220, diameter * 3000));

  return (
    <div className="w-full min-h-[480px] h-full bg-[#001033]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
      
      {/* HEADER STATS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center z-10 mb-6 gap-4">
        <div>
          <h3 className="text-white font-black tracking-widest uppercase text-sm flex items-center gap-2 drop-shadow-md">
            <Activity className="text-[#0055FF]" size={18} /> Live Flow Dynamics
          </h3>
          <p className="text-blue-200/60 text-xs mt-1 font-medium tracking-wide">Interactive Regime Visualizer</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="bg-[#00081a] border border-white/10 rounded-xl px-5 py-2.5 text-center flex-1 shadow-inner">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reynolds No.</p>
            <p className={`font-mono font-black text-xl leading-none ${regimeColor}`}>{reynolds.toLocaleString()}</p>
          </div>
          <div className="bg-[#00081a] border border-white/10 rounded-xl px-5 py-2.5 text-center flex-1 shadow-inner">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Est. ΔP (Pa/m)</p>
            <p className="font-mono font-black text-xl leading-none text-white">{pressureDrop.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ANIMATION CANVAS (Stable Height Wrapper) */}
      {/* Changed background to be slightly darker to make the glowing pipe pop */}
      <div className="h-[240px] w-full flex items-center justify-center relative rounded-2xl bg-[#00081a]/60 border border-white/5 shadow-inner mb-6 overflow-hidden">
        
        {/* THE FIX: 3D Cylindrical Tube Styling */}
        <div 
          className="w-full relative border-y-[4px] border-slate-300/50 bg-gradient-to-b from-blue-400/20 via-blue-500/10 to-blue-900/50 shadow-[0_0_25px_rgba(0,85,255,0.15)] flex items-center transition-all duration-300 ease-out"
          style={{ height: `${pipeHeight}px` }}
        >
          
          {/* Glass Specular Highlights (Makes it look like a physical shiny tube) */}
          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20" />

          {/* Particles */}
          {particles.map((p) => {
            const animationDuration = 5 / (velocity + p.speedOffset);
            return (
              <div
                key={p.id}
                className={`absolute h-1.5 rounded-full blur-[0.5px] transition-all duration-300 z-0 ${turbulenceScale > 0 ? 'w-3 bg-blue-300/90' : 'w-12 bg-cyan-200/90'}`}
                style={{
                  top: p.top,
                  left: "-5%",
                  animation: `moveParticle ${animationDuration}s linear infinite, wobble ${turbulenceScale > 0 ? (1 / velocity) + p.wobbleOffset : 0}s ease-in-out infinite alternate`,
                  animationDelay: `${p.wobbleOffset * -5}s`,
                }}
              />
            );
          })}
          
          {/* Overlay Status Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className={`px-6 py-2.5 rounded-full border backdrop-blur-md ${badgeBg} transition-all duration-500`}>
              <span className={`font-black tracking-[0.2em] uppercase text-xs md:text-sm ${regimeColor} drop-shadow-lg`}>
                {regime} Flow
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-2xl p-5 z-10 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs text-blue-100 font-bold uppercase tracking-widest flex items-center gap-2">
              <Wind size={16} className="text-[#0055FF]"/> Flow Velocity
            </label>
            <span className="text-white font-mono text-sm bg-black/30 px-2 py-1 rounded-md">{velocity.toFixed(1)} m/s</span>
          </div>
          <input 
            type="range" min="0.1" max="10.0" step="0.1" value={velocity} 
            onChange={(e) => setVelocity(parseFloat(e.target.value))}
            className="w-full accent-[#0055FF] h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer hover:bg-slate-700 transition-colors"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs text-blue-100 font-bold uppercase tracking-widest flex items-center gap-2">
              <Maximize2 size={16} className="text-emerald-400"/> Pipe Diameter
            </label>
            <span className="text-white font-mono text-sm bg-black/30 px-2 py-1 rounded-md">{diameter.toFixed(3)} m</span>
          </div>
          <input 
            type="range" min="0.010" max="0.100" step="0.005" value={diameter} 
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer hover:bg-slate-700 transition-colors"
          />
        </div>
      </div>

      {/* Specific CSS for clean slider thumbs and animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveParticle {
          0% { transform: translateX(0); }
          100% { transform: translateX(800px); }
        }
        @keyframes wobble {
          0% { margin-top: -${turbulenceScale * 25}px; }
          100% { margin-top: ${turbulenceScale * 25}px; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          cursor: pointer;
        }
      `}} />
    </div>
  );
};

export default PressureDropVisualizer;