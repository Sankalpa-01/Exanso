// // import React, { useState } from "react";
// // import { User, Mail, Lock } from "lucide-react";

// // const Login = () => {
// //   // State to toggle between Login (false) and Register (true)
// //   const [isSignUp, setIsSignUp] = useState(false);

// //   return (
// //     // FIXED 1: Added 'pt-28' (padding-top) so the card sits nicely below your fixed Navbar
// //     <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans overflow-hidden p-6 pt-28">
      
// //       {/* Main Card Container */}
// //       <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,57,166,0.2)] border border-[#0039A6]/20 overflow-hidden">
        
// //         {/* =========================================
// //             LEFT SIDE: LOGIN FORM 
// //             ========================================= */}
// //         <div
// //           className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
// //             isSignUp ? "translate-x-[100%] opacity-0 z-10" : "translate-x-0 opacity-100 z-20"
// //           }`}
// //         >
// //           <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Login</h2>
          
// //           <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
// //             <div className="relative">
// //               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Username"
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
// //               />
// //             </div>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
// //               />
// //             </div>
            
// //             <button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg">
// //               Login
// //             </button>
// //           </form>
          
// //           {/* Mobile Toggle (Visible only on small screens where the overlay hides) */}
// //           <p className="mt-6 text-sm text-slate-500 md:hidden">
// //             Don't have an account?{" "}
// //             <button onClick={() => setIsSignUp(true)} className="text-[#0039A6] font-bold">Sign Up</button>
// //           </p>
// //         </div>

// //         {/* =========================================
// //             RIGHT SIDE: REGISTER FORM 
// //             ========================================= */}
// //         <div
// //           className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
// //             isSignUp ? "translate-x-[100%] opacity-100 z-20" : "translate-x-0 opacity-0 z-10"
// //           }`}
// //         >
// //           <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Register</h2>
          
// //           <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
// //             <div className="relative">
// //               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Username"
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
// //               />
// //             </div>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
// //               />
// //             </div>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
// //               />
// //             </div>
            
// //             <button className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg">
// //               Sign Up
// //             </button>
// //           </form>

// //           {/* Mobile Toggle */}
// //           <p className="mt-6 text-sm text-slate-500 md:hidden">
// //             Already have an account?{" "}
// //             <button onClick={() => setIsSignUp(false)} className="text-[#0039A6] font-bold">Sign In</button>
// //           </p>
// //         </div>

// //         {/* =========================================
// //             THE SWEEPING OVERLAY (The Blue Part)
// //             ========================================= */}
// //         {/* FIXED 2: Changed z-50 to z-30 here so it stays underneath the Navbar */}
// //         <div
// //           className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${
// //             isSignUp ? "-translate-x-full" : "translate-x-0"
// //           }`}
// //         >
// //           <div
// //             className={`bg-gradient-to-br from-[#0039A6] to-[#001f5c] relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
// //               isSignUp ? "translate-x-1/2" : "translate-x-0"
// //             }`}
// //           >
// //             {/* Decorative Slanted Geometric Shapes inside the blue overlay */}
// //             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
// //                <div className="absolute top-0 right-[20%] w-[30%] h-[150%] bg-white -skew-x-12" />
// //                <div className="absolute top-0 left-[20%] w-[10%] h-[150%] bg-white -skew-x-12" />
// //             </div>

// //             {/* Left Panel of Overlay (Visible when registering) */}
// //             <div
// //               className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
// //                 isSignUp ? "translate-x-0" : "-translate-x-[20%]"
// //               }`}
// //             >
// //               <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
// //                 Welcome!
// //               </h2>
// //               <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
// //                 Enter your personal details to open your account and begin your journey.
// //               </p>
// //               <button
// //                 onClick={() => setIsSignUp(false)}
// //                 className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
// //               >
// //                 Sign In
// //               </button>
// //             </div>

// //             {/* Right Panel of Overlay (Visible when logging in) */}
// //             <div
// //               className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
// //                 isSignUp ? "translate-x-[20%]" : "translate-x-0"
// //               }`}
// //             >
// //               <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
// //                 Welcome Back!
// //               </h2>
// //               <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
// //                 To keep connected with us please login with your personal info.
// //               </p>
// //               <button
// //                 onClick={() => setIsSignUp(true)}
// //                 className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
// //               >
// //                 Register
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState, useContext } from "react";
// import { User, Mail, Lock, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   // UI State
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Form Data State
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ---------------------------------------------------------
//   // LOGIN LOGIC
//   // ---------------------------------------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);
//     // Using your existing AuthContext login function
//     const success = await login(username, password);
//     setIsLoading(false);

//     if (success) {
//       toast.success("Welcome back!");
//       navigate("/dashboard");
//     }
//   };

//   // ---------------------------------------------------------
//   // REGISTER LOGIC
//   // ---------------------------------------------------------
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error("Email and password are required");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Direct call to your FastAPI backend
//       const response = await fetch("http://127.0.0.1:8000/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         toast.success("Registration successful! Please sign in.");
//         // Clear the fields and slide the UI back to the login screen
//         setPassword("");
//         setIsSignUp(false); 
//       } else {
//         const data = await response.json();
//         toast.error(data.detail || "Registration failed");
//       }
//     } catch (err) {
//       toast.error("Cannot connect to server. Is FastAPI running?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans overflow-hidden p-6 pt-28">
//       <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-[0_0_40px_rgba(0,57,166,0.2)] border border-[#0039A6]/20 overflow-hidden">
        
