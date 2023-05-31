import HttpService from "../../../services/http.service";

class BannerService extends HttpService{
    createBanner = async(data) => {
        try{
            let response = await this.postRequest("/banner", data, {file: true, login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    listBanners = async(config) => {
        try{
            let response = await this.getRequest("/banner?perPage"+config.perPage+"&page="+config.page, {login: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getActiveBanners = async() => {
        try{
            let response = await this.getRequest("/banner/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    deleteBannerById = async(id) => {
        try{
            let response = await this.deleteRequest("/banner/"+id, {login: true})
            return response;
        }catch(err){
            throw err;
        }
    }

    getBannerById = async(id) => {
        try {
            let response = await this.getRequest("/banner/"+id, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

    updateBanner = async(data, id) => {
        try {
            let response = await this.putRequest("/banner/"+id, data, {login: true, file: true})
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const bannerSvc = new BannerService();
export default bannerSvc;