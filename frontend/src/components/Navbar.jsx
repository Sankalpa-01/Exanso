import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears token from context & local storage
    navigate("/login"); // Redirects to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      {/* Aligned with max-w-7xl to perfectly match the Hero Section container */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-[#0039A6] rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-blue-900/20">
            <span className="text-white font-bold text-lg leading-none">Ex</span>
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            Exanso
          </span>
        </Link>

        {/* Navigation Links & Auth Area */}
        <div className="flex items-center gap-8">
          
          {/* Main Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Conditional Rendering based on Login Status */}
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-4 pl-6 border-l border-white/20">
                <span className="text-sm text-slate-300 hidden sm:inline-block">
                  {user.username}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white hover:bg-white/10 px-4"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center pl-2">
              <Link to="/login">
                {/* Login Button matching the website's visual style */}
                <Button className="bg-[#0039A6] hover:bg-[#002875] text-white rounded-md px-6 py-2 text-sm font-medium transition-colors shadow-lg shadow-blue-900/20 border border-[#0039A6]/50">
                  Login/Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Clears token from context & local storage
//     navigate("/login"); // Redirects to login page
//   };

//   return (
//     // UPDATED: Background is now solid brand blue with a subtle shadow and white border line
//     <nav className="fixed top-0 left-0 w-full z-50 bg-[#0039A6] shadow-md border-b border-white/10 transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
//         {/* Logo Area */}
//         <Link to="/" className="flex items-center space-x-3 group">
//           {/* UPDATED: Inverted to a White box with Blue text so it pops on the blue navbar */}
//           <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
//             <span className="text-[#0039A6] font-extrabold text-lg leading-none">E</span>
//           </div>
//           <span className="text-xl font-bold text-white tracking-wide">
//             Exanso
//           </span>
//         </Link>

//         {/* Navigation Links & Auth Area */}
//         <div className="flex items-center gap-8">
          
//           {/* Main Links */}
//           <div className="hidden md:flex items-center gap-6">
//             {/* UPDATED: Changed text colors from slate to blue-100 so they look clean on the blue background */}
//             <Link
//               to="/"
//               className="text-sm font-medium text-blue-100 hover:text-white transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               to="/contact"
//               className="text-sm font-medium text-blue-100 hover:text-white transition-colors"
//             >
//               Contact Us
//             </Link>
//           </div>

//           {/* Conditional Rendering based on Login Status */}
//           {user ? (
//             <div className="flex items-center gap-6">
//               <Link
//                 to="/dashboard"
//                 className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
//               >
//                 Dashboard
//               </Link>

//               <div className="flex items-center gap-4 pl-6 border-l border-white/20">
//                 <span className="text-sm text-blue-50 hidden sm:inline-block">
//                   {user.username}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleLogout}
//                   className="text-blue-100 hover:text-white hover:bg-white/10 px-4"
//                 >
//                   Logout
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center pl-2">
//               <Link to="/login">
//                 {/* UPDATED: Changed to a solid White button with Blue text for high contrast */}
//                 <Button className="bg-white hover:bg-blue-50 text-[#0039A6] rounded-md px-6 py-2 text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5">
//                   Login/Register
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;