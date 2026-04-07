// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { User, Mail, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

// const Profile = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Prevent crashing if a user manually navigates here without logging in
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold text-slate-900">Please log in to view this page.</h2>
//         <Button onClick={() => navigate("/login")} className="mt-4 bg-[#0039A6]">Go to Login</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 pt-28 px-6 pb-12 font-sans">
//       <div className="max-w-3xl mx-auto">
        
//         {/* Header Title */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-extrabold text-[#0039A6] uppercase tracking-tight">
//             My Profile
//           </h1>
//           <div className="w-16 h-1.5 bg-[#0039A6] mt-4" />
//         </div>

//         <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,57,166,0.1)] border border-slate-200 overflow-hidden">
          
//           {/* Top Banner Area */}
//           <div className="h-32 bg-gradient-to-r from-[#0039A6] to-[#002875] relative">
//             <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
//               <User size={48} className="text-[#0039A6]" strokeWidth={1.5} />
//             </div>
//           </div>

//           {/* User Info Section */}
//           <div className="pt-16 px-8 pb-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
//               <div className="space-y-4 flex-1">
//                 <div>
//                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Email</h3>
//                   <div className="flex items-center gap-3 text-slate-800">
//                     <Mail size={18} className="text-slate-400" />
//                     <span className="text-lg font-medium">{user.username}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Status</h3>
//                   <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-max px-3 py-1 rounded-full text-sm font-bold">
//                     <ShieldCheck size={16} />
//                     Verified Student
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col gap-3 min-w-[200px]">
//                 <Button 
//                   onClick={() => navigate("/dashboard")}
//                   className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-6 uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-md"
//                 >
//                   <LayoutDashboard className="mr-2 h-5 w-5" />
//                   Go To Labs
//                 </Button>
                
//                 <Button 
//                   variant="outline"
//                   onClick={handleLogout}
//                   className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold py-6 uppercase tracking-widest transition-colors"
//                 >
//                   <LogOut className="mr-2 h-5 w-5" />
//                   Sign Out
//                 </Button>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Mail, LogOut, LayoutDashboard, ShieldCheck, Camera, Key, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- STATE FOR PHOTO UPLOAD ---
  const [profilePic, setProfilePic] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // --- STATE FOR PASSWORD MODAL ---
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- PHOTO UPLOAD LOGIC ---
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulating a network delay for the UI
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setProfilePic(imageUrl);
        setIsUploading(false);
        toast.success("Profile photo updated successfully!");
      }, 1500);
    }
  };

  // --- PASSWORD CHANGE LOGIC ---
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsChangingPassword(true);
    // Simulate FastAPI call
    setTimeout(() => {
      setIsChangingPassword(false);
      setShowPasswordModal(false);
      setPasswords({ old: "", new: "", confirm: "" });
      toast.success("Password changed successfully!");
    }, 1500);
  };

  // Prevent crashing if a user manually navigates here without logging in
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900">Please log in to view this page.</h2>
        <Button onClick={() => navigate("/login")} className="mt-4 bg-[#0039A6]">Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6 pb-12 font-sans relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#0039A6] uppercase tracking-tight">
            My Profile
          </h1>
          <div className="w-16 h-1.5 bg-[#0039A6] mt-4" />
        </div>

        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,57,166,0.1)] border border-slate-200 overflow-hidden">
          
          {/* Top Banner Area */}
          <div className="h-32 bg-gradient-to-r from-[#0039A6] to-[#002875] relative">
            
            {/* INTERACTIVE AVATAR */}
            <div className="absolute -bottom-12 left-8 group">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden relative transition-transform group-hover:scale-105">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-[#0039A6] animate-spin" />
                ) : profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-[#0039A6]" strokeWidth={1.5} />
                )}
                
                {/* Hover Overlay for Camera */}
                <div 
                  onClick={handlePhotoClick}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                >
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              
              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/png, image/jpeg, image/jpg" 
              />
            </div>
          </div>

          {/* User Info Section */}
          <div className="pt-16 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Email</h3>
                  <div className="flex items-center gap-3 text-slate-800">
                    <Mail size={18} className="text-slate-400" />
                    <span className="text-lg font-medium">{user.username}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Status</h3>
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-max px-3 py-1 rounded-full text-sm font-bold border border-emerald-100">
                    <ShieldCheck size={16} />
                    Verified Student
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-6 uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go To Labs
                </Button>

                {/* NEW: CHANGE PASSWORD BUTTON */}
                <Button 
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-6 uppercase tracking-widest transition-transform hover:-translate-y-0.5 border border-slate-200 shadow-sm"
                >
                  <Key className="mr-2 h-5 w-5 text-slate-500" />
                  Change Password
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-bold py-6 uppercase tracking-widest transition-colors mt-2"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------
          PASSWORD CHANGE MODAL (Light Theme)
          --------------------------------------------------------- */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl relative overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-wide uppercase">
                <Key className="text-[#0039A6]" /> Update Password
              </h2>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwords.old}
                  onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                <input
                  type="password"
                  required
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-[#0039A6] focus:ring-1 focus:ring-[#0039A6] transition-all rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-red-500 transition-all rounded-md"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-6 uppercase tracking-widest text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isChangingPassword}
                  className="flex-1 bg-[#0039A6] hover:bg-[#002875] text-white font-bold py-6 uppercase tracking-widest text-xs shadow-lg"
                >
                  {isChangingPassword ? <Loader2 className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;