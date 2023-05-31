import { useFormik } from "formik";
import { Col, Form, Row, Image } from "react-bootstrap";
import * as Yup from "yup"
import { ActionButtons } from "../../../components/common/action-btns.component";
import { useCallback, useEffect, useState } from "react";
import categorySvc from "../category/category.service";
import Select from "react-select";
import brandSvc from "../brand/brand.service";
import userSvc from "../users/user.service";
import { SelectList, TextInputField, NumberInputField, TextEditor } from "../../../components/common/form.component";

const AdminProductForm = ({defaultValue, submitEvent}) => {
    let [categoryList, setCategoryList] = useState();
    let [brandList, setBrandList] = useState();
    let [sellerList, setSellerList] = useState();
    let [defaultImages, setDefaultImages] = useState();

    let ValidationRule = Yup.object({
        title: Yup.string().required(),
        description: Yup.string(),
        categoryId: Yup.array().of(Yup.object()).nullable(),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).max(100).default(0),
        featured: Yup.boolean().default(false),
        brand: Yup.object().nullable(),
        sellerId: Yup.object().nullable(),
        status: Yup.object().required().default({value: "inactive", label: "Un-Publish"}),

    })

   

    const loadCategories = useCallback(async() => {
        try{
            let response = await categorySvc.listCategories({perPage: 1000, page:0});
            let options = response.result.map((item) => {
                return {
                    value: item._id,
                    label: item.title
                }
            })
            setCategoryList(options)
        } catch(error) {
            console.error({error})
        }
    }, [])
    const loadBrands = useCallback(async() => {
        try{
            let response = await brandSvc.listBrands({perPage: 1000, page: 0})

            let opts = [];
            if(response.result.length){
                opts = response.result.map((item) => {
                    return{
                        label: item.title,
                        value: item._id
                    }
                })
            }
            
            setBrandList(opts)
        } catch(error) {
            console.error({error})
        }
    }, [])
    const loadSellers = useCallback(async() => {
        try{
            let response = await userSvc.getUsersByType('seller', {perPage: 1000, page: 0})
            let opts = response.result.map((item)=> {
                return {
                    value: item._id,
                    label: item.name
                }
            })
            
            setSellerList(opts)
        } catch(error) {
            console.error({error})
        }
    }, [])

    useEffect(()=> {
        loadCategories()
        loadBrands()
        loadSellers()
    }, [loadCategories])

    let formik = useFormik({
        initialValues: defaultValue,
        validationSchema: ValidationRule,
        onSubmit: async(values) => {
            try {
                console.log({values})
                let categoryId = values.categoryId.map((item)=> item.value)
                values.categoryId = JSON.stringify(categoryId);

                values.brand = values.brand?.value;
                values.sellerId = values.sellerId?.value;
                values.status = values.status?.value;

                // mapping
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    if(key === 'images'){
                         let images = Object.values(values.images);
                         images.map((image) => {
                            formData.append('images', image, image.filename);
                         })
                         
                    }
                    else{
                        formData.append(key, values[key]);
                    }
                })

                submitEvent(formData);
            } catch(error) {
                console.log("ProductForm: ", error)
            }
        }
    })

    useEffect(() => {
        if(defaultValue.images) {
            setDefaultImages(defaultValue.images);
        }
    }, [defaultValue])
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <TextInputField 
                label={"Title"}
                name="title"
                required={true}
                changeEvent={formik.handleChange}
                defaultValue={formik.values.title}
                error={formik.errors.title}

            />

            <TextEditor 
                label={"Description"}
                name="description"
                defaultValue={formik.values.description}
                changeEvent={(data) => {
                    formik.setValues({
                        ...formik.values,
                        description: data
                    })
                }}
                error={formik.errors.description}
            />
            
            

            <SelectList 
                options={categoryList}
                name={"categoryId"}
                label={"Category"}
                multiple={true}
                selOpt={formik.values.categoryId}
                error={formik.errors.categoryId}
                changeEvent={(sel)=>{
                    formik.setValues({
                        ...formik.values,
                        categoryId: sel
                    })
                }}
            />


            

            <NumberInputField 
                label={"Price(Npr.)"}
                name="price"
                min={1}
                required={true}
                changeEvent={formik.handleChange}
                defaultValue={formik.values.price}
                error={formik.errors.price}

            />
            
{/* 
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Price(Npr.)</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="number"
                        name="price"
                        size="sm"
                        required={true}
                        min={1}
                        onChange={formik.handleChange}
                        value={formik.values?.price}
                        placeholder="Enter Product price..."
                    />
                    <span className="text-danger">{formik.errors.price}</span>
                </Col>
            </Form.Group> */}

            <NumberInputField 
                label={"Discount(%)"}
                name="discount"
                min={0}
                max={100}
                required={true}
                changeEvent={formik.handleChange}
                defaultValue={formik.values.discount}
                error={formik.errors.discount}

            />

            {/* <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Discount(%)</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="number"
                        name="discount"
                        size="sm"
                        min={0}
                        max={100}
                        onChange={formik.handleChange}
                        value={formik.values?.discount}
                        placeholder="Enter Product discount..."
                    />
                    <span className="text-danger">{formik.errors.discount}</span>
                </Col>
            </Form.Group> */}

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Featured</Form.Label>
                <Col sm="9">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label={formik.values.featured ? "Yes" : "No"}
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

            <SelectList 
                options={brandList}
                name={"brand"}
                label={"Brand"}
                selOpt={formik.values.brand}
                error={formik.errors.brand}
                changeEvent={(sel)=>{
                    formik.setValues({
                        ...formik.values,
                        brand: sel
                    })
                }}
            />
    
            <SelectList 
                options={sellerList}
                name={"sellerId"}
                label={"Seller"}
                selOpt={formik.values.sellerId}
                error={formik.errors.sellerId}
                changeEvent={(sel)=>{
                    formik.setValues({
                        ...formik.values,
                        sellerId: sel
                    })
                }}
            />

           

            <SelectList 
                options={[{label: "Publish", value: "active"}, {label: "Un-Publish", value: "inactive"}]}
                name={"status"}
                label={"Status"}
                selOpt={formik.values.status}
                error={formik.errors.status}
                changeEvent={(sel)=>{
                    formik.setValues({
                        ...formik.values,
                        status: sel
                    })
                }}
            />



            {/* <Form.Group className="row mb-3">
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
            </Form.Group> */}

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Images</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="file"
                        name="images"
                        size="sm"
                        multiple
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                images: e.target.files
                            })
                        }}
                    />
                    <span className="text-danger">{formik.errors.image}</span>
                </Col>
                
            </Form.Group>

            <Form.Group>
                <Row>
                    {
                        defaultImages && defaultImages.map((item, index) => (<>
                            <Col sm={3} md={1} key={index}>
                                <Image fluid src={process.env.REACT_APP_BASE_URL+'/images/product/'+item} alt={"Product-"+index}/>
                            </Col>
                        </>))
                    }    
                    {
                        formik.values.images && (Object.values(formik.values.images)).map((item, index) => (<>
                            <Col sm={3} md={1} key={index}>
                                <Image fluid src={URL.createObjectURL(item)} alt={"Product-"+index}/>
                            </Col>
                        </>))
                    }    
                </Row>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span:9}}>
                    <ActionButtons />
                </Col>
            </Form.Group>
        </Form>
    </>)
}

export default AdminProductForm;