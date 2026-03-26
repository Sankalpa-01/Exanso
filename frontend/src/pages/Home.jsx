// import React, { useRef } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Database,
//   Activity,
//   CheckCircle2,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";

// // --- HERO SECTION ---
// const HeroSection = () => (
//   <section className="relative h-screen flex items-center overflow-hidden">
//     <div
//       className="absolute inset-0 z-0 bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')",
//         filter: "brightness(0.6) contrast(1.1)",
//       }}
//     />
//     <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
//       <div className="max-w-2xl bg-black/50 backdrop-blur-md p-10 border-l-4 border-[#0039A6] shadow-2xl">
//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-tight">
//           Precision <br /> meets <br /> Prediction.
//         </h1>
//         <p className="text-xl text-slate-100 mb-8 font-light leading-relaxed">
//           The next generation of Sim-to-Real validation. Bridging analytical
//           thermodynamics with advanced machine learning.
//         </p>
//         <Link to="/login">
//           <Button className="bg-[#0039A6] hover:bg-[#002875] text-white rounded-none px-10 py-6 text-lg font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,57,166,0.4)]">
//             Enter Platform <ChevronRight className="ml-2" />
//           </Button>
//         </Link>
//       </div>
//     </div>
//   </section>
// );

// // --- IMPROVED: WHAT WE DO ---
// const WhatWeDoSection = () => (
//   <section className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
//     {/* Decorative background element */}
//     <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-200/50 skew-x-12 translate-x-20 pointer-events-none" />

//     <div className="max-w-7xl mx-auto px-6 relative z-10">
//       <div className="grid lg:grid-cols-2 gap-20 items-center">
//         {/* Left: Typography Focus */}
//         <div>
//           <div className="inline-block border-b-4 border-[#0039A6] pb-2 mb-6">
//             <h4 className="text-[#0039A6] font-bold uppercase tracking-[0.2em] text-sm">
//               Our Mission
//             </h4>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-slate-900">
//             Transforming <br /> Data into...
//           </h2>

//           {/* THE "THREE WORDS" - Big, Bold, Readable */}
//           <div className="bg-[#0039A6] text-white p-6 -ml-6 pl-10 shadow-xl inline-block transform -skew-x-6 hover:skew-x-0 transition-transform duration-500">
//             <span className="text-4xl md:text-5xl font-black uppercase tracking-wider transform skew-x-6 inline-block">
//               Real World Insight
//             </span>
//           </div>
//         </div>

//         {/* Right: Description */}
//         <div className="text-xl text-slate-600 font-light leading-relaxed space-y-6 border-l-2 border-slate-300 pl-10">
//           <p>
//             Traditional formulas assume perfect conditions.{" "}
//             <strong className="text-slate-900 font-medium">
//               Real engineering does not.
//             </strong>
//           </p>
//           <p>
//             We bridge the accuracy gap by training Random Forest models on
//             thousands of experimental data points, giving you a precise look at
//             the chaos of the physical world.
//           </p>
//           <Link to="/about">
//             <Button
//               variant="link"
//               className="text-[#0039A6] font-bold text-lg p-0 h-auto mt-4 hover:no-underline hover:text-[#002875] group"
//             >
//               Explore Methodology{" "}
//               <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // --- CAPABILITIES ---
// const DomainCard = ({ title, img }) => (
//   <div className="min-w-[320px] md:min-w-100 h-125 relative group cursor-pointer overflow-hidden border-b-4 border-transparent hover:border-[#0039A6] transition-all duration-500 shadow-lg mx-2 bg-slate-100">
//     <div
//       className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//       style={{ backgroundImage: `url('${img}')` }}
//     />
//     <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
//     <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
//       <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider font-oswald">
//         {title}
//       </h3>
//       <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
//         <p className="text-slate-300 text-sm font-light">
//           Advanced simulation & validation suite.
//         </p>
//       </div>
//       <div className="w-16 h-1 bg-[#0039A6] mt-4 transition-all duration-500 group-hover:w-full" />
//     </div>
//   </div>
// );

