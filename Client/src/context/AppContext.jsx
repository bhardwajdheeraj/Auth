import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  // 🔐 Auth check
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`/api/auth/is-auth`);
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

  // 🧠 Fetch user details
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🔍 Run auth check only if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthState();
    } else {
      console.log("🔒 No token found — skipping is-auth check");
    }
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
