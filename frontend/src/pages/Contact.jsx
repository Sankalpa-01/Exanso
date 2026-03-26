// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Mail, MapPin, Phone } from "lucide-react";

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 pt-20">
//       {/* Header Strip */}
//       <div className="bg-[#0039A6] py-16 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
//           Get in Touch
//         </h1>
//         <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-lg">
//           Have questions about the platform or want to request a demo for your
//           department?
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
//         {/* Left: Info */}
//         <div className="space-y-12">
//           <div>
//             <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase">
//               Contact Information
//             </h3>
//             <p className="text-slate-600 leading-relaxed">
//               We are based in the Department of Mechanical Engineering at NIT
//               Rourkela. Our team is available Mon-Fri, 9am - 5pm IST.
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="flex items-start gap-4">
//               <div className="bg-blue-100 p-3 rounded-none text-[#0039A6]">
//                 <MapPin size={24} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">Address</h4>
//                 <p className="text-slate-600">
//                   NIT Rourkela, Jindal Colony, <br />
//                   Udit Nagar, Rourkela, Odisha 769001
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="bg-blue-100 p-3 rounded-none text-[#0039A6]">
//                 <Mail size={24} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">Email</h4>
//                 <p className="text-slate-600">research@sim2real.edu</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="bg-blue-100 p-3 rounded-none text-[#0039A6]">
//                 <Phone size={24} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">Phone</h4>
//                 <p className="text-slate-600">+91 98765 43210</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Form */}
//         <div className="bg-white p-10 shadow-2xl border-t-4 border-[#0039A6]">
//           <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase">
//             Send a Message
//           </h3>
//           <form className="space-y-6">
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 uppercase">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-[#0039A6] transition-colors"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 uppercase">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-[#0039A6] transition-colors"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 uppercase">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-[#0039A6] transition-colors"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 uppercase">
//                 Message
//               </label>
//               <textarea
//                 rows="4"
//                 className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-[#0039A6] transition-colors resize-none"
//               ></textarea>
//             </div>

//             <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-6 rounded-none uppercase tracking-widest text-lg">
//               Submit Request
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    // Base container with a split background
    <div className="min-h-screen relative bg-slate-50 flex items-center pt-20 overflow-hidden font-sans">
      
      {/* BACKGROUND: Dark Navy/Blue Split on the Left */}
      <div className="absolute top-0 left-0 w-full md:w-[45%] h-full bg-[#0B1120]">
        {/* Subtle gradient overlay to tie in the primary brand color */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0039A6]/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 lg:gap-24 relative z-10 w-full">
        
        {/* LEFT COLUMN: Contact Info (Dark Theme) */}
        <div className="space-y-16 py-8 md:pr-10">
          
          <div>
            <div className="inline-block border-b-4 border-[#0039A6] pb-2 mb-6">
              <h2 className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm">
                Get in Touch
              </h2>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tighter mb-6 leading-tight">
              Let's start the <br /> conversation.
            </h1>
            <p className="text-lg text-blue-100/80 font-light leading-relaxed max-w-md">
              Have questions about the platform or want to request a demo for your department? Our team at NIT Rourkela is here to help.
            </p>
          </div>

          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-6 group">
              <div className="bg-white/5 border border-white/10 p-4 text-blue-400 transition-colors group-hover:bg-[#0039A6] group-hover:text-white">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Office</h4>
                <p className="text-blue-50 font-light leading-relaxed">
                  Dept. of Mechanical Engineering<br />
                  NIT Rourkela, Jindal Colony,<br />
                  Odisha 769001
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-6 group">
              <div className="bg-white/5 border border-white/10 p-4 text-blue-400 transition-colors group-hover:bg-[#0039A6] group-hover:text-white">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</h4>
                <p className="text-blue-50 font-light">research@exanso.edu</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-6 group">
              <div className="bg-white/5 border border-white/10 p-4 text-blue-400 transition-colors group-hover:bg-[#0039A6] group-hover:text-white">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</h4>
                <p className="text-blue-50 font-light">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form (Light Theme) */}
        <div className="bg-white p-10 md:p-14 shadow-2xl border-t-4 border-[#0039A6] relative">
          <h3 className="text-3xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">
            Send a Message
          </h3>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-none"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-none"
                placeholder="john@university.edu"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-none resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <Button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-7 rounded-none uppercase tracking-[0.2em] text-sm transition-transform hover:-translate-y-1 hover:shadow-xl">
              Submit Request
            </Button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;