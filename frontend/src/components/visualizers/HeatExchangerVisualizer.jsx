// // // // src/components/visualizers/HeatExchangerVisualizer.jsx
// // import React from 'react';

// // const HeatExchangerVisualizer = () => {
// //   return (
// //     <div className="bg-[#03081A] border border-[#0055FF]/20 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] h-full min-h-[450px] flex flex-col justify-center relative overflow-hidden group w-full">
// //       <div className="absolute inset-0 bg-gradient-to-tr from-[#0055FF]/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
// //       <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-[#0055FF] flex items-center gap-2 z-10">
// //         <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse shadow-[0_0_10px_#0055FF]" /> Double Pipe Cross-Section
// //       </div>
      
// //       <div className="relative w-full h-48 mt-8 flex items-center shadow-2xl z-10">
// //         {/* Outer Shell (Cold Fluid) */}
// //         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900/60 to-[#0055FF]/40 rounded-lg border-y-4 border-[#020617] flex items-center px-4 overflow-hidden">
// //           <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_2s_linear_infinite]" />
          
// //           {/* Inner Tube (Hot Fluid) */}
// //           <div className="relative w-full h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-sm border-y-2 border-[#01040D] shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden z-10">
// //              <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMjBNMjAgMjBMMTAgMTBNMjAgMjBMMTAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+')] animate-[slide_1.2s_linear_infinite]" />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="relative w-full h-16 mt-4 z-10">
// //          <div className="absolute top-0 left-4 text-red-400 text-sm font-bold bg-red-950/50 px-2 py-1 rounded border border-red-900/50">T<sub>h,in</sub></div>
// //          <div className="absolute top-0 right-4 text-orange-400 text-sm font-bold bg-orange-950/50 px-2 py-1 rounded border border-orange-900/50">T<sub>h,out</sub></div>
// //          <div className="absolute bottom-0 left-4 text-[#4488FF] text-sm font-bold bg-blue-950/50 px-2 py-1 rounded border border-blue-900/50">T<sub>c,in</sub></div>
// //          <div className="absolute bottom-0 right-4 text-cyan-400 text-sm font-bold bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">T<sub>c,out</sub></div>
// //       </div>
      
// //       <style dangerouslySetInnerHTML={{ __html: `
// //         @keyframes slide { 0% { background-position: 0 0; } 100% { background-position: 40px 0; } }
// //       `}} />
// //     </div>
// //   );
// // };

// // export default HeatExchangerVisualizer;


// // import React, { useEffect, useRef } from 'react';

// // const HeatExchanger = () => {
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d', { alpha: false });
// //     let animationFrameId;

// //     // --- 1. SIZING & RESPONSIVENESS ---
// //     const resizeCanvas = () => {
// //       if (!canvas.parentElement) return;
// //       const dpr = window.devicePixelRatio || 1;
// //       const rect = canvas.parentElement.getBoundingClientRect();
// //       canvas.width = rect.width * dpr;
// //       canvas.height = rect.height * dpr;
// //       ctx.scale(dpr, dpr);
// //     };
// //     window.addEventListener('resize', resizeCanvas);
// //     resizeCanvas();

// //     // --- 2. PHYSICS & LAYOUT SETTINGS ---
// //     const particleCount = 350; 
// //     const globalSpeed = 2.5;

// //     const lerpColor = (r1, g1, b1, r2, g2, b2, t) => {
// //       return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
// //     };

// //     // --- 3. VECTOR ARROW CLASS ---
// //     class Arrow {
// //       constructor(isHot) {
// //         this.isHot = isHot;
// //         this.reset(true);
// //       }

// //       reset(randomX = false) {
// //         const cssHeight = canvas.height / (window.devicePixelRatio || 1);
// //         const centerY = cssHeight / 2;
// //         const innerRadius = cssHeight * 0.18; 
// //         const outerRadius = cssHeight * 0.40; 
// //         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
        
// //         this.x = randomX ? Math.random() * cssWidth : -30;
        