// const CapabilitiesSection = () => {
//   const scrollRef = useRef(null);
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 420;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const branches = [
//     {
//       title: "Mechanical",
//       img: "/Mechanical Image.jpg",
//     },
//     {
//       title: "Electrical",
//       img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
//     },
//     {
//       title: "Civil",
//       img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
//     },
//     {
//       title: "Mining",
//       img: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1974",
//     },
//     {
//       title: "Metallurgy",
//       img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070",
//     },
//     {
//       title: "Ceramic",
//       img: "/Ceramic Image.jpg",
//     },
//   ];

//   return (
//     <section className="py-24 bg-white relative">
//       <div className="max-w-7xl mx-auto px-6 mb-12">
//         <div className="flex flex-col md:flex-row justify-between items-end gap-8">
//           <div className="max-w-2xl">
//             <h2 className="text-4xl font-bold text-slate-900 uppercase">
//               Our Capabilities
//             </h2>
//             <div className="w-24 h-1 bg-[#0039A6] mt-4 mb-6" />
//             <p className="text-lg text-slate-600 font-light leading-relaxed">
//               We provide specialized simulation modules across six core
//               engineering disciplines.
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("left")}
//               className="h-14 w-14 border-slate-300 hover:bg-[#0039A6] hover:text-white hover:border-[#0039A6] rounded-none transition-colors"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("right")}
//               className="h-14 w-14 border-slate-300 hover:bg-[#0039A6] hover:text-white hover:border-[#0039A6] rounded-none transition-colors"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div
//         ref={scrollRef}
//         className="flex overflow-x-auto pb-12 gap-0 px-6 scrollbar-hide snap-x"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {branches.map((branch, index) => (
//           <div key={index} className="snap-center">
//             <DomainCard title={branch.title} img={branch.img} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// // --- HOW IT WORKS ---
// const HowItWorksSection = () => (
//   <section className="py-24 bg-slate-50">
//     <div className="max-w-7xl mx-auto px-6">
//       <div className="text-center mb-20">
//         <h2 className="text-4xl font-bold text-slate-900 uppercase mb-4 tracking-tight">
//           Operational Workflow
//         </h2>
//         <div className="w-16 h-1 bg-[#0039A6] mx-auto" />
//       </div>
//       <div className="grid md:grid-cols-3 gap-12 relative">
//         <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10" />
//         {[
//           {
//             icon: Database,
//             title: "Data Ingestion",
//             text: "Raw experimental data is uploaded and pre-processed.",
//           },
//           {
//             icon: Activity,
//             title: "Model Inference",
//             text: "Random Forest algorithms predict real-world outcomes.",
//           },
//           {
//             icon: CheckCircle2,
//             title: "Validation",
//             text: "Results are compared against analytical baselines.",
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="text-center group bg-white p-6 shadow-lg border border-slate-100"
//           >
//             <div className="w-24 h-24 mx-auto bg-slate-50 border-2 border-slate-100 rounded-full flex items-center justify-center text-[#0039A6] mb-8 group-hover:bg-[#0039A6] group-hover:text-white group-hover:border-[#0039A6] transition-all duration-500">
//               <item.icon size={36} strokeWidth={1.5} />
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 uppercase mb-4 tracking-wide">
//               {item.title}
//             </h3>
//             <p className="text-slate-600 leading-relaxed max-w-xs mx-auto font-light">
//               {item.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// // --- COMMITMENT ---
// const CommitmentBox = ({ title, text }) => (
//   <div className="bg-[#0039A6] p-12 text-white hover:bg-[#002875] transition-colors duration-500 flex flex-col justify-between h-full min-h-80 border-r border-[#004dc0] last:border-r-0">
//     <div>
//       <h3 className="text-2xl font-bold uppercase mb-6 tracking-wider">
//         {title}
//       </h3>
//       <p className="text-blue-100 leading-relaxed font-light text-lg">{text}</p>
//     </div>
//     <div className="mt-10 opacity-60 group-hover:opacity-100 transition-opacity">
//       <ArrowRight className="text-white h-8 w-8" />
//     </div>
//   </div>
// );

// const CommitmentSection = () => (
//   <section className="bg-white pb-24">
//     <div className="max-w-7xl mx-auto px-6">
//       <h2 className="text-4xl font-bold text-slate-900 uppercase mb-12 tracking-tight">
//         Our Commitment
//       </h2>
//       <div className="grid md:grid-cols-3 gap-0 shadow-2xl">
//         <CommitmentBox
//           title="Accuracy"
//           text="We are committed to reducing the gap between simulation and reality through rigorous data validation."
//         />
//         <CommitmentBox
//           title="Innovation"
//           text="Continuously integrating the latest Machine Learning algorithms to modernize engineering education."
//         />
//         <CommitmentBox
//           title="Education"
//           text="Empowering the next generation of engineers with tools that reveal the complexity of the real world."
//         />
//       </div>
//     </div>
//   </section>
// );

