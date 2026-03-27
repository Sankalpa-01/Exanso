// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Settings,
// //   Building,
// //   Zap,
// //   HardHat,
// //   Layers,
// //   Flame,
// //   ArrowRight,
// //   Activity,
// //   Lock,
// //   X
// // } from "lucide-react";

// // // --- DATA STRUCTURE (6 Branches) ---
// // const departments = [
// //   { 
// //     id: "mech", 
// //     name: "Mechanical Engineering", 
// //     icon: Settings, 
// //     count: 4,
// //     img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
// //   },
// //   { 
// //     id: "ceramic", 
// //     name: "Ceramic Engineering", 
// //     icon: Layers, 
// //     count: 2,
// //     // High-res image of advanced ceramic/pottery materials
// //     img: "https://images.unsplash.com/photo-1763087978864-fe5b2778c9f7?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
// //   },
// //   { 
// //     id: "elec", 
// //     name: "Electrical Engineering", 
// //     icon: Zap, 
// //     count: 3,
// //     img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
// //   },
// //   { 
// //     id: "civil", 
// //     name: "Civil Engineering", 
// //     icon: Building, 
// //     count: 2,
// //     img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
// //   },
// //   { 
// //     id: "mining", 
// //     name: "Mining Engineering", 
// //     icon: HardHat, 
// //     count: 2,
// //     img: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=800&auto=format&fit=crop"
// //   },
// //   { 
// //     id: "metallurgy", 
// //     name: "Metallurgy", 
// //     icon: Flame, 
// //     count: 1,
// //     img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
// //   },
// // ];

// // const experimentsData = {
// //   mech: [
// //     {
// //       id: "heat-exchanger",
// //       title: "Parallel Flow Heat Exchanger",
// //       description: "Double-pipe setup. Compare NTU-Effectiveness results with Random Forest predictions.",
// //       link: "/experiment/heat-exchanger",
// //       status: "Active",
// //       icon: Activity,
// //     },
// //     {
// //       id: "tensile-test",
// //       title: "Tensile Stress Test",
// //       description: "Predict yield strength and failure points for Aluminum 6061 samples.",
// //       link: "#",
// //       status: "Locked",
// //       icon: Lock,
// //     },
// //     {
// //       id: "bernoulli",
// //       title: "Bernoulli's Theorem",
// //       description: "Fluid dynamics verification using variable cross-section venturi meters.",
// //       link: "#",
// //       status: "Locked",
// //       icon: Lock,
// //     },
// //     {
// //       id: "centrifugal-pump",
// //       title: "Centrifugal Pump",
// //       description: "Analyze characteristic curves: Head vs Discharge under variable RPM.",
// //       link: "#",
// //       status: "Locked",
// //       icon: Lock,
// //     },
// //   ],
// //   civil: [
// //     {
// //       id: "compressive-strength",
// //       title: "Concrete Compressive Strength",
// //       description: "Analyze the 28-day compressive strength of various concrete mix designs.",
// //       link: "#",
// //       status: "Locked",
// //       icon: Lock,
// //     },
// //   ],
// //   ceramic: [],
// //   elec: [],
// //   mining: [],
// //   metallurgy: [],
// // };

// // // --- EXPERIMENT CARD COMPONENT ---
// // const ExperimentCard = ({ title, description, link, status, icon: Icon }) => {
// //   const isActive = status === "Active";

// //   return (
// //     <Card className={`relative overflow-hidden transition-all duration-300 ${
// //         isActive
// //           ? "border-slate-200 bg-white shadow-xl hover:shadow-[#0039A6]/15 hover:-translate-y-1 hover:border-[#0039A6]/50"
// //           : "border-slate-200 bg-slate-50 opacity-80"
// //       }`}
// //     >
// //       {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-[#0039A6]" />}
// //       <div className="absolute top-4 right-4">
// //         {isActive ? (
// //           <Badge className="bg-blue-50 text-[#0039A6] hover:bg-blue-100 border border-blue-200 shadow-none font-bold tracking-wider uppercase text-[10px]">
// //             Available
// //           </Badge>
// //         ) : (
// //           <Badge variant="outline" className="text-slate-400 border-slate-200 bg-white shadow-none font-bold tracking-wider uppercase text-[10px]">
// //             Coming Soon
// //           </Badge>
// //         )}
// //       </div>