// //         if (this.isHot) {
// //           // Keep hot arrows strictly inside the inner boundaries
// //           this.y = centerY - innerRadius + 12 + Math.random() * (innerRadius * 2 - 24);
// //           this.velocity = globalSpeed * (Math.random() * 0.4 + 1.2); 
// //           this.length = 18; 
// //         } else {
// //           // Keep cold arrows strictly inside the top/bottom annulus boundaries
// //           if (Math.random() > 0.5) {
// //             this.y = centerY - outerRadius + 10 + Math.random() * (outerRadius - innerRadius - 20);
// //           } else {
// //             this.y = centerY + innerRadius + 10 + Math.random() * (outerRadius - innerRadius - 20);
// //           }
// //           this.velocity = globalSpeed * (Math.random() * 0.4 + 0.8);
// //           this.length = 14;
// //         }
        
// //         this.wobbleOffset = Math.random() * Math.PI * 2;
// //       }

// //       update(time) {
// //         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
// //         this.x += this.velocity;
// //         this.currentY = this.y + Math.sin(time * 3 + this.wobbleOffset) * 1.5; 

// //         if (this.x > cssWidth + 30) {
// //           this.reset(false);
// //         }
// //       }

// //       draw() {
// //         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
// //         const progress = Math.min(1, Math.max(0, this.x / cssWidth));
// //         let color;

// //         if (this.isHot) {
// //           color = lerpColor(255, 20, 20, 255, 180, 0, progress); // Red to Orange
// //         } else {
// //           color = lerpColor(0, 80, 255, 0, 255, 255, progress); // Deep Blue to Cyan
// //         }

// //         ctx.strokeStyle = color;
// //         ctx.fillStyle = color;
// //         ctx.lineWidth = 2.0;

// //         // Draw the shaft
// //         ctx.beginPath();
// //         ctx.moveTo(this.x, this.currentY);
// //         ctx.lineTo(this.x + this.length, this.currentY);
// //         ctx.stroke();

// //         // Draw swept-back arrowhead
// //         const headLen = 8;
// //         const headWidth = 4;
        
// //         ctx.beginPath();
// //         ctx.moveTo(this.x + this.length + headLen, this.currentY); 
// //         ctx.lineTo(this.x + this.length, this.currentY - headWidth); 
// //         ctx.lineTo(this.x + this.length + 2, this.currentY); 
// //         ctx.lineTo(this.x + this.length, this.currentY + headWidth); 
// //         ctx.closePath();
// //         ctx.fill();
// //       }
// //     }

// //     const arrows = [];
// //     for (let i = 0; i < particleCount; i++) {
// //       arrows.push(new Arrow(i < particleCount * 0.4)); 
// //     }

// //     let startTime = Date.now();

// //     // --- 4. RENDER LOOP ---
// //     const animate = () => {
// //       const time = (Date.now() - startTime) / 1000;
// //       const cssWidth = canvas.width / (window.devicePixelRatio || 1);
// //       const cssHeight = canvas.height / (window.devicePixelRatio || 1);
// //       const centerY = cssHeight / 2;
// //       const innerRadius = cssHeight * 0.18;
// //       const outerRadius = cssHeight * 0.40;

// //       // 1. Motion Blur Background
// //       ctx.globalCompositeOperation = 'source-over';
// //       ctx.fillStyle = 'rgba(6, 17, 31, 0.4)'; 
// //       ctx.fillRect(0, 0, cssWidth, cssHeight);

// //       // 2. Hot Core Fill Background (Faint red tint)
// //       ctx.fillStyle = 'rgba(255, 50, 50, 0.05)';
// //       ctx.fillRect(0, centerY - innerRadius, cssWidth, innerRadius * 2);

// //       // 3. Draw Outer Pipe Boundary (The casing)
// //       ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
// //       ctx.lineWidth = 2;
// //       ctx.beginPath();
// //       ctx.moveTo(0, centerY - outerRadius); ctx.lineTo(cssWidth, centerY - outerRadius);
// //       ctx.moveTo(0, centerY + outerRadius); ctx.lineTo(cssWidth, centerY + outerRadius);
// //       ctx.stroke();

