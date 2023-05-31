import { Col, Form, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import noimage from "../../assets/images/noimagefound.png";
import { ActionButtons } from "../common/action-btns.component";

// import axiosInstance from "../../../services/axios.service";
import { toast } from "react-toastify";
import { EmailInputField, PasswordInputfield } from "../common/form.component";
import { useNavigate } from "react-router-dom";
import authSvc from "../../pages/home/auth/auth.service";
const RegisterFom = ({ redirectLink = "/login", status = false, defaultValues }) => {
   

    let registerSchema = Yup.object({
        name: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        role: Yup.string().default('customer').required(),
        address: Yup.object({
            temp: Yup.object({
                houseNo: Yup.string().nullable(),
                city: Yup.string().required("city field is required"),
                streetName: Yup.string().nullable(),
                lati: Yup.number().nullable(),
                long: Yup.number().nullable(),
            }),
            perm: Yup.object({
                houseNo: Yup.string().nullable(),
                city: Yup.string().required("city field is required"),
                streetName: Yup.string().nullable(),
                lati: Yup.number().nullable(),
                long: Yup.number().nullable(),
            }),

        }),
        phone: Yup.string().nullable(),
        status: Yup.string().default('inactive'),
        image: Yup.string().nullable()
    })

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: registerSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let finalSubmisssion = {
                    ...values
                }
                finalSubmisssion.address = JSON.stringify(values.address);
                let response = await authSvc.registerProcess(finalSubmisssion);

                toast.success(response.msg);
                resetForm(defaultValues);
                navigate(redirectLink)

            } catch (error) {
                //notification
                toast.error(error.data.msg);
            }
        }

    });

    return (<>

        <Form onSubmit={formik.handleSubmit}>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Full Name  </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Enter your Name"
                        name="name"
                        onChange={formik.handleChange}
                    />
                    <span className="text-danger">{formik.errors.name}</span>
                </Col>
            </Form.Group>
            <EmailInputField
                label="Email"
                required={false}
                handleChange={formik.handleChange}
                errMsg={formik.errors.email}
            />
            {/* <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Password  </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="password"
                        size="sm"
                        placeholder="Enter your Password"
                        name="password"
                        onChange={formik.handleChange}

                    />
                    <span className="text-danger">{formik.errors.password}</span>
                </Col>
            </Form.Group> */}
            <PasswordInputfield
                label="Password"
                required={false}
                handleChange={formik.handleChange}
                errMsg={formik.errors.password}
            />

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Role  </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" name="role" required onChange={formik.handleChange}>
                        <option>--Select Any One--</option>
                        <option value={"Seller"}>Seller</option>
                        <option value={"Customer"}>Customer</option>
                    </Form.Select>
                    <span className="text-danger">{formik.errors.role}</span>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Billing Address  </Form.Label>
                <Col>
                    <Form.Control
                        type="number"
                        name="temp.houseNo"
                        size="sm"
                        placeholder="House No."
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...(formik.values.address || {}),
                                    temp: {
                                        ...(formik.values.address?.temp || {}),
                                        houseNo: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        name="temp.city"
                        size="sm"
                        placeholder="City Name"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...formik.values.address,
                                    temp: {
                                        ...formik.values.address,
                                        city: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                    <span className="text-danger">{formik.errors?.address?.temp?.city}</span>
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        name="temp.streetName"
                        size="sm"
                        placeholder="Street Name"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...formik.values.address,
                                    temp: {
                                        ...formik.values.address.temp,
                                        streetName: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                </Col>

            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Shipping Address  </Form.Label>
                <Col>
                    <Form.Control
                        type="number"
                        name="perm.houseNo"
                        size="sm"
                        placeholder="House No."
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...formik.values.address,
                                    perm: {
                                        ...formik.values.address.perm,
                                        houseNo: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        name="perm.city"
                        size="sm"
                        placeholder="City Name"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...formik.values.address,
                                    perm: {
                                        ...formik.values.address.perm,
                                        city: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                    <span className="text-danger">{formik.errors?.address?.perm?.city}</span>

                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        name="perm.streetName"
                        size="sm"
                        placeholder="Street Name"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                address: {
                                    ...formik.values.address,
                                    perm: {
                                        ...formik.values.address.perm,
                                        streetName: e.target.value
                                    }
                                }
                            })
                        }}
                    />
                </Col>

            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Phone Number  </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Enter your Phone"
                        name="phone"
                        onChange={formik.handleChange}
                    />
                    <span className="text-danger">{formik.errors.phone}</span>
                </Col>
            </Form.Group>

            {
                status ? <>
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
                </>
                :
                <></>
           }

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3"> Image  </Form.Label>
                <Col sm={6}>
                    <Form.Control
                        type="file"
                        size="sm"
                        name="image"
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                image: e.target.files[0]
                            })
                        }}
                    />
                    <span className="text-danger">{formik.errors.image}</span>
                </Col>
                <Col sm={3}>
                    {
                        formik.values.image ? <Image src={URL.createObjectURL(formik.values.image)} alt="" fluid /> : <Image src={noimage} fluid />
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                    <ActionButtons cancelText="Reset" submitText="Register" />
                </Col>
            </Form.Group>

        </Form>

    </>)

}

export default RegisterFom;