// //       <CardHeader>
// //         <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isActive ? "bg-[#0039A6]/10 text-[#0039A6]" : "bg-slate-200 text-slate-400"}`}>
// //           <Icon size={24} strokeWidth={1.5} />
// //         </div>
// //         <CardTitle className="text-xl text-slate-900 font-extrabold">{title}</CardTitle>
// //         <CardDescription className="text-slate-500 font-light h-10 line-clamp-2">
// //           {description}
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent />
// //       <CardFooter>
// //         {isActive ? (
// //           <Link to={link} className="w-full">
// //             <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold tracking-widest uppercase rounded-none group transition-all">
// //               Launch Simulator
// //               <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
// //             </Button>
// //           </Link>
// //         ) : (
// //           <Button disabled variant="secondary" className="w-full bg-slate-100 text-slate-400 border-none rounded-none font-bold tracking-widest uppercase">
// //             <Lock className="mr-2 h-4 w-4" /> Locked
// //           </Button>
// //         )}
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // // --- FAN MATH HELPER ---
// // const getRelativeIndex = (index, activeIndex, length) => {
// //   let diff = index - activeIndex;
// //   const half = Math.floor(length / 2);
// //   if (diff < -half) diff += length;
// //   if (diff > half) diff -= length;
// //   return diff;
// // };

// // // --- MAIN DASHBOARD PAGE ---
// // const Dashboard = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [selectedDept, setSelectedDept] = useState(null); // Controls the bottom sheet

// //   // Auto-rotate: Clockwise (Left to Right)
// //   useEffect(() => {
// //     // Only rotate if not hovered AND if the bottom sheet is not open
// //     if (!isPaused && !selectedDept) {
// //       const timer = setInterval(() => {
// //         setActiveIndex((prev) => (prev - 1 + departments.length) % departments.length);
// //       }, 3500);
// //       return () => clearInterval(timer);
// //     }
// //   }, [isPaused, selectedDept]);

// //   // Handler for clicking a card
// //   const handleCardClick = (deptId, isActive, index) => {
// //     if (isActive) {
// //       // Open the bottom sheet instead of navigating
// //       setSelectedDept(deptId);
// //     } else {
// //       setIsPaused(true);
// //       setActiveIndex(index);
// //     }
// //   };

// //   const currentDeptData = departments.find(d => d.id === selectedDept);
// //   const currentExperiments = selectedDept ? experimentsData[selectedDept] : [];

// // return (
// //     <div className="relative min-h-screen bg-[#050B14] overflow-hidden font-sans">
      
// //       {/* --- BACKGROUND DASHBOARD LAYER --- */}
// //       {/* 1. DESIGN FIX: Removed 'blur-md'. We now just scale it down and drop opacity heavily to push it to the background cleanly. */}
// //       <div className={`min-h-screen bg-gradient-to-b from-[#0039A6] via-[#002875]/80 to-white relative p-6 pt-24 flex flex-col items-center transition-all duration-700 ${
// //         selectedDept ? "scale-[0.98] opacity-30 pointer-events-none" : "scale-100 opacity-100"
// //       }`}>
        
// //         <div className="text-center relative z-50 mt-4 mb-6">
// //           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight uppercase drop-shadow-lg">
// //             Select Department
// //           </h1>
// //           <div className="w-24 h-1.5 bg-white mx-auto shadow-md rounded-full" />
// //           <p className="text-blue-100 mt-4 font-light tracking-wide drop-shadow-md">
// //             Select a branch to explore its simulation modules
// //           </p>
// //         </div>

// //         <div className="relative w-full max-w-6xl h-[480px] flex justify-center items-end pb-0 perspective-1000">
// //           {departments.map((dept, index) => {
// //             const diff = getRelativeIndex(index, activeIndex, departments.length);
// //             const isActive = diff === 0;

// //             let translateX = 0, translateY = 0, rotateZ = 0, scale = 1, zIndex = 10, opacity = 1;

// //             if (diff === 0) {
// //               zIndex = 50; scale = 1.05; translateY = -50; 
// //             } else if (diff === 1) {
// //               translateX = 180; translateY = 20; rotateZ = 15; zIndex = 40; scale = 0.9;
// //             } else if (diff === -1) {
// //               translateX = -180; translateY = 20; rotateZ = -15; zIndex = 40; scale = 0.9;
// //             } else if (diff === 2) {
// //               translateX = 320; translateY = 90; rotateZ = 30; zIndex = 30; scale = 0.75; opacity = 0.7;
// //             } else if (diff === -2) {
// //               translateX = -320; translateY = 90; rotateZ = -30; zIndex = 30; scale = 0.75; opacity = 0.7;
// //             } else {
// //               translateY = 300; scale = 0.5; opacity = 0; zIndex = 10;
// //             }