// //       // 4. Draw Inner Pipe Divisions (Thick, highly visible lines between hot and cold)
// //       ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; // Bright white
// //       ctx.shadowBlur = 15; // Give it a neon glow
// //       ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
// //       ctx.lineWidth = 3; // Thicker lines
// //       ctx.beginPath();
// //       // Top divider
// //       ctx.moveTo(0, centerY - innerRadius); ctx.lineTo(cssWidth, centerY - innerRadius);
// //       // Bottom divider
// //       ctx.moveTo(0, centerY + innerRadius); ctx.lineTo(cssWidth, centerY + innerRadius);
// //       ctx.stroke();
// //       ctx.shadowBlur = 0; // Reset shadow for arrows

// //       // 5. Draw Arrows
// //       ctx.globalCompositeOperation = 'screen'; 
// //       arrows.forEach(arrow => {
// //         arrow.update(time);
// //         arrow.draw();
// //       });

// //       animationFrameId = requestAnimationFrame(animate);
// //     };

// //     animate();

// //     // --- 5. CLEANUP ---
// //     return () => {
// //       window.removeEventListener('resize', resizeCanvas);
// //       cancelAnimationFrame(animationFrameId);
// //     };
// //   }, []);

// //   return (
// //     <div 
// //       style={{ 
// //         position: 'relative', 
// //         width: '100%', 
// //         height: '100%', 
// //         minHeight: '400px', 
// //         background: '#06111f', 
// //         overflow: 'hidden',
// //         fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif"
// //       }}
// //     >
// //       {/* Heads Up Display Overlay */}
// //       <div 
// //         style={{
// //           position: 'absolute',
// //           top: '20px',
// //           left: '20px',
// //           pointerEvents: 'none',
// //           background: 'rgba(10, 15, 30, 0.6)',
// //           padding: '12px 20px',
// //           borderRadius: '8px',
// //           borderLeft: '3px solid #00ffff',
// //           backdropFilter: 'blur(5px)',
// //           color: 'white',
// //           zIndex: 10,
// //           boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
// //         }}
// //       >
// //         <h1 style={{ margin: 0, fontSize: '14px', letterSpacing: '3px', fontWeight: 600, textTransform: 'uppercase' }}>
// //           Thermodynamics
// //         </h1>
// //         <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#00ffff', letterSpacing: '2px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 255, 255, 0.4)' }}>
// //           STATE: PARALLEL FLOW (→ →)
// //         </p>
// //       </div>

// //       <canvas 
// //         ref={canvasRef} 
// //         style={{ 
// //           display: 'block', 
// //           width: '100%', 
// //           height: '100%' 
// //         }} 
// //       />
// //     </div>
// //   );
// // };

// // export default HeatExchanger;

// import React, { useEffect, useRef } from 'react';

// const HeatExchangerVisualizer = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d', { alpha: false });
//     let animationFrameId;

//     // --- 1. SIZING & RESPONSIVENESS ---
//     const resizeCanvas = () => {
//       if (!canvas.parentElement) return;
//       const dpr = window.devicePixelRatio || 1;
//       const rect = canvas.parentElement.getBoundingClientRect();
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       ctx.scale(dpr, dpr);
//     };
//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();

//     // --- 2. PHYSICS & LAYOUT SETTINGS ---
//     const particleCount = 350; 
//     const globalSpeed = 2.5;

//     const lerpColor = (r1, g1, b1, r2, g2, b2, t) => {
//       return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
//     };

//     // --- 3. VECTOR ARROW CLASS ---
//     class Arrow {
//       constructor(isHot) {
//         this.isHot = isHot;
//         this.reset(true);
//       }

//       reset(randomX = false) {
//         const cssHeight = canvas.height / (window.devicePixelRatio || 1);
//         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
//         const centerY = cssHeight / 2;
//         const innerRadius = cssHeight * 0.16; 
//         const outerRadius = cssHeight * 0.38; 
        
//         // Start arrows at the left pipe entrance (x = 30)
//         this.x = randomX ? 30 + Math.random() * (cssWidth - 60) : 30;
        
