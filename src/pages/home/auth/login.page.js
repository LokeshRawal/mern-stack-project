// import { useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { ActionButtons } from "../../../components/common/action-btns.component";
import "./auth.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import authSvc from "./auth.service";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import AppConstants from "../../../config/constants";
import { EmailInputField, PasswordInputfield } from "../../../components/common/form.component";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../../reducers/user.slicer";
const LoginPage = () => {
    let defaultValues = {
        email: "",
        password: ""
    }  

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // let [data, setData] = useState(defaultValues)
    // let [error, setError] = useState();
    // let [btnDisabled, setbtnDisabled] = useState(true);

    // const handleChange =(e) => {
    //     let {name, value} = e.target
    //     dataValidate(name, value);
    //     setData({
    //         ...data,
    //         [name]: value
    //     })
    // }

    // const dataValidate = (field, value) => {
    //     let msg = "";
    //     switch(field){
    //         case "email" : 
    //             msg = value ? (null) : "Email is required";
    //             break;
    //         case "password" :
    //             msg = value ? null : "Password is required";
    //             break;
    //     }

    //     let allErrors = {
    //         ...error,
    //         [field]: msg 
    //     }
    //     setError(allErrors);
    //     // console.log(allErrors)

    //     let invalidStates = Object.values(allErrors).filter((val) => val)
    //     setbtnDisabled(invalidStates.length > 0)

    // }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     Object.keys(data).map((item) => dataValidate(item, data[item]))
    //     console.log("Data",data)
    
    let loginValidation = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: loginValidation,
        onSubmit: async (credential) => {
            try{
                let response = await authSvc.loginUser(credential);
                if(response.status) {
                    let token = response.result.token;
                    let user = response.result.detail;
                    localStorage.setItem(AppConstants.ACCESSTOKEN_KEY, token);
                    // localStorage.setItem(AppConstants.AUTHTOKEN_KEY, JSON.stringify({
                    //     id: user._id,
                    //     name: user.name,
                    //     email: user.email,
                    //     image: user.image,
                    //     role: user.role,
                    //     status: user.status
                    // }));
                    dispatch(setLoggedInUser(user))
                    toast.success("Welcome to "+user.role+" Panel!!");
                    navigate("/"+user.role)

                } else {
                    toast.error(response.msg);
                }
            } catch(error) {
                toast.error(error.data.msg);
            }
            
        }
    })

    const loginCheck = useCallback(async() => {
        try{
            let response = await authSvc.getLoggedInUser();
            // console.log("Success: ", response)
            if(response){
                toast.info("You are already logged in!!");
                navigate("/"+response.result.role)
            } 
        } catch(error) {
            console.error("LoginCheck", error)
        }
    }, [navigate])

    useEffect(() => {
        //if a user is logged in, get user detail and redirected to his/her dashboard.
        loginCheck()
    }, [loginCheck])
    
    return (<>
        <Container className="mt-3">
            <Row>
                <Col>
                    <h4>Login Page</h4>
                </Col>

            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>

                        <EmailInputField 
                            label="Email"
                            required={false}
                            handleChange={formik.handleChange}
                            errMsg={formik.errors.email}
                        />

                        <PasswordInputfield 
                            label="Password"
                            required={false}
                            handleChange={formik.handleChange}
                            errMsg={formik.errors.password}
                        />
                        
                        <Form.Group className="row mb-3">
                            <Col sm={{offset: 3, span: 9}}>
                                <ActionButtons submitText="Login"/>
                            </Col>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>



    </>)

}
export default LoginPage;