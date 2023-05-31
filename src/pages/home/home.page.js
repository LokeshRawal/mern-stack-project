import { Container, Row, Col, Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import one from "../../assets/images/banner/one.jpg"
// import two from "../../assets/images/banner/two.jpg"
// import three from "../../assets/images/banner/three.jpg"
// import four from "../../assets/images/banner/four.jpg"
// import five from "../../assets/images/banner/five.jpg"
// import six from "../../assets/images/banner/six.jpg"

import apple from "../../assets/images/brand/apple.jpg"
import google from "../../assets/images/brand/google.png"
import instagram from "../../assets/images/brand/instagram.png"
import lg from "../../assets/images/brand/lg.png"
import samsung from "../../assets/images/brand/samsung.png"

import SingleGridComponent from "../../components/product/single-grid.component"
import HomePageBanner from "./components/home-banner.component"

import CategoryListSection from "./components/category-list.component"



// import "bootstrap";  // js import


const HomePage = () => {
    
    return (<>

        <HomePageBanner />

        <CategoryListSection />
        
        <Container className="my-5 bg-white" fluid>
            <Row className="py-2">
                <Col>
                    <h4>Brand</h4>
                </Col>
            </Row>
            <Row className="my-2">
                <Col sm={12} md={6} lg={2}>
                    <Card>
                        <NavLink to="/brand/apple">
                             <Card.Img variant="top" src={apple} />
                        </NavLink>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={2}>
                    <Card>
                        <NavLink to="/brand/google">
                            <Card.Img variant="top" src={google} />
                        </NavLink>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={2}>
                    <Card>
                        <NavLink to="/brand/instagram">
                            <Card.Img variant="top" src={instagram} />
                        </NavLink>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={2}>
                    <Card>
                        <NavLink to="/brand/lg">
                            <Card.Img variant="top" src={lg} />
                        </NavLink>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={2}>
                    <Card>
                        <NavLink to="/brand/samsung">
                             <Card.Img variant="top" src={samsung} />
                        </NavLink>
                    </Card>
                </Col>

            </Row>
        </Container>
        <Container fluid>
            <Row >
                <Col sm={12} md={6} lg={3} >
                    <h4>Latest Products</h4>
                </Col>
            </Row>
            <Row>
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
                <SingleGridComponent />
               
            </Row>
        </Container>
    </>)


}
export default HomePage;