//         if (this.isHot) {
//           // Hot arrows inside the inner pipe
//           this.y = centerY - innerRadius + 12 + Math.random() * (innerRadius * 2 - 24);
//           this.velocity = globalSpeed * (Math.random() * 0.4 + 1.2); 
//           this.length = 18; 
//         } else {
//           // Cold arrows in the outer annulus
//           if (Math.random() > 0.5) {
//             this.y = centerY - outerRadius + 15 + Math.random() * (outerRadius - innerRadius - 25);
//           } else {
//             this.y = centerY + innerRadius + 10 + Math.random() * (outerRadius - innerRadius - 25);
//           }
//           this.velocity = globalSpeed * (Math.random() * 0.4 + 0.8);
//           this.length = 14;
//         }
        
//         this.wobbleOffset = Math.random() * Math.PI * 2;
//       }

//       update(time) {
//         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
//         this.x += this.velocity;
//         this.currentY = this.y + Math.sin(time * 3 + this.wobbleOffset) * 1.5; 

//         // Reset if it hits the right pipe exit
//         if (this.x > cssWidth - 30) {
//           this.reset(false);
//         }
//       }

//       draw() {
//         const cssWidth = canvas.width / (window.devicePixelRatio || 1);
//         const progress = Math.min(1, Math.max(0, this.x / cssWidth));
//         let color;

//         if (this.isHot) {
//           color = lerpColor(255, 50, 50, 255, 180, 0, progress); // Red to Orange
//         } else {
//           color = lerpColor(0, 150, 255, 0, 255, 255, progress); // Bright Blue to Cyan
//         }

//         ctx.strokeStyle = color;
//         ctx.fillStyle = color;
//         ctx.lineWidth = 2.0;

//         ctx.beginPath();
//         ctx.moveTo(this.x, this.currentY);
//         ctx.lineTo(this.x + this.length, this.currentY);
//         ctx.stroke();

//         const headLen = 8;
//         const headWidth = 4;
//         ctx.beginPath();
//         ctx.moveTo(this.x + this.length + headLen, this.currentY); 
//         ctx.lineTo(this.x + this.length, this.currentY - headWidth); 
//         ctx.lineTo(this.x + this.length + 2, this.currentY); 
//         ctx.lineTo(this.x + this.length, this.currentY + headWidth); 
//         ctx.closePath();
//         ctx.fill();
//       }
//     }

//     const arrows = [];
//     for (let i = 0; i < particleCount; i++) {
//       arrows.push(new Arrow(i < particleCount * 0.4)); 
//     }

//     let startTime = Date.now();

//     // --- 4. RENDER LOOP ---
//     const animate = () => {
//       const time = (Date.now() - startTime) / 1000;
//       const cssWidth = canvas.width / (window.devicePixelRatio || 1);
//       const cssHeight = canvas.height / (window.devicePixelRatio || 1);
//       const centerY = cssHeight / 2;
//       const innerRadius = cssHeight * 0.16;
//       const outerRadius = cssHeight * 0.38;
//       const padding = 30; // Keeps pipes slightly off the edges

//       // 1. Clear Background
//       ctx.globalCompositeOperation = 'source-over';
//       ctx.fillStyle = '#06111f'; 
//       ctx.fillRect(0, 0, cssWidth, cssHeight);

//       // ==========================================
//       // 2. DRAW 3D CYLINDRICAL PIPES
//       // ==========================================

//       // Outer Pipe 3D Gradient (Glass/Water)
//       const outerGrad = ctx.createLinearGradient(0, centerY - outerRadius, 0, centerY + outerRadius);
//       outerGrad.addColorStop(0, '#020617'); // Dark shadow top
//       outerGrad.addColorStop(0.15, '#0284c7'); // Glass highlight
//       outerGrad.addColorStop(0.5, '#082f49'); // Mid tone
//       outerGrad.addColorStop(0.85, '#0284c7'); // Glass highlight bottom
//       outerGrad.addColorStop(1, '#020617'); // Dark shadow bottom