// //             return (
// //               <div
// //                 key={dept.id}
// //                 className="absolute bottom-0 origin-bottom transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer"
// //                 style={{
// //                   transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
// //                   zIndex: zIndex,
// //                   opacity: opacity,
// //                 }}
// //                 onMouseEnter={() => setIsPaused(true)}
// //                 onMouseLeave={() => setIsPaused(false)}
// //                 onClick={() => handleCardClick(dept.id, isActive, index)}
// //               >
// //                 <div className={`w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between relative group ${
// //                   isActive ? "shadow-[0_20px_50px_rgba(0,57,166,0.5)] border-2 border-white/50" : "shadow-lg border border-white/20 blur-[1px] hover:blur-none"
// //                 }`}>
// //                   <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${dept.img}')` }} />
// //                   <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80 z-0" />

// //                   <div className="relative z-10 p-6 pt-8 text-center">
// //                     <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider leading-tight drop-shadow-md">{dept.name}</h2>
// //                     <p className="text-white/90 text-sm font-semibold tracking-widest uppercase mt-2 drop-shadow-md">{dept.count} Modules</p>
// //                   </div>

// //                   <div className="relative z-10 p-6 flex flex-col items-center pb-8">
// //                     <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 mb-6 ${isActive ? "bg-white text-[#0039A6]" : "bg-white/20 text-white backdrop-blur-md border border-white/30"}`}>
// //                       <dept.icon size={36} strokeWidth={isActive ? 2.5 : 2} />
// //                     </div>
// //                     <div className={`transition-all duration-500 overflow-hidden ${isActive ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
// //                       <Button className="bg-[#0039A6] hover:bg-blue-600 text-white rounded-full px-8 uppercase tracking-widest font-bold border border-white/30 shadow-lg group/btn">
// //                         Explore
// //                         <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* --- MODAL BACKDROP (Click to close) --- */}
// //       {/* 2. DESIGN FIX: Removed 'backdrop-blur-sm' and increased the dark overlay to 60%. This visually hides the background without expensive CPU calculations. */}
// //       <div 
// //         className={`fixed inset-0 bg-[#050B14]/60 z-40 transition-opacity duration-500 ${selectedDept ? "opacity-100" : "opacity-0 pointer-events-none"}`}
// //         onClick={() => setSelectedDept(null)}
// //       />

// //       {/* --- BOTTOM SHEET MODAL --- */}
// //       {/* 3. DESIGN FIX: Removed 'transform-gpu' and 'will-change-transform' to prevent GPU errors. */}
// //       <div 
// //         className={`fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,57,166,0.15)] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-b from-blue-50/80 via-white to-slate-50 ${
// //           selectedDept ? "translate-y-0" : "translate-y-full"
// //         }`}
// //       >
// //         <div className="w-full flex justify-center pt-4 pb-2">
// //           <div className="w-16 h-1.5 bg-blue-200/60 rounded-full" />
// //         </div>

// //         <button 
// //           onClick={() => setSelectedDept(null)}
// //           className="absolute top-6 right-6 w-10 h-10 bg-white hover:bg-blue-50 text-slate-400 hover:text-[#0039A6] rounded-full flex items-center justify-center transition-colors shadow-sm border border-slate-100"
// //         >
// //           <X size={20} strokeWidth={3} />
// //         </button>

// //         {/* 'overscroll-contain' is safe and prevents scroll chaining without using GPU. */}
// //         <div className="flex-1 overflow-y-auto p-8 md:p-12 overscroll-contain">
// //           <div className="max-w-7xl mx-auto">
            
// //             {currentDeptData && (
// //               <div className="mb-10 flex items-center gap-6 border-b-2 border-slate-200/60 pb-8">
// //                 <div className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-[#0039A6]/10 flex items-center justify-center text-[#0039A6]">
// //                   <currentDeptData.icon size={36} strokeWidth={2} />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
// //                     {currentDeptData.name}
// //                   </h1>
// //                   <p className="text-slate-500 text-lg font-light mt-2">
// //                     Select a module below to begin your Sim-to-Real comparison.
// //                   </p>
// //                 </div>
// //               </div>
// //             )}

// //             {currentExperiments.length > 0 ? (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
// //                 {currentExperiments.map((exp) => (
// //                   <ExperimentCard key={exp.id} {...exp} />
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-20 bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm rounded-xl">
// //                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0039A6]/60">
// //                   <Lock size={24} />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-slate-700 mb-2">Modules in Development</h3>
// //                 <p className="text-slate-500 font-light max-w-md mx-auto">
// //                   We are currently preparing the simulation and validation models for this department. Check back soon.
// //                 </p>
// //               </div>
// //             )}

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Settings,
//   Building,
//   Zap,
//   HardHat,
//   Layers,
//   Flame,
//   ArrowRight,
//   Activity,
//   Lock,
//   X
// } from "lucide-react";

