import HttpService from "../../../services/http.service";

export class AuthService extends HttpService{
    registerProcess = async (data) => {
        try {
            let formData = new FormData();
            if (data.image) {
                formData.append('image', data.image, data.image.name)
                delete data.image
            }
            (Object.keys(data)).forEach((item) => {
                formData.append(item, data[item])
            })

            let response = await this.postRequest("/register", formData, {file: true});
            return response;
        }
        catch (err) {
            throw err;
        }
    }

    loginUser = async (data) => {
        try{
            let response = await this.postRequest('/login', data);
            return response;
        } catch(error) {
            throw error;
        }
    }

    getLoggedInUser = async ()=> {
        try{
            let response = await this.getRequest('/my-profile', {login:true}); 
            // console.log("Response: ", response);
            return response;
        } catch(error) {
            throw error;
        }
    }
}
const authSvc = new AuthService();
export default authSvc;