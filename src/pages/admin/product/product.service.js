import HttpService from "../../../services/http.service";

class ProductService extends HttpService{
    createProduct = async(data) => {
        try{
            let response = await this.postRequest("/product", data, {file: true, login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    listProducts = async(config) => {
        try{
            let response = await this.getRequest("/product?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getActiveProducts = async() => {
        try{
            let response = await this.getRequest("/product/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    deleteProductById = async(id) => {
        try{
            let response = await this.deleteRequest("/product/"+id, {login: true})
            return response;
        }catch(err){
            throw err;
        }
    }

    getProductById = async(id) => {
        try {
            let response = await this.getRequest("/product/"+id, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    updateProduct = async(data, id) => {
        try {
            let response = await this.putRequest("/product/"+id, data, {login: true, file: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    getAllFeatured = async() => {
        try{
            let response = await this.getRequest("/product/featured");
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const productSvc = new ProductService();
export default productSvc;