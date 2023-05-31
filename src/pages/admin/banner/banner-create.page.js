import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminBannerForm from "./banner-form.component";
import bannerSvc from "./banner.service";
import { useNavigate } from "react-router-dom";

const AdminBannerCreate = () => {
    let defaultValue = {
        title: "",
        status: "",
        image: null,
        link: ""
    }

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await bannerSvc.createBanner(data);
            if(result.status){
                toast.success("Banner Created Successfully!!!");
                navigate("/admin/banner");
            } else {
                console.error("BannerCreate: ", result);
                toast.error("Sorry! Banner could not be created at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Banner Create Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/banner", title: "Banner List"}, {url: null, title: "Banner Create"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    <AdminBannerForm 
                        defaultValue = {defaultValue}
                        submitEvent = {submitEvent} />
                </div>
            </div>
        </div>
    </>)
}

export default AdminBannerCreate;