// // --- DATA STRUCTURE (6 Branches) ---
// const departments = [
//   { 
//     id: "mech", 
//     name: "Mechanical Engineering", 
//     icon: Settings, 
//     count: 4,
//     img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
//   },
//   { 
//     id: "ceramic", 
//     name: "Ceramic Engineering", 
//     icon: Layers, 
//     count: 2,
//     img: "https://images.unsplash.com/photo-1763824372146-95e9b6d90926?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//   },
//   { 
//     id: "elec", 
//     name: "Electrical Engineering", 
//     icon: Zap, 
//     count: 3,
//     img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
//   },
//   { 
//     id: "civil", 
//     name: "Civil Engineering", 
//     icon: Building, 
//     count: 2,
//     img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
//   },
//   { 
//     id: "mining", 
//     name: "Mining Engineering", 
//     icon: HardHat, 
//     count: 2,
//     img: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=800&auto=format&fit=crop"
//   },
//   { 
//     id: "metallurgy", 
//     name: "Metallurgy", 
//     icon: Flame, 
//     count: 1,
//     img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
//   },
// ];

// const experimentsData = {
//   mech: [
//     {
//       id: "heat-exchanger",
//       title: "Parallel Flow Heat Exchanger",
//       description: "Double-pipe setup. Compare NTU-Effectiveness results with Random Forest predictions.",
//       link: "/experiment/heat-exchanger",
//       status: "Active",
//       icon: Activity,
//     },
//     {
//       id: "tensile-test",
//       title: "Tensile Stress Test",
//       description: "Predict yield strength and failure points for Aluminum 6061 samples.",
//       link: "#",
//       status: "Locked",
//       icon: Lock,
//     },
//     {
//       id: "bernoulli",
//       title: "Bernoulli's Theorem",
//       description: "Fluid dynamics verification using variable cross-section venturi meters.",
//       link: "#",
//       status: "Locked",
//       icon: Lock,
//     },
//     {
//       id: "centrifugal-pump",
//       title: "Centrifugal Pump",
//       description: "Analyze characteristic curves: Head vs Discharge under variable RPM.",
//       link: "#",
//       status: "Locked",
//       icon: Lock,
//     },
//   ],
//   civil: [
//     {
//       id: "compressive-strength",
//       title: "Concrete Compressive Strength",
//       description: "Analyze the 28-day compressive strength of various concrete mix designs.",
//       link: "#",
//       status: "Locked",
//       icon: Lock,
//     },
//   ],
//   ceramic: [],
//   elec: [],
//   mining: [],
//   metallurgy: [],
// };

// // --- EXPERIMENT CARD COMPONENT ---
// const ExperimentCard = ({ title, description, link, status, icon: Icon }) => {
//   const isActive = status === "Active";

//   return (
//     <Card className={`relative overflow-hidden transition-all duration-300 border-none ${
//         isActive
//           ? "bg-white shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1 ring-1 ring-white/20"
//           : "bg-white/90 opacity-90 ring-1 ring-white/10"
//       }`}
//     >
//       {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-[#0039A6]" />}
//       <div className="absolute top-4 right-4">
//         {isActive ? (
//           <Badge className="bg-blue-50 text-[#0039A6] hover:bg-blue-100 border border-blue-200 shadow-none font-bold tracking-wider uppercase text-[10px]">
//             Available
//           </Badge>
//         ) : (
//           <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-50 shadow-none font-bold tracking-wider uppercase text-[10px]">
//             Coming Soon
//           </Badge>
//         )}
//       </div>

//       <CardHeader>
//         <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isActive ? "bg-[#0039A6]/10 text-[#0039A6]" : "bg-slate-100 text-slate-400"}`}>
//           <Icon size={24} strokeWidth={1.5} />
//         </div>
//         <CardTitle className="text-xl text-slate-900 font-extrabold">{title}</CardTitle>
//         <CardDescription className="text-slate-500 font-light h-10 line-clamp-2">
//           {description}
//         </CardDescription>
//       </CardHeader>
//       <CardContent />
//       <CardFooter>
//         {isActive ? (
//           <Link to={link} className="w-full">
//             <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold tracking-widest uppercase rounded-none group transition-all">
//               Launch Simulator
//               <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//             </Button>
//           </Link>
//         ) : (
//           <Button disabled variant="secondary" className="w-full bg-slate-50 text-slate-400 border-none rounded-none font-bold tracking-widest uppercase">
//             <Lock className="mr-2 h-4 w-4" /> Locked
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// // --- FAN MATH HELPER ---
// const getRelativeIndex = (index, activeIndex, length) => {
//   let diff = index - activeIndex;
//   const half = Math.floor(length / 2);
//   if (diff < -half) diff += length;
//   if (diff > half) diff -= length;
//   return diff;
// };

