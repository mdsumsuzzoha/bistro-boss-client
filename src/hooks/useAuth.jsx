import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
   const authInfo = useContext(AuthContext);
   // console.log(authInfo);
   return authInfo;
};

export default useAuth;