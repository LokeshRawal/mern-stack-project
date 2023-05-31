import HttpService from "../../../services/http.service";

class UserService extends HttpService{
    createUser = async(data) => {
        try{
            let response = await this.postRequest("/user", data, {file: true, login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    listUsers = async(config) => {
        try{
            let response = await this.getRequest("/user?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getActiveUsers = async() => {
        try{
            let response = await this.getRequest("/user/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    deleteUserById = async(id) => {
        try{
            let response = await this.deleteRequest("/user/"+id, {login: true})
            return response;
        }catch(err){
            throw err;
        }
    }

    getUserById = async(id) => {
        try {
            let response = await this.getRequest("/user/"+id, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    updateUser = async(data, id) => {
        try {
            let response = await this.putRequest("/user/"+id, data, {login: true, file: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    getUsersByType = async (type, config) => {
        try{
            let response = await this.getRequest("/user/type/"+type+"?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(error) {
            throw error;
        }
    }

}

const userSvc = new UserService();
export default userSvc;