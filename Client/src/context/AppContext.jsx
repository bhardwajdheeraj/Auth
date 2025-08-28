import api from "../axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  // Removed direct axios baseURL setup. Use custom api instance.

  // 🔐 Auth check — uses custom api instance
  const getAuthState = async () => {
    try {
      const { data } = await api.get(`/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      setIsLoggedin(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🧠 Fetch user details — uses custom api instance
  const getUserData = async () => {
    try {
      const { data } = await api.get(`/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🔍 Run auth check on mount (Cookie-based Auth — token is in httpOnly cookie)
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
