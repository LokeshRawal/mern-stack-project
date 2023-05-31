import { Card, Col, Badge, Form, Button, Row } from "react-bootstrap"
import apple from "../../assets/images/brand/apple.jpg"

const SingleGridComponent = () => {
    return(<>
        <Col sm={12} m={6} lg={3}>
                    <Card >
                        <Card.Img variant="top" src={apple} className="img-fluid" />
                        <Card.Body>
                            <Card.Title className="text-center">Apple</Card.Title>
                            <Card.Text>
                                <p>
                                    <span className="me-3">NPR. 150000</span>
                                    <del className="text-danger">NPR. 200000</del>
                                </p>
                                <p>
                                    <Badge bg="warning">
                                        Category
                                    </Badge>
                                </p>
                            </Card.Text>
                            <Row>
                                <Col sm={12} md={6}>
                                    <Form.Control size="sm" type="number" defaultValue={1} />
                                </Col>
                                <Col sm={12} md={6}>
                                    <Button variant="success" size="sm">Add To Cart</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
    </>)
}

export default SingleGridComponent;