import { Navbar, Container, Nav, Image, Form, Button  } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.jpeg"
import authSvc from "../auth/auth.service";
import helpers from "../../../config/helpers";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomeMenu = () => {
   
    const isLoggedIn = helpers.getLoggedInStatus();
    let [user, setUser] = useState();



    useSelector((rootStore) => {
        console.log({rootStore})
    })

    const getUser = useCallback(async() => {
        let userDetail = await authSvc.getLoggedInUser();
        if(userDetail) {
            setUser(userDetail.result);
        }
    }, [])

    useEffect( () => {
        if(isLoggedIn){
            getUser();
        }
    }, [getUser, isLoggedIn])

    return (<>
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink href="/" >
                    <Image src={logo} style={{ height: "50px" }} className="navbar-brand bg-success circle" />
                </NavLink>
                <Nav className="me-auto">
                    <NavLink className={"nav-link"} to="/">Home</NavLink>
                    {/* <Nav.Link href="/categories">Categories</Nav.Link> */}
                    <NavLink className={"nav-link"} to="/categories">Categories</NavLink>
                    <NavLink className={"nav-link"} to="/brand">Brand List</NavLink>
                    <NavLink className={"nav-link"} to="/products">Products</NavLink>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            size="sm"
                        />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Nav>

                <Nav>

                    <Nav.Link href="#cart">
                        <FaShoppingCart size={25} /> (0)
                    </Nav.Link>
                    {
                        user ? <>
                        <NavLink to={"/"+user.role} className={"nav-link"}>{user.name}</NavLink>
                        </> : <>
                        <NavLink to="/login" className={"nav-link"}>Login</NavLink>
                        <NavLink to="/register" className={"nav-link"}>Register</NavLink>
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>
    
    </>)
}

export default HomeMenu;