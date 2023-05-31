import axios from "axios";
import AppConstants from "../config/constants";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server timed out ...",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

})

axiosInstance.interceptors.response.use((response) => {
    // console.log("Success Interceptor", response);
    return response;
}, (error) => {
    // TODO : Error handling
    // console.log("Error Intercept", error);
    if(error.response.status === 401){
        // user not logged in
        // TODO: logout the current user and redirect to login page
        localStorage.removeItem(AppConstants.ACCESSTOKEN_KEY);
        // throw error.response;
        // window.location.href= "/login"

    }else if(error.response.status === 403){
        //user doesnot have permission
        // navigave to user dashboard

        
    }
    throw error.response;
})

export default axiosInstance;