// // --- MAIN DASHBOARD PAGE ---
// const Dashboard = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [selectedDept, setSelectedDept] = useState(null);

//   useEffect(() => {
//     if (!isPaused && !selectedDept) {
//       const timer = setInterval(() => {
//         setActiveIndex((prev) => (prev - 1 + departments.length) % departments.length);
//       }, 3500);
//       return () => clearInterval(timer);
//     }
//   }, [isPaused, selectedDept]);

//   const handleCardClick = (deptId, isActive, index) => {
//     if (isActive) {
//       setSelectedDept(deptId);
//     } else {
//       setIsPaused(true);
//       setActiveIndex(index);
//     }
//   };

//   const currentDeptData = departments.find(d => d.id === selectedDept);
//   const currentExperiments = selectedDept ? experimentsData[selectedDept] : [];

//   return (
//     <div className="relative min-h-screen bg-[#050B14] overflow-hidden font-sans">
      
//       {/* --- BACKGROUND DASHBOARD LAYER --- */}
//       <div className={`min-h-screen bg-gradient-to-b from-[#0039A6] via-[#002875]/80 to-white relative p-6 pt-24 flex flex-col items-center transition-all duration-700 ${
//         selectedDept ? "scale-[0.98] opacity-30 pointer-events-none" : "scale-100 opacity-100"
//       }`}>
        
//         <div className="text-center relative z-50 mt-4 mb-6">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight uppercase drop-shadow-lg">
//             Select Department
//           </h1>
//           <div className="w-24 h-1.5 bg-white mx-auto shadow-md rounded-full" />
//           <p className="text-blue-100 mt-4 font-light tracking-wide drop-shadow-md">
//             Select a branch to explore its simulation modules
//           </p>
//         </div>

//         <div className="relative w-full max-w-6xl h-[480px] flex justify-center items-end pb-0 perspective-1000">
//           {departments.map((dept, index) => {
//             const diff = getRelativeIndex(index, activeIndex, departments.length);
//             const isActive = diff === 0;

//             let translateX = 0, translateY = 0, rotateZ = 0, scale = 1, zIndex = 10, opacity = 1;

//             if (diff === 0) {
//               zIndex = 50; scale = 1.05; translateY = -50; 
//             } else if (diff === 1) {
//               translateX = 180; translateY = 20; rotateZ = 15; zIndex = 40; scale = 0.9;
//             } else if (diff === -1) {
//               translateX = -180; translateY = 20; rotateZ = -15; zIndex = 40; scale = 0.9;
//             } else if (diff === 2) {
//               translateX = 320; translateY = 90; rotateZ = 30; zIndex = 30; scale = 0.75; opacity = 0.7;
//             } else if (diff === -2) {
//               translateX = -320; translateY = 90; rotateZ = -30; zIndex = 30; scale = 0.75; opacity = 0.7;
//             } else {
//               translateY = 300; scale = 0.5; opacity = 0; zIndex = 10;
//             }

//             return (
//               <div
//                 key={dept.id}
//                 className="absolute bottom-0 origin-bottom transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer"
//                 style={{
//                   transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
//                   zIndex: zIndex,
//                   opacity: opacity,
//                 }}
//                 onMouseEnter={() => setIsPaused(true)}
//                 onMouseLeave={() => setIsPaused(false)}
//                 onClick={() => handleCardClick(dept.id, isActive, index)}
//               >
//                 <div className={`w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between relative group ${
//                   isActive ? "shadow-[0_20px_50px_rgba(0,57,166,0.5)] border-2 border-white/50" : "shadow-lg border border-white/20 blur-[1px] hover:blur-none"
//                 }`}>
//                   <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${dept.img}')` }} />
//                   <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80 z-0" />

//                   <div className="relative z-10 p-6 pt-8 text-center">
//                     <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider leading-tight drop-shadow-md">{dept.name}</h2>
//                     <p className="text-white/90 text-sm font-semibold tracking-widest uppercase mt-2 drop-shadow-md">{dept.count} Modules</p>
//                   </div>

