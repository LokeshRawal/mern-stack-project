import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminBannerForm from "./banner-form.component";
import bannerSvc from "./banner.service";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const AdminBannerUpdate = () => {
    const [defaultValue, setDefaultValue] = useState();
    let params = useParams();

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await bannerSvc.updateBanner(data, params.id);
            if(result.status){
                toast.success("Banner Updated Successfully!!!");
                navigate("/admin/banner");
            } else {
                console.error("BannerUpdate: ", result);
                toast.error("Sorry! Banner could not be Updated at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }

    const getBannerDetail = useCallback(async() => {
        try {
            let result = await bannerSvc.getBannerById(params.id);
            if(result) {
                setDefaultValue({
                    title: result.result.title,
                    status: result.result.status,
                    image: result.result.image,
                    link: result.result.link
                })
            }
        } catch(err) {
            console.error({err})
        }
    }, [params.id])

    useEffect(()=> {
        getBannerDetail()
    }, [getBannerDetail])
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Banner Update Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/banner", title: "Banner List"}, {url: null, title: "Banner Update"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    {
                        defaultValue && <AdminBannerForm 
                                defaultValue = {defaultValue}
                                submitEvent = {submitEvent} />
                    }
                </div>
            </div>
        </div>
    </>)
}

export default AdminBannerUpdate;