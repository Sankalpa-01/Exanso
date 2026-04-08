// // // import React, { createContext, useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { toast } from "sonner";

// // // // 👇 THIS LINE MUST HAVE "export" BEFORE "const"
// // // export const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // 1. Get Backend URL from .env
// // //   const API_URL = import.meta.env.VITE_API_URL;

// // //   // 2. Configure Axios Global Defaults
// // //   axios.defaults.baseURL = API_URL;

// // //   // Check if user is logged in on page load
// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     const storedUser = localStorage.getItem("username");

// // //     if (token && storedUser) {
// // //       setUser({ token, username: storedUser });
// // //       // Set the token for all future axios requests
// // //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// // //     }
// // //     setLoading(false);
// // //   }, []);

// // //   // Login Function
// // //   const login = async (username, password) => {
// // //     try {
// // //       await new Promise((resolve) => setTimeout(resolve, 800)); // Fake 800ms delay

// // //       if (username === "admin" && password === "password") {
// // //         const token = "simulated-jwt-token-xyz-123";

// // //         // Save to Storage
// // //         localStorage.setItem("token", token);
// // //         localStorage.setItem("username", username);

// // //         // Update State
// // //         setUser({ token, username });
// // //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// // //         toast.success("Welcome back!", {
// // //           description: "You have successfully logged in.",
// // //         });
// // //         return true;
// // //       } else {
// // //         throw new Error("Invalid credentials (try admin/password)");
// // //       }
// // //     } catch (error) {
// // //       console.error("Login failed:", error);
// // //       toast.error("Login Failed", {
// // //         description: error.message || "Could not connect to server.",
// // //       });
// // //       return false;
// // //     }
// // //   };

// // //   // Logout Function
// // //   const logout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("username");
// // //     setUser(null);
// // //     delete axios.defaults.headers.common["Authorization"];

// // //     toast.info("Logged out", {
// // //       description: "See you next time!",
// // //     });
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout, loading, API_URL }}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // };


// // import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "sonner";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
// //   axios.defaults.baseURL = API_URL;

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     const storedUser = localStorage.getItem("username");

// //     if (token && storedUser) {
// //       setUser({ token, username: storedUser });
// //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //     }
// //     setLoading(false);
// //   }, []);

// //   // ------------------------------------------------------------------
// //   // REAL BACKEND LOGIN FUNCTION
// //   // ------------------------------------------------------------------
// //   const login = async (email, password) => {
// //     try {
// //       // FastAPI strictly requires Form Data (not JSON) and expects the key "username"
// //       const formData = new URLSearchParams();
// //       formData.append("username", email); 
// //       formData.append("password", password);

// //       const response = await axios.post("/auth/login", formData, {
// //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       });

// //       // If successful, save the real token from FastAPI
// //       const token = response.data.access_token;
// //       localStorage.setItem("token", token);
// //       localStorage.setItem("username", email);

// //       setUser({ token, username: email });
// //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// //       return true;
// //     } catch (error) {
// //       console.error("Login failed:", error);
// //       return false;
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("username");
// //     setUser(null);
// //     delete axios.defaults.headers.common["Authorization"];

// //     toast.info("Logged out", { description: "See you next time!" });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, loading, API_URL }}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
//   axios.defaults.baseURL = API_URL;

//   // NEW: Fetch user data from the secure /me endpoint
//   const fetchUserData = async (email, token) => {
//     try {
//       const res = await axios.get(`/users/me`);
//       // If they have a pic in the DB, prepend the API URL to it
//       const fullPicUrl = res.data.profile_pic ? `${API_URL}${res.data.profile_pic}` : null;
      
//       setUser({ 
//         token, 
//         username: email, 
//         profilePic: fullPicUrl 
//       });
//     } catch (err) {
//       setUser({ token, username: email, profilePic: null });
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("username");

//     if (token && storedUser) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       fetchUserData(storedUser, token).finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const formData = new URLSearchParams();
//       formData.append("username", email); 
//       formData.append("password", password);

//       const response = await axios.post("/auth/login", formData, {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       });

//       const token = response.data.access_token;
//       localStorage.setItem("token", token);
//       localStorage.setItem("username", email);

//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       // Instantly fetch their profile pic after generating the token
//       await fetchUserData(email, token);
//       return true;
//     } catch (error) {
//       console.error("Login failed:", error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setUser(null);
//     delete axios.defaults.headers.common["Authorization"];

//     toast.info("Logged out", { description: "See you next time!" });
//   };

//   // NEW: Let the Profile page update the global context instantly
//   const updateProfilePic = (newUrl) => {
//     setUser(prev => ({ ...prev, profilePic: newUrl }));
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, API_URL, updateProfilePic }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  axios.defaults.baseURL = API_URL;

  // NEW: Fetch user data from the secure /me endpoint
  const fetchUserData = async (email, token) => {
    try {
      const res = await axios.get(`/users/me`);
      // If they have a pic in the DB, prepend the API URL to it
      const fullPicUrl = res.data.profile_pic ? `${API_URL}${res.data.profile_pic}` : null;
      
      setUser({ 
        token, 
        username: email, 
        profilePic: fullPicUrl 
      });
    } catch (err) {
      // IF FASTAPI SAYS 401 UNAUTHORIZED, THE TOKEN IS DEAD. LOG THEM OUT.
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
      } else {
        // If it's a different error (like a network glitch), just keep them logged in but without a photo
        setUser({ token, username: email, profilePic: null });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");

    if (token && storedUser) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData(storedUser, token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email); 
      formData.append("password", password);

      const response = await axios.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", email);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Instantly fetch their profile pic after generating the token
      await fetchUserData(email, token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];

    toast.info("Logged out", { description: "See you next time!" });
  };

  // Let the Profile page update the global context instantly
  const updateProfilePic = (newUrl) => {
    setUser(prev => ({ ...prev, profilePic: newUrl }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, API_URL, updateProfilePic }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};