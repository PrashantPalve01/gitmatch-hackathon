// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../App";

export const useAuth = () => {
  return useContext(AuthContext);
};
