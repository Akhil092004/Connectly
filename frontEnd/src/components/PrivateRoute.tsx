import React,{ReactNode} from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute: React.FC<{children:ReactNode}> = ({children}) => {

    const {token,user} = useAuth();

    if(!token || !user?._id){
        return <Navigate to="/login" replace/>
    }

    return children
}

export default PrivateRoute