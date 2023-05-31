import { toast } from "react-toastify";
import AdminBreadCrumb from "../component/breadcrumb.component";
import AdminProductForm from "./product-form.component";
import productSvc from "./product.service";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const AdminProductUpdate = () => {
    const [defaultValue, setDefaultValue] = useState();
    let params = useParams();

    let navigate = useNavigate()

    const submitEvent = async(data) => {
        try{
            let result = await productSvc.updateProduct(data, params.id);
            if(result.status){
                toast.success("Product Updated Successfully!!!");
                navigate("/admin/product");
            } else {
                console.error("ProductUpdate: ", result);
                toast.error("Sorry! Product could not be Updated at this moment.")
            }
        } catch(err) {
            console.log(err);
        }
    }

    const getProductDetail = useCallback(async() => {
        try {
            let result = await productSvc.getProductById(params.id);
            if(result) {
                let detail = result.result;
                let catSel = detail.categoryId?.map((item) => {
                    return {
                        label: item.title,
                        value: item._id
                    }
                })
                setDefaultValue({
                    title: detail.title,
                    description: detail.description,
                    categoryId: catSel,
                    price: detail.price,
                    discount: detail.discount,
                    featured: detail.featured,
                    brand: detail.brand ? {value: detail.brand._id, label: detail.brand.title} : null,
                    sellerId: detail.sellerId ? {value: detail.sellerId._id, label: detail.sellerId.name} : null,
                    status: {value: detail.status, label: (detail.status === 'active' ? "Publish" : "Un-Publish")},
                    images: detail.images
                })
            }
        } catch(err) {
            console.error({err})
        }
    }, [params.id])

    useEffect(()=> {
        getProductDetail()
    }, [getProductDetail])
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">Product Update Page</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb path={[{url:"/admin/product", title: "Product List"}, {url: null, title: "Product Update"}]} /> 

            <div className="card mb-4">
                <div className="card-body">
                    {
                        defaultValue && <AdminProductForm 
                                defaultValue = {defaultValue}
                                submitEvent = {submitEvent} />
                    }
                </div>
            </div>
        </div>
    </>)
}

export default AdminProductUpdate;