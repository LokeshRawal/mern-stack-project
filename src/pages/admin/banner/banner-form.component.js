import { useFormik } from "formik";
import { Col, Form } from "react-bootstrap";
import * as Yup from "yup"
import { ActionButtons } from "../../../components/common/action-btns.component";

const AdminBannerForm = ({defaultValue, submitEvent}) => {
    let ValidationRule = Yup.object({
        title: Yup.string().required(),
        status: Yup.string().required().default("inactive"),
        link: Yup.string().url().nullable(),
        image: Yup.string().nullable()
    })
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
                console.log("BannerForm: ", error)
            }
        }
    })
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
                        placeholder="Enter Banner title..."
                    />
                    <span className="text-danger">{formik.errors.title}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Link(URL)</Form.Label>
                <Col sm="9">
                    <Form.Control
                        type="url"
                        name="link"
                        size="sm"
                        required={true}
                        onChange={formik.handleChange}
                        value={formik.values?.link}
                        placeholder="Enter Banner link..."
                    />
                    <span className="text-danger">{formik.errors.link}</span>
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
                                <img className="img img-fluid" alt="" src={process.env.REACT_APP_BASE_URL+'/images/banner/'+formik.values.image}/>
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

export default AdminBannerForm;