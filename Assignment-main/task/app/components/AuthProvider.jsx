"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout, setUser } from "@/lib/redux/user/userSlice";


export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/user/me", { withCredentials: true })
      .then(res => dispatch(setUser(res.data)))
      .catch(() => dispatch(logout()));
  }, []);

  return <>{children}</>;
}
