import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminBrandForm from "./brand-form.component";
import brandSvc from "./brand.service";
import { useNavigate } from "react-router-dom";

const AdminBrandCreate = () => {
    let defaultValue = {
        title: "",
        status: "",
        image: null
        // link: ""
    }

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await brandSvc.createBrand(data);
            if(result.status){
                toast.success("Brand Created Successfully!!!");
                navigate("/admin/brand");
            } else {
                console.error("BrandCreate: ", result);
                toast.error("Sorry! Brand could not be created at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Brand Create Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/brand", title: "Brand List"}, {url: null, title: "Brand Create"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    <AdminBrandForm 
                        defaultValue = {defaultValue}
                        submitEvent = {submitEvent} />
                </div>
            </div>
        </div>
    </>)
}

export default AdminBrandCreate;