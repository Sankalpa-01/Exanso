// import React from "react";

// const Footer = () => {
//   return (
//     // Replaced slate-950 with the deep navy brand background
//     <footer className="w-full py-12 bg-[#0B1120] border-t border-white/5 mt-auto font-sans">
//       {/* Aligned with max-w-7xl to perfectly match all other sections */}
//       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
//         {/* Left Side: Branding & Copyright */}
//         <div className="flex flex-col items-center md:items-start">
          
//           <p className="text-sm text-blue-100/60 text-center md:text-left">
//             © {new Date().getFullYear()} Exanso Platform. All rights reserved.
//           </p>
//         </div>

//         {/* Right Side: Links */}
//         {/* Adjusted spacing and hover states to pop as bright white */}
//         <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium pt-2 md:pt-0">
//           <a href="#" className="text-blue-100/70 hover:text-white transition-colors">
//             Documentation
//           </a>
//           <a href="#" className="text-blue-100/70 hover:text-white transition-colors">
//             GitHub
//           </a>
//           <a href="#" className="text-blue-100/70 hover:text-white transition-colors">
//             Contact Support
//           </a>
//         </div>
        
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // 1. BACKGROUND CHANGED: Using a super-dark midnight blue (#050B14) 
    // This perfectly separates the footer from the vibrant brand blue CTA above it.
    <footer className="w-full py-12 bg-[#050B14] border-t border-white/10 mt-auto font-sans">
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Side: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start">
          
          {/* Logo: Keeping the white box, but the "E" now matches the dark footer background */}
          <Link to="/" className="flex items-center space-x-3 mb-6 group">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-lg">
              <span className="text-[#050B14] font-extrabold text-lg leading-none">E</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">
              Exanso
            </span>
          </Link>
          
          <p className="text-sm text-slate-400 text-center md:text-left font-light">
            © {new Date().getFullYear()} Exanso Platform. All rights reserved.
          </p>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-6 text-sm pt-4 md:pt-2">
          {/* Links updated to a clean slate color that brightens to pure white on hover */}
          <a href="#" className="text-slate-300 font-semibold uppercase tracking-widest hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#" className="text-slate-300 font-semibold uppercase tracking-widest hover:text-white transition-colors">
            GitHub
          </a>
          <a href="/contact" className="text-slate-300 font-semibold uppercase tracking-widest hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;