//                   <div className="relative z-10 p-6 flex flex-col items-center pb-8">
//                     <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 mb-6 ${isActive ? "bg-white text-[#0039A6]" : "bg-white/20 text-white backdrop-blur-md border border-white/30"}`}>
//                       <dept.icon size={36} strokeWidth={isActive ? 2.5 : 2} />
//                     </div>
//                     <div className={`transition-all duration-500 overflow-hidden ${isActive ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
//                       <Button className="bg-[#0039A6] hover:bg-blue-600 text-white rounded-full px-8 uppercase tracking-widest font-bold border border-white/30 shadow-lg group/btn">
//                         Explore
//                         <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- MODAL BACKDROP (Click to close) --- */}
//       <div 
//         className={`fixed inset-0 bg-[#050B14]/70 z-40 transition-opacity duration-500 ${selectedDept ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={() => setSelectedDept(null)}
//       />

//       {/* --- BOTTOM SHEET MODAL (Deep Brand Gradient Edition) --- */}
//       <div 
//         // 1. UPDATED FULL GRADIENT: The entire modal is now a sweeping deep blue gradient.
//         className={`fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-[40px] shadow-[0_-30px_70px_rgba(0,0,0,0.6)] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-br from-[#0039A6] via-[#002875] to-[#050B14] ${
//           selectedDept ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         {/* Drag handle */}
//         <div className="w-full flex justify-center pt-5 pb-2 relative z-10">
//           <div className="w-16 h-1.5 bg-white/30 rounded-full" />
//         </div>

//         {/* Close Button */}
//         <button 
//           onClick={() => setSelectedDept(null)}
//           className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors shadow-sm backdrop-blur-md border border-white/20 z-20"
//         >
//           <X size={20} strokeWidth={3} />
//         </button>

//         <div className="flex-1 overflow-y-auto p-8 md:p-12 overscroll-contain relative z-10">
//           <div className="max-w-7xl mx-auto">
            
//             {/* HEADER TEXT */}
//             {currentDeptData && (
//               // 2. UPDATED BORDER: Thinner, lighter line to separate the header elegantly from the cards
//               <div className="mb-10 flex items-center gap-6 border-b border-white/10 pb-8 mt-2">
//                 <div className="w-20 h-20 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center text-[#0039A6]">
//                   <currentDeptData.icon size={36} strokeWidth={2} />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase drop-shadow-md">
//                     {currentDeptData.name}
//                   </h1>
//                   <p className="text-blue-100/80 text-lg font-light mt-2 drop-shadow-sm">
//                     Select a module below to begin your Sim-to-Real comparison.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {currentExperiments.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
//                 {currentExperiments.map((exp) => (
//                   <ExperimentCard key={exp.id} {...exp} />
//                 ))}
//               </div>
//             ) : (
//               // 3. UPDATED EMPTY STATE: Designed to look like frosted glass against the dark blue background
//               <div className="text-center py-24 bg-white/5 backdrop-blur-md shadow-2xl rounded-2xl border border-white/10 mt-10">
//                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-inner">
//                   <Lock size={32} />
//                 </div>
//                 <h3 className="text-2xl font-extrabold text-white mb-2 tracking-wide uppercase">Modules in Development</h3>
//                 <p className="text-blue-100/70 font-light max-w-md mx-auto text-lg">
//                   We are currently preparing the simulation and validation models for this department. Check back soon.
//                 </p>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Settings,
  Building,
  Zap,
  HardHat,
  Layers,
  Flame,
  ArrowRight,
  Activity,
  Lock,
  X
} from "lucide-react";

// --- DATA STRUCTURE (6 Branches) ---
const departments = [
  { 
    id: "mech", 
    name: "Mechanical Engineering", 
    icon: Settings, 
    count: 4,
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "ceramic", 
    name: "Ceramic Engineering", 
    icon: Layers, 
    count: 2,
    img: "https://images.unsplash.com/photo-1763824372146-95e9b6d90926?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: "elec", 
    name: "Electrical Engineering", 
    icon: Zap, 
    count: 3,
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "civil", 
    name: "Civil Engineering", 
    icon: Building, 
    count: 2,
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "mining", 
    name: "Mining Engineering", 
    icon: HardHat, 
    count: 2,
    img: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "metallurgy", 
    name: "Metallurgy", 
    icon: Flame, 
    count: 1,
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
  },
];

