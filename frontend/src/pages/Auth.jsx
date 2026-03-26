// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsSubmitting(true);
//     const success = await login(username, password);
//     setIsSubmitting(false);

//     if (success) {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center bg-slate-950 px-4 relative">
//       {/* Decorative Blur */}
//       <div className="absolute w-125 h-125 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

//       <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-slate-100 shadow-2xl relative z-10">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">
//             Welcome Back
//           </CardTitle>
//           <CardDescription className="text-center text-slate-400">
//             Enter your credentials to access the laboratory.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 placeholder="admin"
//                 className="bg-slate-950 border-slate-700 text-white focus-visible:ring-blue-500"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••"
//                 className="bg-slate-950 border-slate-700 text-white focus-visible:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <Button
//               className="w-full bg-blue-600 hover:bg-blue-500 mt-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
//                   Authenticating...
//                 </>
//               ) : (
//                 "Access Dashboard"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-500">
//           <div>
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
//             >
//               Register here
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

const Login = () => {
  // State to toggle between Login (false) and Register (true)
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    // FIXED 1: Added 'pt-28' (padding-top) so the card sits nicely below your fixed Navbar
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans overflow-hidden p-6 pt-28">
      
      {/* Main Card Container */}
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,57,166,0.2)] border border-[#0039A6]/20 overflow-hidden">
        
        {/* =========================================
            LEFT SIDE: LOGIN FORM 
            ========================================= */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-[100%] opacity-0 z-10" : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Login</h2>
          
          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            
            <button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg">
              Login
            </button>
          </form>
          
          {/* Mobile Toggle (Visible only on small screens where the overlay hides) */}
          <p className="mt-6 text-sm text-slate-500 md:hidden">
            Don't have an account?{" "}
            <button onClick={() => setIsSignUp(true)} className="text-[#0039A6] font-bold">Sign Up</button>
          </p>
        </div>

        {/* =========================================
            RIGHT SIDE: REGISTER FORM 
            ========================================= */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-[100%] opacity-100 z-20" : "translate-x-0 opacity-0 z-10"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Register</h2>
          
          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            
            <button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg">
              Sign Up
            </button>
          </form>

          {/* Mobile Toggle */}
          <p className="mt-6 text-sm text-slate-500 md:hidden">
            Already have an account?{" "}
            <button onClick={() => setIsSignUp(false)} className="text-[#0039A6] font-bold">Sign In</button>
          </p>
        </div>

        {/* =========================================
            THE SWEEPING OVERLAY (The Blue Part)
            ========================================= */}
        {/* FIXED 2: Changed z-50 to z-30 here so it stays underneath the Navbar */}
        <div
          className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div
            className={`bg-gradient-to-br from-[#0039A6] to-[#001f5c] relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Decorative Slanted Geometric Shapes inside the blue overlay */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-0 right-[20%] w-[30%] h-[150%] bg-white -skew-x-12" />
               <div className="absolute top-0 left-[20%] w-[10%] h-[150%] bg-white -skew-x-12" />
            </div>

            {/* Left Panel of Overlay (Visible when registering) */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
                Welcome!
              </h2>
              <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
                Enter your personal details to open your account and begin your journey.
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
              >
                Sign In
              </button>
            </div>

            {/* Right Panel of Overlay (Visible when logging in) */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
                Welcome Back!
              </h2>
              <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
                To keep connected with us please login with your personal info.
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
              >
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;