//         {/* =========================================
//             LEFT SIDE: LOGIN FORM 
//             ========================================= */}
//         <div
//           className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
//             isSignUp ? "translate-x-[100%] opacity-0 z-10" : "translate-x-0 opacity-100 z-20"
//           }`}
//         >
//           <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Login</h2>
          
//           <form className="w-full space-y-4" onSubmit={handleLogin}>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Username (or Email)"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
//               />
//             </div>
            
//             <button 
//               disabled={isLoading}
//               className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
//             >
//               {isLoading && !isSignUp ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Login"}
//             </button>
//           </form>
          
//           <p className="mt-6 text-sm text-slate-500 md:hidden">
//             Don't have an account?{" "}
//             <button onClick={() => setIsSignUp(true)} className="text-[#0039A6] font-bold">Sign Up</button>
//           </p>
//         </div>

//         {/* =========================================
//             RIGHT SIDE: REGISTER FORM 
//             ========================================= */}
//         <div
//           className={`absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col items-center justify-center px-12 transition-all duration-700 ease-in-out ${
//             isSignUp ? "translate-x-[100%] opacity-100 z-20" : "translate-x-0 opacity-0 z-10"
//           }`}
//         >
//           <h2 className="text-4xl font-extrabold text-[#0039A6] mb-8 tracking-tight">Register</h2>
          
//           <form className="w-full space-y-4" onSubmit={handleRegister}>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
//               />
//             </div>
            
//             <button 
//               disabled={isLoading}
//               className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
//             >
//               {isLoading && isSignUp ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign Up"}
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-slate-500 md:hidden">
//             Already have an account?{" "}
//             <button onClick={() => setIsSignUp(false)} className="text-[#0039A6] font-bold">Sign In</button>
//           </p>
//         </div>

//         {/* =========================================
//             THE SWEEPING OVERLAY
//             ========================================= */}
//         <div
//           className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${
//             isSignUp ? "-translate-x-full" : "translate-x-0"
//           }`}
//         >
//           <div
//             className={`bg-gradient-to-br from-[#0039A6] to-[#001f5c] relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
//               isSignUp ? "translate-x-1/2" : "translate-x-0"
//             }`}
//           >
//             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
//                <div className="absolute top-0 right-[20%] w-[30%] h-[150%] bg-white -skew-x-12" />
//                <div className="absolute top-0 left-[20%] w-[10%] h-[150%] bg-white -skew-x-12" />
//             </div>

//             <div
//               className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
//                 isSignUp ? "translate-x-0" : "-translate-x-[20%]"
//               }`}
//             >
//               <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
//                 Welcome!
//               </h2>
//               <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
//                 Enter your personal details to open your account and begin your journey.
//               </p>
//               <button
//                 onClick={() => setIsSignUp(false)}
//                 className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
//               >
//                 Sign In
//               </button>
//             </div>

//             <div
//               className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center transform transition-transform duration-700 ease-in-out ${
//                 isSignUp ? "translate-x-[20%]" : "translate-x-0"
//               }`}
//             >
//               <h2 className="text-5xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
//                 Welcome Back!
//               </h2>
//               <p className="text-blue-100 font-light text-lg mb-8 leading-relaxed">
//                 To keep connected with us please login with your personal info.
//               </p>
//               <button
//                 onClick={() => setIsSignUp(true)}
//                 className="bg-transparent border-2 border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:bg-white hover:text-[#0039A6]"
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // UI State
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Data State (Removed 'username' to strictly use 'email' to match the database)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // LOGIN LOGIC
  // ---------------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Pass the 'email' into the login function
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  // ---------------------------------------------------------
  // REGISTER & AUTO-LOGIN LOGIC
  // ---------------------------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create the user in the database
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success("Registration successful! Preparing your lab...");
        
        // 2. AUTO-LOGIN: Instantly call the login function with the same details
        const loginSuccess = await login(email, password);
        
        // 3. Route directly to dashboard
        if (loginSuccess) {
           navigate("/dashboard");
        }
      } else {
        const data = await response.json();
        toast.error(data.detail || "Registration failed");
      }
    } catch (err) {
      toast.error("Cannot connect to server. Is FastAPI running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans overflow-hidden p-6 pt-28">
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
          
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            
            <button 
              disabled={isLoading}
              className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
            >
              {isLoading && !isSignUp ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Login"}
            </button>
          </form>
          
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
          
          <form className="w-full space-y-4" onSubmit={handleRegister}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-colors"
              />
            </div>
            
            <button 
              disabled={isLoading}
              className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-3 mt-4 rounded-full uppercase tracking-widest transition-transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
            >
              {isLoading && isSignUp ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 md:hidden">
            Already have an account?{" "}
            <button onClick={() => setIsSignUp(false)} className="text-[#0039A6] font-bold">Sign In</button>
          </p>
        </div>

        {/* =========================================
            THE SWEEPING OVERLAY
            ========================================= */}
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
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-0 right-[20%] w-[30%] h-[150%] bg-white -skew-x-12" />
               <div className="absolute top-0 left-[20%] w-[10%] h-[150%] bg-white -skew-x-12" />
            </div>

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