import AppConstants from "./constants"

const helpers = {
    getLoggedInStatus: () => {
        let token = localStorage.getItem(AppConstants.ACCESSTOKEN_KEY);
        if(token){
            return true;
        } else {
            return false;
        }
    },
    // upper case first
    ucfirst : (str) => {
        return str.charAt(0).toUpperCase()+str.slice(1)
    }
}

export default helpers;