//       // Inner Pipe 3D Gradient (Metal/Heat)
//       const innerGrad = ctx.createLinearGradient(0, centerY - innerRadius, 0, centerY + innerRadius);
//       innerGrad.addColorStop(0, '#2a0800'); // Dark metal shadow
//       innerGrad.addColorStop(0.2, '#ea580c'); // Bright hot highlight
//       innerGrad.addColorStop(0.5, '#450a0a'); // Mid metal tone
//       innerGrad.addColorStop(0.8, '#ea580c'); // Bright hot highlight
//       innerGrad.addColorStop(1, '#2a0800'); // Dark metal shadow

//       // Fill Outer Pipe
//       ctx.fillStyle = outerGrad;
//       ctx.fillRect(padding, centerY - outerRadius, cssWidth - (padding*2), outerRadius * 2);

//       // Fill Inner Pipe
//       ctx.fillStyle = innerGrad;
//       ctx.fillRect(padding, centerY - innerRadius, cssWidth - (padding*2), innerRadius * 2);

//       // Draw Metal Rims (Top and Bottom lines of pipes)
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
//       ctx.beginPath();
//       // Inner
//       ctx.moveTo(padding, centerY - innerRadius); ctx.lineTo(cssWidth - padding, centerY - innerRadius);
//       ctx.moveTo(padding, centerY + innerRadius); ctx.lineTo(cssWidth - padding, centerY + innerRadius);
//       // Outer
//       ctx.moveTo(padding, centerY - outerRadius); ctx.lineTo(cssWidth - padding, centerY - outerRadius);
//       ctx.moveTo(padding, centerY + outerRadius); ctx.lineTo(cssWidth - padding, centerY + outerRadius);
//       ctx.stroke();

//       // ==========================================
//       // 3. DRAW 3D PIPE ENTRANCES (Ellipses)
//       // ==========================================
//       ctx.lineWidth = 3;

//       // Left Inlet (Outer)
//       ctx.beginPath();
//       ctx.ellipse(padding, centerY, 15, outerRadius, 0, 0, Math.PI * 2);
//       ctx.fillStyle = 'rgba(2, 132, 199, 0.2)';
//       ctx.fill();
//       ctx.strokeStyle = '#38bdf8';
//       ctx.stroke();

//       // Left Inlet (Inner)
//       ctx.beginPath();
//       ctx.ellipse(padding, centerY, 7, innerRadius, 0, 0, Math.PI * 2);
//       ctx.fillStyle = '#450a0a';
//       ctx.fill();
//       ctx.strokeStyle = '#f97316';
//       ctx.stroke();

//       // Right Outlet (Outer)
//       ctx.beginPath();
//       ctx.ellipse(cssWidth - padding, centerY, 15, outerRadius, 0, 0, Math.PI * 2);
//       ctx.fillStyle = 'rgba(2, 132, 199, 0.2)';
//       ctx.fill();
//       ctx.strokeStyle = '#38bdf8';
//       ctx.stroke();

//       // Right Outlet (Inner)
//       ctx.beginPath();
//       ctx.ellipse(cssWidth - padding, centerY, 7, innerRadius, 0, 0, Math.PI * 2);
//       ctx.fillStyle = '#450a0a';
//       ctx.fill();
//       ctx.strokeStyle = '#f97316';
//       ctx.stroke();

//       // ==========================================
//       // 4. DRAW GLOWING ARROWS
//       // ==========================================
//       ctx.globalCompositeOperation = 'screen'; 
//       arrows.forEach(arrow => {
//         arrow.update(time);
//         arrow.draw();
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-[450px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
      
//       {/* Background Panel Gradient */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#06111f,_#010308)] -z-10" />

//       {/* Heads Up Display Overlay */}
//       <div className="absolute top-6 left-6 pointer-events-none bg-slate-900/50 px-6 py-4 rounded-xl border-l-4 border-cyan-400 backdrop-blur-md shadow-lg z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
//         <h1 className="m-0 text-sm tracking-[0.2em] font-extrabold text-white uppercase drop-shadow-md">
//           Thermodynamics
//         </h1>
//         <p className="mt-2 text-[10px] text-cyan-400 tracking-widest font-bold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
//           STATE: PARALLEL FLOW (→ →)
//         </p>
//       </div>
      
//       {/* Visualizer Canvas */}
//       <canvas 
//         ref={canvasRef} 
//         className="block w-full h-full cursor-crosshair"
//       />
//     </div>
//   );
// };

// export default HeatExchangerVisualizer;

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const HeatExchangerVisualizer = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // --- 1. SCENE SETUP ---
//     const scene = new THREE.Scene();
    
//     const width = mountRef.current.clientWidth;
//     const height = mountRef.current.clientHeight;

//     const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
//     // Position camera for a perfect 3/4 isometric view
//     camera.position.set(-4, 2, 5);

//     // CRITICAL: alpha: true makes the Three.js background completely transparent
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x000000, 0); // 0 opacity background
//     mountRef.current.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.enableZoom = false; // Prevent accidental scrolling issues on the page
//     controls.target.set(0, 0, 0); 

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//     const light = new THREE.DirectionalLight(0xffffff, 2);
//     light.position.set(5, 10, 5);
//     scene.add(light);
    
