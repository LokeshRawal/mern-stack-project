import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import * as Yup from "yup"
import { ActionButtons } from "../../../components/common/action-btns.component";
import { useCallback, useEffect, useState } from "react";
import categorySvc from "./category.service";

const AdminCategoryForm = ({defaultValue, submitEvent}) => {
    let [categoryList, setCategoryList] = useState();

    let ValidationRule = Yup.object({
        title: Yup.string().required(),
        status: Yup.string().required().default("inactive"),
        featured: Yup.boolean().default(false),
        parent: Yup.string().nullable(),
        image: Yup.string().nullable()
    })

    const loadCategories = useCallback(async() => {
        try{
            let response = await categorySvc.listCategories({perPage: 1000, page:0});
            setCategoryList(response.result)
        } catch(error) {
            console.error({error})
        }
    }, [])

    useEffect(()=> {
        loadCategories()
    }, [loadCategories])

    let formik = useFormik({
        initialValues: defaultValue,
        validationSchema: ValidationRule,
        onSubmit: async(values) => {
            try {
                // mapping
                const formData = new FormData();
                // if(values.image && (typeof values.image === 'object')){
                //     formData.append('image', values.image, values.image.filename);
                //     delete values.image;
                // }

                Object.keys(values).forEach((key) => {
                    if(key === 'image' && values[key] && typeof values[key] === 'object'){
                         formData.append('image', values.image, values.image.filename);
                    }
                    else{
                        formData.append(key, values[key]);
                    }
                })

                submitEvent(formData);
            } catch(error) {
                console.log("CategoryForm: ", error)
            }
        }
    })
    console.log(formik.errors)
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Title</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="text"
                        name="title"
                        size="sm"
                        required={true}
                        onChange={formik.handleChange}
                        value={formik.values?.title}
                        placeholder="Enter Category title..."
                    />
                    <span className="text-danger">{formik.errors.title}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Sub-Category of</Form.Label>
                <Col sm="9">
                <Form.Select 
                        name="parent" 
                        size="sm" 
                        onChange={formik.handleChange}
                        value={formik.values?.parent}>
                        <option>---Select Any One---</option>
                        {
                            categoryList && categoryList.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.title}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <span className="text-danger">{formik.errors.parent}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Featured</Form.Label>
                <Col sm="9">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Yes"
                        name="featured"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                featured: e.target.checked
                            })
                        }}
                    />
                    
                    
                    <span className="text-danger">{formik.errors.featured}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status</Form.Label>
                <Col sm="9">
                    <Form.Select 
                        name="status" 
                        required 
                        size="sm" 
                        onChange={formik.handleChange}
                        value={formik.values?.status}>
                        <option>---Select Any One---</option>
                        <option value="active">Active</option>
                        <option value="inactive">In-Active</option>
                    </Form.Select>
                    <span className="text-danger">{formik.errors.status}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image</Form.Label>
                <Col sm="6">
                    <Form.Control
                        type="file"
                        name="image"
                        size="sm"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                image: e.target.files[0]
                            })
                        }}
                    />
                    <span className="text-danger">{formik.errors.image}</span>
                </Col>
                <Col sm={"3"}>
                    {
                        typeof(formik.values.image) === 'string' ?
                            <>
                                <img className="img img-fluid" alt="" src={process.env.REACT_APP_BASE_URL+'/images/category/'+formik.values.image}/>
                            </>
                            :
                            (
                                formik.values.image ? <img className="img img-fluid" alt="" src={URL.createObjectURL(formik.values.image)} /> : <></>
                            )
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span:9}}>
                    <ActionButtons />
                </Col>
            </Form.Group>
        </Form>
    </>)
}

export default AdminCategoryForm;