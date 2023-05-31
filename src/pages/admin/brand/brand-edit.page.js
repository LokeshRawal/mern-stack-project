import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminBrandForm from "./brand-form.component";
import brandSvc from "./brand.service";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const AdminBrandUpdate = () => {
    const [defaultValue, setDefaultValue] = useState();
    let params = useParams();

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await brandSvc.updateBrand(data, params.id);
            if(result.status){
                toast.success("Brand Updated Successfully!!!");
                navigate("/admin/brand");
            } else {
                console.error("BrandUpdate: ", result);
                toast.error("Sorry! Brand could not be Updated at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }

    const getBrandDetail = useCallback(async() => {
        try {
            let result = await brandSvc.getBrandById(params.id);
            if(result) {
                setDefaultValue({
                    title: result.result.title,
                    status: result.result.status,
                    image: result.result.image
                    // link: result.result.link
                })
            }
        } catch(err) {
            console.error({err})
        }
    }, [params.id])

    useEffect(()=> {
        getBrandDetail()
    }, [getBrandDetail])
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Brand Update Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/brand", title: "Brand List"}, {url: null, title: "Brand Update"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    {
                        defaultValue && <AdminBrandForm 
                                defaultValue = {defaultValue}
                                submitEvent = {submitEvent} />
                    }
                </div>
            </div>
        </div>
    </>)
}

export default AdminBrandUpdate;