// // --- ANSYS STYLE CTA SECTION (New!) ---
// const CTASection = () => (
//   <section className="bg-slate-900 py-16 border-t border-slate-800">
//     <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
//       <div className="max-w-3xl">
//         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//           Ready to bridge the gap?
//         </h2>
//         <p className="text-slate-400 text-lg font-light">
//           Join leading universities and research labs using Sim2Real for
//           advanced validation.
//         </p>
//       </div>

//       {/* The Ansys-style Button */}
//       <Link to="/contact">
//         <Button className="bg-[#FFB81C] hover:bg-[#E5A00D] text-black font-bold text-lg px-12 py-8 rounded-none uppercase tracking-widest transition-transform hover:scale-105">
//           Contact Us
//         </Button>
//       </Link>
//     </div>
//   </section>
// );

// // --- MAIN PAGE ---
// const Home = () => {
//   return (
//     <div className="bg-white font-sans selection:bg-[#0039A6] selection:text-white">
//       <HeroSection />
//       <WhatWeDoSection />
//       <CapabilitiesSection />
//       <HowItWorksSection />
//       <CommitmentSection />
//       <CTASection />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  Activity,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// --- HERO SECTION ---
// const HeroSection = () => (
//   <section className="relative h-screen flex items-center overflow-hidden">
//     {/* Background Image Container */}
//     <div
//       className="absolute inset-0 z-0 bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/Background Image.png')",
//         // 1. Brightness: Keep it slightly dark so white text pops
//         filter: "brightness(0.7) contrast(1.1)",
//         // 2. Flip: Keeps the scientist on the right side
//         transform: "scaleX(-1)", 
//       }}
//     />

//     {/* Content Container */}
//     <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
//       <div className="max-w-2xl bg-slate-900/0.1 backdrop-blur-md p-10 border-l-4 border-[#0039A6] border-y border-r border-white/10 shadow-2xl rounded-r-2xl">
        
//         <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight drop-shadow-lg">
//           Experimental Analysis of <br /> System Outcomes.
//         </h2>
        
//         <p className="text-xl text-slate-100 mb-8 font-light leading-relaxed drop-shadow-md">
//           The next generation of experimentation. Bridging experimentation with Artificial Intelligence and Machine Learning.
//         </p>
        
//         <Link to="/login">
//           <Button className="bg-[#0039A6] hover:bg-[#002875] text-white rounded-none px-10 py-6 text-lg font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,57,166,0.6)]">
//             Enter Platform <ChevronRight className="ml-2" />
//           </Button>
//         </Link>
        
//       </div>
//     </div>
//   </section>
// );