//     const backLight = new THREE.DirectionalLight(0x0055ff, 1.5);
//     backLight.position.set(-5, -5, -5);
//     scene.add(backLight);

//     // --- 2. 3D PIPES ---
//     // Outer Pipe (Glass/Water Shell)
//     const outerRadius = 1.2;
//     const innerRadius = 0.5;
//     const pipeLength = 8;

//     const outerGeo = new THREE.CylinderGeometry(outerRadius, outerRadius, pipeLength, 32, 1, true);
//     const outerMat = new THREE.MeshPhysicalMaterial({
//       color: 0x0088ff,
//       metalness: 0.1,
//       roughness: 0.1,
//       transmission: 0.9, // Glass-like transparency
//       transparent: true,
//       opacity: 1,
//       side: THREE.DoubleSide,
//       depthWrite: false
//     });
//     const outerPipe = new THREE.Mesh(outerGeo, outerMat);
//     outerPipe.rotation.z = Math.PI / 2;
//     scene.add(outerPipe);

//     // Wireframe rims for the outer pipe
//     const edgesOuter = new THREE.LineSegments(
//       new THREE.EdgesGeometry(outerGeo),
//       new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.3 })
//     );
//     outerPipe.add(edgesOuter);

//     // Inner Pipe (Hot Copper/Metal Core)
//     const innerGeo = new THREE.CylinderGeometry(innerRadius, innerRadius, pipeLength + 0.2, 32, 1, true);
//     const innerMat = new THREE.MeshPhysicalMaterial({
//       color: 0x220000,
//       metalness: 0.8,
//       roughness: 0.4,
//       emissive: 0xaa3300, // Glowing hot
//       emissiveIntensity: 0.8,
//       side: THREE.DoubleSide,
//       transparent: true,
//       opacity: 0.9
//     });
//     const innerPipe = new THREE.Mesh(innerGeo, innerMat);
//     innerPipe.rotation.z = Math.PI / 2;
//     scene.add(innerPipe);

//     // --- 3. 3D VECTOR ARROWS (PARTICLES) ---
//     let hotParticles = [];
//     let coldParticles = [];

//     function createArrowGroup(isHot) {
//       const group = new THREE.Group();
//       const color = isHot ? 0xff5500 : 0x00ffff;
      
//       const shaftMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
//       const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1.0 });

//       // Shaft
//       const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2), shaftMat);
//       shaft.rotation.z = -Math.PI / 2;
      
//       // Head
//       const head = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 8), headMat);
//       head.rotation.z = -Math.PI / 2;
//       head.position.x = 0.15;

//       group.add(shaft);
//       group.add(head);
//       return group;
//     }

//     // Populate Hot Core (Flowing through inner pipe)
//     for (let i = 0; i < 150; i++) {
//       let p = createArrowGroup(true);
//       let r = Math.sqrt(Math.random()) * (innerRadius - 0.1);
//       let theta = Math.random() * Math.PI * 2;
//       p.position.set((Math.random() - 0.5) * pipeLength, r * Math.cos(theta), r * Math.sin(theta));
//       p.userData = { speed: Math.random() * 0.04 + 0.02, startX: -pipeLength/2, endX: pipeLength/2 };
//       scene.add(p);
//       hotParticles.push(p);
//     }

