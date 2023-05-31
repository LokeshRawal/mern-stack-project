import { useCallback, useEffect, useState } from "react";
import authSvc from "../pages/home/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({Component, checkrole}) => {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    let authCheck = useCallback(async() => {
        try{
            let userDetail = await authSvc.getLoggedInUser();
            if(userDetail.result.role === checkrole){
                setLoading(false);
            } else {
                toast.warning("Unauthorized access!!!");
                setLoading(false);
                navigate("/"+userDetail.result.role)
            }
        } catch(error){
            if(error.status === 401){
                navigate("/login")
            }
            console.log("Error :", error)
        } 
    }, [navigate, checkrole])

    useEffect(() => {
        authCheck();
    }, [authCheck])
    return loading ? "loading..." : Component;
}

export default PrivateRoute;