// --- IMPROVED HERO SECTION ---
const HeroSection = () => (
  <section className="relative h-screen flex items-center overflow-hidden">
    {/* 1. Background Image with Gradient Overlay */}
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Background Image.png')",
          filter: "brightness(0.8) contrast(1.1)", // Slightly brighter to show details
          transform: "scaleX(-1)", // Keep scientist on the right
        }}
      />
      {/* Gradient Overlay: Dark on left, transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
    </div>

    {/* 2. Content Container */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center">
      <div className="max-w-3xl">

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Experimental <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Analysis of
          </span>{" "}
          <br />
          System Outcomes.
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light leading-relaxed max-w-2xl border-l border-white/20 pl-6">
          The next generation of experimentation. Bridging the gap between
          analytical models and physical reality using{" "}
          <strong className="text-white font-medium">Artificial Intelligence</strong>.
        </p>

        {/* Action Button */}
        <Link to="/login">
          <Button className="group relative overflow-hidden bg-[#0039A6] hover:bg-[#002875] text-white rounded-none px-12 py-8 text-lg font-bold uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(0,57,166,0.3)] hover:shadow-[0_0_60px_rgba(0,57,166,0.6)] border border-white/10">
            <span className="relative z-10 flex items-center">
              Enter Platform
              <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

// --- IMPROVED: WHAT WE DO ---
// const WhatWeDoSection = () => (
//   <section className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
//     {/* Decorative background element */}
//     <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-200/50 skew-x-12 translate-x-20 pointer-events-none" />

//     <div className="max-w-7xl mx-auto px-6 relative z-10">
//       <div className="grid lg:grid-cols-2 gap-20 items-center">
//         {/* Left: Typography Focus */}
//         <div>
//           <div className="inline-block border-b-4 border-[#0039A6] pb-2 mb-6">
//             <h2 className="text-[#0039A6] font-bold uppercase tracking-[0.2em] text-3xl">
//               Our Mission
//             </h2>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-slate-900">
//             Effortless <br /> Experimentation with..
//           </h2>

//           {/* THE "THREE WORDS" - Big, Bold, Readable */}
//           <div className="bg-[#0039A6] text-white p-6 -ml-6 pl-10 shadow-xl inline-block transform -skew-x-6 hover:skew-x-0 transition-transform duration-500">
//             <span className="text-4xl md:text-5xl font-black uppercase tracking-wider transform skew-x-6 inline-block">
//               Artificial Intelligence
//             </span>
//           </div>
//         </div>

//         {/* Right: Description */}
//         <div className="text-xl text-slate-600 font-light leading-relaxed space-y-6 border-l-2 border-slate-300 pl-10">
//           <p>
//             Traditional formulas assume perfect conditions.{" "}
//             <strong className="text-slate-900 font-medium">
//               Real engineering does not.
//             </strong>
//           </p>
//           <p>
//             We minimise the accuracy gap between the calculated outcome and the experimental outcome using 
//             Artificial Intelligence Models giving you precise consideration of the real world.
//           </p>
//           <Link to="/about">
//             <Button
//               variant="link"
//               className="text-[#0039A6] font-bold text-lg p-0 h-auto mt-4 hover:no-underline hover:text-[#002875] group"
//             >
//               Explore Methodology{" "}
//               <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const WhatWeDoSection = () => (
//   <section className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
    
//     {/* UPDATED: Decorative background element - Now a sleek blue gradient */}
//     <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-[#0039A6]/20 via-[#0039A6]/5 to-transparent skew-x-12 translate-x-20 pointer-events-none" />

//     <div className="max-w-7xl mx-auto px-6 relative z-10">
//       <div className="grid lg:grid-cols-2 gap-20 items-center">
//         {/* Left: Typography Focus */}
//         <div>
//           <div className="inline-block border-b-4 border-[#0039A6] pb-2 mb-6">
//             <h2 className="text-[#0039A6] font-bold uppercase tracking-[0.2em] text-3xl">
//               Our Mission
//             </h2>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-slate-900">
//             Effortless <br /> Experimentation with..
//           </h2>

//           {/* THE "THREE WORDS" - Big, Bold, Readable */}
//           <div className="bg-[#0039A6] text-white p-6 -ml-6 pl-10 shadow-xl inline-block transform -skew-x-6 hover:skew-x-0 transition-transform duration-500">
//             <span className="text-4xl md:text-5xl font-black uppercase tracking-wider transform skew-x-6 inline-block">
//               Artificial Intelligence
//             </span>
//           </div>
//         </div>

//         {/* Right: Description */}
//         {/* UPDATED: Changed border-slate-300 to border-[#0039A6]/30 to match the new blue background */}
//         <div className="text-xl text-slate-600 font-light leading-relaxed space-y-6 border-l-2 border-[#0039A6]/30 pl-10 relative">
//           <p>
//             Traditional formulas assume perfect conditions.{" "}
//             <strong className="text-slate-900 font-medium">
//               Real engineering does not.
//             </strong>
//           </p>
//           <p>
//             We minimise the accuracy gap between the calculated outcome and the experimental outcome using 
//             Artificial Intelligence Models giving you precise consideration of the real world.
//           </p>
//           <Link to="/about">
//             <Button
//               variant="link"
//               className="text-[#0039A6] font-bold text-lg p-0 h-auto mt-4 hover:no-underline hover:text-[#002875] group"
//             >
//               Explore Methodology{" "}
//               <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

const WhatWeDoSection = () => (
  // Changed base background to crisp white
  <section className="py-32 bg-white relative overflow-hidden">
    
    {/* THE GRADIENT BACKGROUND: Dark blue on the right, smoothly fading to transparent (white) on the left */}
    <div className="absolute top-0 right-0 w-full md:w-[60%] h-full bg-gradient-to-l from-[#0039A6] via-[#0039A6]/90 to-transparent pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Typography Focus (Stays dark text because it sits on the white part) */}
        <div>
          <div className="inline-block border-b-4 border-[#0039A6] pb-2 mb-6">
            <h2 className="text-[#0039A6] font-bold uppercase tracking-[0.2em] text-3xl">
              Our Mission
            </h2>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-slate-900">
            Effortless <br /> Experimentation with..
          </h2>

          <div className="bg-[#0039A6] text-white p-6 -ml-6 pl-10 shadow-xl inline-block transform -skew-x-6 hover:skew-x-0 transition-transform duration-500">
            <span className="text-4xl md:text-5xl font-black uppercase tracking-wider transform skew-x-6 inline-block">
              Artificial Intelligence
            </span>
          </div>
        </div>

        {/* Right: Description (UPDATED to White/Light Blue text to read against the dark gradient) */}
        <div className="text-xl text-blue-50 font-light leading-relaxed space-y-6 border-l-2 border-white/30 pl-10 relative">
          <p>
            Traditional formulas assume perfect conditions.{" "}
            <strong className="text-white font-semibold">
              Real engineering does not.
            </strong>
          </p>
          <p className="text-blue-100/90">
            We minimise the accuracy gap between the calculated outcome and the experimental outcome using 
            Artificial Intelligence Models giving you precise consideration of the real world.
          </p>
          <Link to="/about">
            <Button
              variant="link"
              className="text-white font-bold text-lg p-0 h-auto mt-4 hover:no-underline hover:text-blue-200 group"
            >
              Explore Methodology{" "}
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
      </div>
    </div>
  </section>
);

// --- CAPABILITIES (AUTO-SCROLLING MARQUEE) ---
const DomainCard = ({ title, img }) => (
  // The Card Component
  <div className="w-[350px] md:w-[450px] h-[500px] relative shrink-0 cursor-pointer overflow-hidden border-b-4 border-transparent transition-all duration-500 shadow-xl bg-slate-100 mx-4">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
      style={{ backgroundImage: `url('${img}')` }}
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
    
    {/* Content */}
    <div className="absolute bottom-0 left-0 p-8 w-full">
      <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider font-oswald">
        {title}
      </h3>
      <div className="h-12 overflow-hidden">
        <p className="text-slate-300 text-sm font-light">
          Advanced simulation & validation suite.
        </p>
      </div>
      <div className="w-16 h-1 bg-[#0039A6] mt-4" />
    </div>
  </div>
);

const CapabilitiesSection = () => {
  const branches = [
    { title: "Mechanical", img: "/Mechanical Image.jpg" },
    { title: "Electrical", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069" },
    { title: "Civil", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" },
    { title: "Mining", img: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1974" },
    { title: "Metallurgy", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070" },
    { title: "Ceramic", img: "/Ceramic Image.jpg" },
  ];

  // We duplicate the array to create a seamless infinite loop
  const marqueeItems = [...branches, ...branches];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
       {/* CSS for the custom scroll animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        /* Pause on hover */
        .marquee-container:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 uppercase">
              Our Capabilities
            </h2>
            <div className="w-24 h-1 bg-[#0039A6] mt-4 mb-6" />
            <p className="text-lg text-black font-light leading-relaxed">
              We provide specialized simulation modules across six core
              engineering disciplines.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Wrapper */}
      {/* Marquee Wrapper */}
      <div className="marquee-container w-full group/list py-10">
        <div className="flex animate-scroll w-max items-center">
          {marqueeItems.map((branch, index) => (
            <div 
              key={index} 
              className="
                /* Default State: Smooth transitions */
                transition-all duration-500 ease-out
                
                /* When hovering the container: Blur, shrink, and fade ALL cards */
                group-hover/list:blur-[4px]
                group-hover/list:scale-[0.97]
                group-hover/list:opacity-60
                group-hover/list:grayscale-[0.6]

                /* When hovering THIS specific card: Force removal of blur/filters and pop it out */
                hover:!blur-none 
                hover:!scale-105 
                hover:!opacity-100 
                hover:!grayscale-0
                hover:z-50
              "
            >
              {/* Added a wrapper div here to apply the hover border/shadow cleanly without messing up the blur boundaries */}
              <div className="border-b-4 border-transparent hover:border-[#0039A6] hover:shadow-2xl transition-all duration-500">
                 <DomainCard title={branch.title} img={branch.img} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- HOW IT WORKS ---
// const HowItWorksSection = () => (
//   <section className="py-24 bg-slate-50">
//     <div className="max-w-7xl mx-auto px-6">
//       <div className="text-center mb-20">
//         <h2 className="text-4xl font-bold text-slate-900 uppercase mb-4 tracking-tight">
//           Operational Workflow
//         </h2>
//         <div className="w-16 h-1 bg-[#0039A6] mx-auto" />
//       </div>
//       <div className="grid md:grid-cols-3 gap-12 relative">
//         <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10" />
//         {[
//           {
//             icon: Database,
//             title: "Data Ingestion",
//             text: "Raw experimental data is uploaded and pre-processed.",
//           },
//           {
//             icon: Activity,
//             title: "Model Inference",
//             text: "Random Forest algorithms predict real-world outcomes.",
//           },
//           {
//             icon: CheckCircle2,
//             title: "Validation",
//             text: "Results are compared against analytical baselines.",
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="text-center group bg-white p-6 shadow-lg border border-slate-100"
//           >
//             <div className="w-24 h-24 mx-auto bg-slate-50 border-2 border-slate-100 rounded-full flex items-center justify-center text-[#0039A6] mb-8 group-hover:bg-[#0039A6] group-hover:text-white group-hover:border-[#0039A6] transition-all duration-500">
//               <item.icon size={36} strokeWidth={1.5} />
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 uppercase mb-4 tracking-wide">
//               {item.title}
//             </h3>
//             <p className="text-slate-600 leading-relaxed max-w-xs mx-auto font-light">
//               {item.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

const HowItWorksSection = () => (
  // 1. SMOOTHER GRADIENT: from a deep rich blue, through your brand blue, to a soft slate-50
  <section className="py-32 bg-gradient-to-br from-[#001f5c] via-[#0039A6]/80 to-slate-50 relative overflow-hidden">
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      
      {/* Header Area */}
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-6 tracking-tight drop-shadow-md">
          Operational Workflow
        </h2>
        <div className="w-24 h-1.5 bg-white/80 mx-auto rounded-full" />
      </div>
      
      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
        
        {/* 2. THE CONNECTING LINE: Aligned perfectly to the center of the icons */}
        <div className="hidden md:block absolute top-[88px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-white/10 via-white/40 to-slate-400/30 z-0" />
        
        {[
          {
            icon: Database,
            title: "Data Ingestion",
            text: "Raw experimental data is uploaded and pre-processed.",
          },
          {
            icon: Activity,
            title: "Model Inference",
            text: "Random Forest algorithms predict real-world outcomes.",
          },
          {
            icon: CheckCircle2,
            title: "Validation",
            text: "Results are compared against analytical baselines.",
          },
        ].map((item, i) => (
          <div
            key={i}
            // 3. REFINED CARDS: Softer corners, better padding, and a clean hover lift
            className="text-center relative z-10 group bg-white/95 backdrop-blur-sm p-10 shadow-xl hover:shadow-2xl border border-white/60 rounded-2xl transition-all duration-500 hover:-translate-y-3"
          >
            {/* Icon Container: Added a subtle shadow and scale effect on hover */}
            <div className="w-20 h-20 mx-auto bg-blue-50/80 shadow-inner border border-blue-100 rounded-full flex items-center justify-center text-[#0039A6] mb-8 group-hover:scale-110 group-hover:bg-[#0039A6] group-hover:text-white group-hover:shadow-blue-900/20 transition-all duration-500">
              <item.icon size={32} strokeWidth={1.5} />
            </div>
            
            {/* Typography adjustments for a cleaner hierarchy */}
            <h3 className="text-lg font-bold text-black uppercase tracking-widest mb-4">
              {item.title}
            </h3>
            <p className="text-blue leading-relaxed font-semibold px-2">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- COMMITMENT ---
// const CommitmentBox = ({ title, text }) => (
//   <div className="bg-[#0039A6] p-12 text-white hover:bg-[#002875] transition-colors duration-500 flex flex-col justify-between h-full min-h-80 border-r border-[#004dc0] last:border-r-0">
//     <div>
//       <h3 className="text-2xl font-bold uppercase mb-6 tracking-wider">
//         {title}
//       </h3>
//       <p className="text-blue-100 leading-relaxed font-light text-lg">{text}</p>
//     </div>
//     <div className="mt-10 opacity-60 group-hover:opacity-100 transition-opacity">
//       <ArrowRight className="text-white h-8 w-8" />
//     </div>
//   </div>
// );

// const CommitmentSection = () => (
//   <section className="bg-white pb-24">
//     <div className="max-w-7xl mx-auto px-6">
//       <h2 className="text-4xl font-bold text-slate-900 uppercase mb-12 tracking-tight">
//         Our Commitment
//       </h2>
//       <div className="grid md:grid-cols-3 gap-0 shadow-2xl">
//         <CommitmentBox
//           title="Accuracy"
//           text="We are committed to reducing the gap between simulation and reality through rigorous data validation."
//         />
//         <CommitmentBox
//           title="Innovation"
//           text="Continuously integrating the latest Machine Learning algorithms to modernize engineering education."
//         />
//         <CommitmentBox
//           title="Education"
//           text="Empowering the next generation of engineers with tools that reveal the complexity of the real world."
//         />
//       </div>
//     </div>
//   </section>
// );

const CommitmentBox = ({ title, text }) => (
  // 'group' class allows us to trigger animations on child elements when hovering the parent
  <div className="group bg-[#0039A6] p-10 md:p-14 text-white hover:bg-[#00308F] transition-all duration-300 flex flex-col justify-between h-full min-h-[320px] border-b md:border-b-0 md:border-r border-white/10 last:border-0 relative overflow-hidden">
    
    {/* Optional: Subtle gradient overlay on hover for extra depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <h3 className="text-xl md:text-2xl font-bold uppercase mb-6 tracking-widest text-white">
        {title}
      </h3>
      <p className="text-blue-100/90 leading-relaxed font-light text-base md:text-lg">
        {text}
      </p>
    </div>
    
    {/* Arrow Container: Slides right on hover */}
    <div className="mt-12 relative z-10 transform transition-transform duration-300 group-hover:translate-x-2">
      <ArrowRight className="text-white h-6 w-6 opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

const CommitmentSection = () => (
  // Light background to make the blue block stand out
  <section className="bg-slate-50 py-24">
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Header Area */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Our Commitment
        </h2>
        {/* Blue accent line to tie the branding together */}
        <div className="w-16 h-1.5 bg-[#0039A6] mt-4" />
      </div>
      
      {/* The Grid Container with a custom, high-end shadow */}
      <div className="grid md:grid-cols-3 gap-0 shadow-[0_20px_50px_rgba(0,57,166,0.15)] bg-[#0039A6]">
        <CommitmentBox
          title="Accuracy"
          text="We are committed to reducing the gap between simulation and reality through rigorous data validation."
        />
        <CommitmentBox
          title="Innovation"
          text="Continuously integrating the latest Machine Learning algorithms to modernize engineering education."
        />
        <CommitmentBox
          title="Education"
          text="Empowering the next generation of engineers with tools that reveal the most realistic outcomes."
        />
      </div>
      
    </div>
  </section>
);

const CTASection = () => (
  // Base background is white
  <section className="relative overflow-hidden bg-white py-24">
    
    {/* 1. THE GRADIENT: Sweeps from solid dark blue on the left to white on the right */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0039A6] via-[#0039A6]/95 to-slate-50 pointer-events-none" />

    {/* 2. DECORATIVE SKEW: Adds a subtle geometric light reflection on the right side to match your 'What We Do' section */}
    <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/60 to-transparent skew-x-12 translate-x-20 pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Left: Text Content (Sitting perfectly on the dark blue) */}
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
          Ready to bridge the gap?
        </h2>
        <p className="text-blue-100 text-lg md:text-xl font-light">
          Join leading universities and research labs using Exanso for advanced validation.
        </p>
      </div>

      {/* Right: The Button (Sitting on the white gradient, so we use a solid blue button for high contrast) */}
      <div className="shrink-0 mt-6 md:mt-0 relative">
        <Link to="/contact">
          <Button 
            className="group bg-[#0039A6] hover:bg-[#002875] text-white rounded-none px-10 py-7 text-base font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,57,166,0.3)] border border-[#0039A6]"
          >
            Contact Us 
            <ChevronRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
    </div>
  </section>
);

// --- MAIN PAGE ---
const Home = () => {
  return (
    <div className="bg-white font-sans selection:bg-[#0039A6] selection:text-white">
      <HeroSection />
      <WhatWeDoSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <CommitmentSection />
      <CTASection />
    </div>
  );
};

export default Home;