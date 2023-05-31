import HttpService from "../../../services/http.service";

class CategoryService extends HttpService{
    createCategory = async(data) => {
        try{
            let response = await this.postRequest("/category", data, {file: true, login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    listCategories = async(config) => {
        try{
            let response = await this.getRequest("/category?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getActiveCategories = async() => {
        try{
            let response = await this.getRequest("/category/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    deleteCategoryById = async(id) => {
        try{
            let response = await this.deleteRequest("/category/"+id, {login: true})
            return response;
        }catch(err){
            throw err;
        }
    }

    getCategoryById = async(id) => {
        try {
            let response = await this.getRequest("/category/"+id, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    updateCategory = async(data, id) => {
        try {
            let response = await this.putRequest("/category/"+id, data, {login: true, file: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    getAllFeatured = async() => {
        try{
            let response = await this.getRequest("/category/featured");
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const categorySvc = new CategoryService();
export default categorySvc;