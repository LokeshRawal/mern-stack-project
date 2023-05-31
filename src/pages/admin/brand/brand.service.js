import HttpService from "../../../services/http.service";

class BrandService extends HttpService{
    createBrand = async(data) => {
        try{
            let response = await this.postRequest("/brand", data, {file: true, login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    listBrands = async(config) => {
        try{
            let response = await this.getRequest("/brand?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getActiveBrands = async() => {
        try{
            let response = await this.getRequest("/brand/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    deleteBrandById = async(id) => {
        try{
            let response = await this.deleteRequest("/brand/"+id, {login: true})
            return response;
        }catch(err){
            throw err;
        }
    }

    getBrandById = async(id) => {
        try {
            let response = await this.getRequest("/brand/"+id, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    updateBrand = async(data, id) => {
        try {
            let response = await this.putRequest("/brand/"+id, data, {login: true, file: true})
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const brandSvc = new BrandService();
export default brandSvc;