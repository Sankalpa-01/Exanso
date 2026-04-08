// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { Toaster } from "@/components/ui/sonner";

// // Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Pages
// import Home from "./pages/Home";
// import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
// import DepartmentView from "./components/DepartmentView";
// import Contact from "./pages/Contact"; 
// import ExperimentLayout from "./components/ExperimentLayout";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
//           <Navbar />

//           <main className="grow">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Auth />} />
//               <Route path="/contact" element={<Contact />} />{" "}
//               <Route path="/department/:deptId" element={<DepartmentView />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/experiment/:experimentId" element={<ExperimentLayout />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//           </main>

//           <Footer />

//           <Toaster position="top-right" theme="light" richColors closeButton />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DepartmentView from "./components/DepartmentView";
import Contact from "./pages/Contact"; 
import ExperimentLayout from "./components/ExperimentLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Updated selection color to perfectly match your brand's deep blue */}
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0039A6] selection:text-white flex flex-col">
          <Navbar />

          <main className="grow">
            <Routes>
              {/* =========================================
                  PUBLIC ROUTES (Anyone can access these)
                  ========================================= */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/contact" element={<Contact />} />

              {/* =========================================
                  PRIVATE ROUTES (Requires Login to access)
                  ========================================= */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/department/:deptId" 
                element={
                  <ProtectedRoute>
                    <DepartmentView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/experiment/:experimentId" 
                element={
                  <ProtectedRoute>
                    <ExperimentLayout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />

          <Toaster position="top-right" theme="light" richColors closeButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;