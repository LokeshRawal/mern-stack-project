import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminCategoryForm from "./category-form.component";
import categorySvc from "./category.service";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const AdminCategoryUpdate = () => {
    const [defaultValue, setDefaultValue] = useState();
    let params = useParams();

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await categorySvc.updateCategory(data, params.id);
            if(result.status){
                toast.success("Category Updated Successfully!!!");
                navigate("/admin/category");
            } else {
                console.error("CategoryUpdate: ", result);
                toast.error("Sorry! Category could not be Updated at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }

    const getCategoryDetail = useCallback(async() => {
        try {
            let result = await categorySvc.getCategoryById(params.id);
            if(result) {
                setDefaultValue({
                    title: result.result.title,
                    status: result.result.status,
                    parent: result.result.parent?._id,
                    featured: result.result.featured,
                    image: result.result.image,
                    // link: result.result.link
                })
            }
        } catch(err) {
            console.error({err})
        }
    }, [params.id])

    useEffect(()=> {
        getCategoryDetail()
    }, [getCategoryDetail])
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Category Update Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/category", title: "Category List"}, {url: null, title: "Category Update"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    {
                        defaultValue && <AdminCategoryForm 
                                defaultValue = {defaultValue}
                                submitEvent = {submitEvent} />
                    }
                </div>
            </div>
        </div>
    </>)
}

export default AdminCategoryUpdate;