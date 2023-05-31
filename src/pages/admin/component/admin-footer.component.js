const AdminFooter = () => {
    let date = new Date();
    let year = date.getFullYear();
    return (<>
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; 2022 - {year}</div>

                </div>
            </div>
        </footer>
    </>)
}

export default AdminFooter;