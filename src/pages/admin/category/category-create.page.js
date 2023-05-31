import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminCategoryForm from "./category-form.component";
import categorySvc from "./category.service";
import { useNavigate } from "react-router-dom";

const AdminCategoryCreate = () => {
    let defaultValue = {    
        title: "",
        status: "",
        image: null
        // link: ""
    }

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await categorySvc.createCategory(data);
            if(result.status){
                toast.success("Category Created Successfully!!!");
                navigate("/admin/category");
            } else {
                console.error("CategoryCreate: ", result);
                toast.error("Sorry! Category could not be created at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Category Create Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/category", title: "Category List"}, {url: null, title: "Category Create"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    <AdminCategoryForm 
                        defaultValue = {defaultValue}
                        submitEvent = {submitEvent} />
                </div>
            </div>
        </div>
    </>)
}

export default AdminCategoryCreate;