const experimentsData = {
  mech: [
    {
      id: "heat-exchanger",
      title: "Parallel Flow Heat Exchanger",
      description: "Double-pipe setup. Compare NTU-Effectiveness results with Random Forest predictions.",
      link: "/experiment/heat-exchanger",
      status: "Active",
      icon: Activity,
    },
    {
      id: "tensile-test",
      title: "Tensile Stress Test",
      description: "Predict yield strength and failure points for Aluminum 6061 samples.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
    {
      id: "bernoulli",
      title: "Bernoulli's Theorem",
      description: "Fluid dynamics verification using variable cross-section venturi meters.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
    {
      id: "centrifugal-pump",
      title: "Centrifugal Pump",
      description: "Analyze characteristic curves: Head vs Discharge under variable RPM.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
  ],
  civil: [
    {
      id: "compressive-strength",
      title: "Concrete Compressive Strength",
      description: "Analyze the 28-day compressive strength of various concrete mix designs.",
      link: "#",
      status: "Locked",
      icon: Lock,
    },
  ],
  ceramic: [],
  elec: [],
  mining: [],
  metallurgy: [],
};

// --- EXPERIMENT CARD COMPONENT ---
const ExperimentCard = ({ title, description, link, status, icon: Icon }) => {
  const isActive = status === "Active";

  return (
    // UPDATED CARD STYLE: Since the background is now white, the ring is slate-200 and the shadow uses blue accents
    <Card className={`relative overflow-hidden transition-all duration-300 border-none ${
        isActive
          ? "bg-white shadow-[0_15px_40px_rgba(0,57,166,0.12)] hover:shadow-[0_20px_50px_rgba(0,57,166,0.25)] hover:-translate-y-1 ring-1 ring-slate-200"
          : "bg-white/90 opacity-90 ring-1 ring-slate-200"
      }`}
    >
      {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-[#0039A6]" />}
      <div className="absolute top-4 right-4">
        {isActive ? (
          <Badge className="bg-blue-50 text-[#0039A6] hover:bg-blue-100 border border-blue-200 shadow-none font-bold tracking-wider uppercase text-[10px]">
            Available
          </Badge>
        ) : (
          <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-50 shadow-none font-bold tracking-wider uppercase text-[10px]">
            Coming Soon
          </Badge>
        )}
      </div>

      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isActive ? "bg-[#0039A6]/10 text-[#0039A6]" : "bg-slate-100 text-slate-400"}`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <CardTitle className="text-xl text-slate-900 font-extrabold">{title}</CardTitle>
        <CardDescription className="text-slate-500 font-light h-10 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>
        {isActive ? (
          <Link to={link} className="w-full">
            <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold tracking-widest uppercase rounded-none group transition-all">
              Launch Simulator
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        ) : (
          <Button disabled variant="secondary" className="w-full bg-slate-50 text-slate-400 border-none rounded-none font-bold tracking-widest uppercase">
            <Lock className="mr-2 h-4 w-4" /> Locked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// --- FAN MATH HELPER ---
const getRelativeIndex = (index, activeIndex, length) => {
  let diff = index - activeIndex;
  const half = Math.floor(length / 2);
  if (diff < -half) diff += length;
  if (diff > half) diff -= length;
  return diff;
};

// --- MAIN DASHBOARD PAGE ---
const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    if (!isPaused && !selectedDept) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev - 1 + departments.length) % departments.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [isPaused, selectedDept]);

  const handleCardClick = (deptId, isActive, index) => {
    if (isActive) {
      setSelectedDept(deptId);
    } else {
      setIsPaused(true);
      setActiveIndex(index);
    }
  };

  const currentDeptData = departments.find(d => d.id === selectedDept);
  const currentExperiments = selectedDept ? experimentsData[selectedDept] : [];

  return (
    <div className="relative min-h-screen bg-[#050B14] overflow-hidden font-sans">
      
      {/* --- BACKGROUND DASHBOARD LAYER --- */}
      <div className={`min-h-screen bg-gradient-to-b from-[#0039A6] via-[#002875]/80 to-white relative p-6 pt-24 flex flex-col items-center transition-all duration-700 ${
        selectedDept ? "scale-[0.98] opacity-30 pointer-events-none" : "scale-100 opacity-100"
      }`}>
        
        <div className="text-center relative z-50 mt-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight uppercase drop-shadow-lg">
            Select Department
          </h1>
          <div className="w-24 h-1.5 bg-white mx-auto shadow-md rounded-full" />
          <p className="text-blue-100 mt-4 font-light tracking-wide drop-shadow-md">
            Select a branch to explore its simulation modules
          </p>
        </div>

        <div className="relative w-full max-w-6xl h-[480px] flex justify-center items-end pb-0 perspective-1000">
          {departments.map((dept, index) => {
            const diff = getRelativeIndex(index, activeIndex, departments.length);
            const isActive = diff === 0;

            let translateX = 0, translateY = 0, rotateZ = 0, scale = 1, zIndex = 10, opacity = 1;

            if (diff === 0) {
              zIndex = 50; scale = 1.05; translateY = -50; 
            } else if (diff === 1) {
              translateX = 180; translateY = 20; rotateZ = 15; zIndex = 40; scale = 0.9;
            } else if (diff === -1) {
              translateX = -180; translateY = 20; rotateZ = -15; zIndex = 40; scale = 0.9;
            } else if (diff === 2) {
              translateX = 320; translateY = 90; rotateZ = 30; zIndex = 30; scale = 0.75; opacity = 0.7;
            } else if (diff === -2) {
              translateX = -320; translateY = 90; rotateZ = -30; zIndex = 30; scale = 0.75; opacity = 0.7;
            } else {
              translateY = 300; scale = 0.5; opacity = 0; zIndex = 10;
            }

            return (
              <div
                key={dept.id}
                className="absolute bottom-0 origin-bottom transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => handleCardClick(dept.id, isActive, index)}
              >
                <div className={`w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between relative group ${
                  isActive ? "shadow-[0_20px_50px_rgba(0,57,166,0.5)] border-2 border-white/50" : "shadow-lg border border-white/20 blur-[1px] hover:blur-none"
                }`}>
                  <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${dept.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80 z-0" />

                  <div className="relative z-10 p-6 pt-8 text-center">
                    <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider leading-tight drop-shadow-md">{dept.name}</h2>
                    <p className="text-white/90 text-sm font-semibold tracking-widest uppercase mt-2 drop-shadow-md">{dept.count} Modules</p>
                  </div>

                  <div className="relative z-10 p-6 flex flex-col items-center pb-8">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 mb-6 ${isActive ? "bg-white text-[#0039A6]" : "bg-white/20 text-white backdrop-blur-md border border-white/30"}`}>
                      <dept.icon size={36} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <div className={`transition-all duration-500 overflow-hidden ${isActive ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>
                      <Button className="bg-[#0039A6] hover:bg-blue-600 text-white rounded-full px-8 uppercase tracking-widest font-bold border border-white/30 shadow-lg group/btn">
                        Explore
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL BACKDROP (Click to close) --- */}
      <div 
        className={`fixed inset-0 bg-[#050B14]/70 z-40 transition-opacity duration-500 ${selectedDept ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSelectedDept(null)}
      />

      {/* --- BOTTOM SHEET MODAL (Blue to White Gradient Edition) --- */}
      <div 
        // 1. UPDATED BACKGROUND: Beautiful smooth gradient from Brand Blue to clean Slate/White
        className={`fixed inset-x-0 bottom-0 z-50 h-[85vh] rounded-t-[40px] shadow-[0_-30px_70px_rgba(0,0,0,0.4)] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-b from-[#0039A6] to-slate-50 ${
          selectedDept ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-5 pb-2 relative z-10">
          <div className="w-16 h-1.5 bg-white/40 rounded-full" />
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setSelectedDept(null)}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors shadow-sm backdrop-blur-md border border-white/20 z-20"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 overscroll-contain relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* HEADER TEXT */}
            {currentDeptData && (
              <div className="mb-10 flex items-center gap-6 border-b border-white/20 pb-8 mt-2">
                <div className="w-20 h-20 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center text-[#0039A6]">
                  <currentDeptData.icon size={36} strokeWidth={2} />
                </div>
                <div>
                  {/* Kept text white since the top of the gradient is dark blue */}
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase drop-shadow-md">
                    {currentDeptData.name}
                  </h1>
                  <p className="text-blue-100/90 text-lg font-light mt-2 drop-shadow-sm">
                    Select a module below to begin your Sim-to-Real comparison.
                  </p>
                </div>
              </div>
            )}

            {currentExperiments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {currentExperiments.map((exp) => (
                  <ExperimentCard key={exp.id} {...exp} />
                ))}
              </div>
            ) : (
              // 2. UPDATED EMPTY STATE: Now has dark text to match the white/slate bottom area
              <div className="text-center py-24 bg-white/60 backdrop-blur-md shadow-xl rounded-2xl ring-1 ring-slate-200 mt-10">
                <div className="w-20 h-20 bg-[#0039A6]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0039A6] shadow-inner">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-wide uppercase">Modules in Development</h3>
                <p className="text-slate-600 font-light max-w-md mx-auto text-lg">
                  We are currently preparing the simulation and validation models for this department. Check back soon.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;