//     // Populate Cold Annulus (Flowing through outer pipe)
//     for (let i = 0; i < 250; i++) {
//       let p = createArrowGroup(false);
//       let r = innerRadius + 0.1 + Math.random() * (outerRadius - innerRadius - 0.2);
//       let theta = Math.random() * Math.PI * 2;
//       p.position.set((Math.random() - 0.5) * pipeLength, r * Math.cos(theta), r * Math.sin(theta));
//       p.userData = { speed: Math.random() * 0.03 + 0.015, startX: -pipeLength/2, endX: pipeLength/2 };
//       scene.add(p);
//       coldParticles.push(p);
//     }

//     // --- 4. ANIMATION LOOP ---
//     let animationFrameId;

//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);
//       controls.update();

//       // Move hot particles
//       hotParticles.forEach((p) => {
//         p.position.x += p.userData.speed;
//         if (p.position.x > p.userData.endX) p.position.x = p.userData.startX;
//       });

//       // Move cold particles (Parallel flow -> same direction)
//       coldParticles.forEach((p) => {
//         p.position.x += p.userData.speed;
//         if (p.position.x > p.userData.endX) p.position.x = p.userData.startX;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     // --- 5. RESIZE HANDLER ---
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const newWidth = mountRef.current.clientWidth;
//       const newHeight = mountRef.current.clientHeight;
//       renderer.setSize(newWidth, newHeight);
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//     };
//     window.addEventListener('resize', handleResize);

//     // --- 6. CLEANUP ---
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationFrameId);
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     // Note: Absolutely NO background colors, borders, or shadows on this container. 
//     // It is completely transparent so it blends right into ExperimentLayout.jsx
//     <div className="relative w-full h-[450px] lg:h-[500px] group">
      
//       {/* Optional: Floating Heads Up Display Overlay (Matches your layout) */}
//       <div className="absolute top-6 left-6 pointer-events-none bg-slate-900/40 px-6 py-4 rounded-xl border-l-4 border-cyan-400 backdrop-blur-sm shadow-lg z-10 transition-opacity duration-300">
//         <h1 className="m-0 text-sm tracking-[0.2em] font-extrabold text-white uppercase drop-shadow-md">
//           Thermodynamics
//         </h1>
//         <p className="mt-2 text-[10px] text-cyan-400 tracking-widest font-bold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
//           STATE: PARALLEL FLOW (→ →)
//         </p>
//       </div>

//       <div className="absolute bottom-4 right-6 pointer-events-none z-10 opacity-50 group-hover:opacity-100 transition-opacity">
//         <p className="text-[10px] text-white tracking-widest uppercase font-bold">
//           Click & Drag to Rotate
//         </p>
//       </div>

//       {/* The Transparent Three.js Canvas Container */}
//       <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />
//     </div>
//   );
// };

