import { Col, Row, Card } from "react-bootstrap";
import AdminBreadCrumb from "./component/breadcrumb.component";

const DashboardPage = () => {
    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Dashborard</h1>

            {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Static Navigation</li>
            </ol> */}
            <AdminBreadCrumb /> 

            <Row>
                <Col sm={12} md={3}>
                    <Card
                        bg={"warning"}
                        text={'light'}
                        // style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Total Sales</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                NPR. 0
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <Card
                        bg={"primary"}
                        text={'light'}
                        // style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Total Customers</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                0
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <Card
                        bg={"danger"}
                        text={'light'}
                        // style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Total Products</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                0
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3}>
                    <Card
                        bg={"success"}
                        text={'light'}
                        // style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Orders(Current)</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                0
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
               
            </Row>

            <div className="card mb-4">
                <div className="card-body">
                    <p className="mb-0">
                        This page is an example of using static navigation. By removing the
                        <code>.sb-nav-fixed</code>
                        className from the
                        <code>body</code>
                        , the top navigation and side navigation will become static on scroll. Scroll down this page to see an example.
                    </p>
                </div>
            </div>
        </div>

    </>)
}
export default DashboardPage;