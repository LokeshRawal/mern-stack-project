import { useCallback, useEffect, useState } from "react";
import categorySvc from "../../admin/category/category.service";
import { Container, Row, Col, Card } from "react-bootstrap";
import noimage from "../../../assets/images/noimagefound.png"

const CategoryListSection = () => {
    let [category, setCategory] = useState()

    let loadAllFeatured = useCallback(async() => {
        try{
            let response = await categorySvc.getAllFeatured();
            setCategory(response.result)
        } catch(err) {
            console.log({err})
        }
    }, [])

    useEffect(() => {
        loadAllFeatured()
    }, [])
    return(<>
        <Container className="mt-5" fluid>
            <Row>
                <Col>
                    <h4 style={{textDecoration: "underline"}}>Category List</h4>
                </Col>
            </Row>
            <Row className="mt-3">
                {
                    category && category.map((item, index) => (
                        <Col sm={6} md={2} className="mb-3 ">
                            <Card>
                                <Card.Img variant="top" src={item.image ? process.env.REACT_BASE_URL+"/category"+item.image : noimage} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </>)
}

export default CategoryListSection;