// export default HeatExchangerVisualizer;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const HeatExchangerVisualizer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. CRITICAL FIX: Clear any ghost canvases left behind by React Strict Mode
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
    }

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Position camera for a perfect 3/4 isometric view
    camera.position.set(-4, 2, 5);

    // CRITICAL: alpha: true makes the Three.js background completely transparent
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // 0 opacity background
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Prevent accidental scrolling issues on the page
    controls.target.set(0, 0, 0); 

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 10, 5);
    scene.add(light);
    
    const backLight = new THREE.DirectionalLight(0x0055ff, 1.5);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // --- 2. 3D PIPES ---
    // Outer Pipe (Glass/Water Shell)
    const outerRadius = 1.2;
    const innerRadius = 0.5;
    const pipeLength = 8;

    const outerGeo = new THREE.CylinderGeometry(outerRadius, outerRadius, pipeLength, 32, 1, true);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0088ff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9, // Glass-like transparency
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const outerPipe = new THREE.Mesh(outerGeo, outerMat);
    outerPipe.rotation.z = Math.PI / 2;
    scene.add(outerPipe);

    // Wireframe rims for the outer pipe
    const edgesOuter = new THREE.LineSegments(
      new THREE.EdgesGeometry(outerGeo),
      new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.3 })
    );
    outerPipe.add(edgesOuter);

    // Inner Pipe (Hot Copper/Metal Core)
    const innerGeo = new THREE.CylinderGeometry(innerRadius, innerRadius, pipeLength + 0.2, 32, 1, true);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x220000,
      metalness: 0.8,
      roughness: 0.4,
      emissive: 0xaa3300, // Glowing hot
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const innerPipe = new THREE.Mesh(innerGeo, innerMat);
    innerPipe.rotation.z = Math.PI / 2;
    scene.add(innerPipe);

    // --- 3. 3D VECTOR ARROWS (PARTICLES) ---
    let hotParticles = [];
    let coldParticles = [];

    function createArrowGroup(isHot) {
      const group = new THREE.Group();
      const color = isHot ? 0xff5500 : 0x00ffff;
      
      const shaftMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
      const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1.0 });

      // Shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2), shaftMat);
      shaft.rotation.z = -Math.PI / 2;
      
      // Head
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 8), headMat);
      head.rotation.z = -Math.PI / 2;
      head.position.x = 0.15;

      group.add(shaft);
      group.add(head);
      return group;
    }

    // Populate Hot Core (Flowing through inner pipe)
    for (let i = 0; i < 150; i++) {
      let p = createArrowGroup(true);
      let r = Math.sqrt(Math.random()) * (innerRadius - 0.1);
      let theta = Math.random() * Math.PI * 2;
      p.position.set((Math.random() - 0.5) * pipeLength, r * Math.cos(theta), r * Math.sin(theta));
      p.userData = { speed: Math.random() * 0.04 + 0.02, startX: -pipeLength/2, endX: pipeLength/2 };
      scene.add(p);
      hotParticles.push(p);
    }

    // Populate Cold Annulus (Flowing through outer pipe)
    for (let i = 0; i < 250; i++) {
      let p = createArrowGroup(false);
      let r = innerRadius + 0.1 + Math.random() * (outerRadius - innerRadius - 0.2);
      let theta = Math.random() * Math.PI * 2;
      p.position.set((Math.random() - 0.5) * pipeLength, r * Math.cos(theta), r * Math.sin(theta));
      p.userData = { speed: Math.random() * 0.03 + 0.015, startX: -pipeLength/2, endX: pipeLength/2 };
      scene.add(p);
      coldParticles.push(p);
    }

    // --- 4. ANIMATION LOOP ---
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      // Move hot particles
      hotParticles.forEach((p) => {
        p.position.x += p.userData.speed;
        if (p.position.x > p.userData.endX) p.position.x = p.userData.startX;
      });

      // Move cold particles (Parallel flow -> same direction)
      coldParticles.forEach((p) => {
        p.position.x += p.userData.speed;
        if (p.position.x > p.userData.endX) p.position.x = p.userData.startX;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- 5. RESIZE HANDLER ---
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // --- 6. CLEANUP ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    // 2. CRITICAL FIX: Added `overflow-hidden` so nothing can bleed out of the box
    <div className="relative w-full h-[450px] lg:h-[500px] group overflow-hidden">
      
      {/* Optional: Floating Heads Up Display Overlay (Matches your layout) */}
      <div className="absolute top-6 left-6 pointer-events-none bg-slate-900/40 px-6 py-4 rounded-xl border-l-4 border-cyan-400 backdrop-blur-sm shadow-lg z-10 transition-opacity duration-300">
        <h1 className="m-0 text-sm tracking-[0.2em] font-extrabold text-white uppercase drop-shadow-md">
          Thermodynamics
        </h1>
        <p className="mt-2 text-[10px] text-cyan-400 tracking-widest font-bold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
          STATE: PARALLEL FLOW (→ →)
        </p>
      </div>

      <div className="absolute bottom-4 right-6 pointer-events-none z-10 opacity-50 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-white tracking-widest uppercase font-bold">
          Click & Drag to Rotate
        </p>
      </div>

      {/* The Transparent Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />
    </div>
  );
};

export default HeatExchangerVisualizer;