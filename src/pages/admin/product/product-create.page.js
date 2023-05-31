import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminProductForm from "./product-form.component";
import productSvc from "./product.service";
import { useNavigate } from "react-router-dom";

const AdminProductCreate = () => {
    let defaultValue = {    
        title: null,
        description: null,
        categoryId: null,
        price: null,
        discount: 0,
        featured: false,
        brand: null,
        sellerId: null,
        status: null,
        images: null
    }

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await productSvc.createProduct(data);
            if(result.status){
                toast.success("Product Created Successfully!!!");
                navigate("/admin/product");
            } else {
                console.error("ProductCreate: ", result);
                toast.error("Sorry! Product could not be created at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Product Create Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/product", title: "Product List"}, {url: null, title: "Product Create"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    <AdminProductForm 
                        defaultValue = {defaultValue}
                        submitEvent = {submitEvent} />
                </div>
            </div>
        </div>
    </>)
}

export default AdminProductCreate;