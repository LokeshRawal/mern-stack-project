import { Col, Container, Form, Row, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import noimage from "../../../assets/images/noimagefound.png";
import { ActionButtons } from "../../../components/common/action-btns.component";

// import axiosInstance from "../../../services/axios.service";
import { toast } from "react-toastify";
import authSvc from "./auth.service";
import { useNavigate } from "react-router-dom";
import { EmailInputField, PasswordInputfield } from "../../../components/common/form.component";
import RegisterFom from "../../../components/auth/register-form.component";
const RegisterPage = () => {

    let defaultValues = {
        name: null,
        email: null,
        password: null,
        role: null,
        address: {
            temp: {
                houseNo: null,
                city: null,
                streetName: null,
                lati: null,
                long: null
            },
            perm: {
                houseNo: null,
                city: null,
                streetName: null,
                lati: null,
                long: null
            }
        },
        phone: null,
        image: null,
        status: "inactive"
    }

    return (<>
        <Container className="mt-3">
            <Row>
                <Col>
                    <h4>Register Page</h4>
                </Col>

            </Row>
            <hr />
            <Row>
                <Col>
                    <RegisterFom 
                        redirectLink="/login"
                        defaultValues={defaultValues}
                    />
                </Col>
            </Row>
        </Container>



    </>)
}
export default RegisterPage;