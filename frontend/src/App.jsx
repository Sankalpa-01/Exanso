import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DepartmentView from "./components/DepartmentView";
import Contact from "./pages/Contact"; 
import HeatExchanger from "./components/experiments/HeatExchanger";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
          <Navbar />

          <main className="grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/contact" element={<Contact />} />{" "}
              <Route path="/department/:deptId" element={<DepartmentView />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/experiment/heat-exchanger"
                element={<HeatExchanger />}
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
