import {  Container, Col, Row} from "react-bootstrap";

const FooterComponent = () => {
    return (<>
        <footer className="bg-dark ">
            <Container style={{height: "25vh"}}>
                <Row className="mx-3 py-3">
                    <Col sm={12} md={4} className="text-white">
                        First Column
                    </Col>
                    <Col sm={12} md={4} className="text-white">
                        Second Column
                    </Col>
                    <Col sm={12} md={4} className="text-white">
                        Third Column
                    </Col>
                </Row>
            </Container>
        </footer>
    </>)

}
export default FooterComponent;