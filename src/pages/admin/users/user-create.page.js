import RegisterFom from "../../../components/auth/register-form.component";
import AdminBreadCrumb from "../component/breadcrumb.component";
const UserCreate = () => {
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
        status: null
    }
    return (<>

        <div className="container-fluid px-4">
            <h1 className="mt-4">User Register Page</h1>

            
            <AdminBreadCrumb path={[{ url: "/admin/user", title: "User List" }, { url: null, title: "User Register" }]} />

            <div className="card mb-4">
                <div className="card-body">
                   <RegisterFom
                        redirectLink="/admin/user" 
                        status={true}
                        defaultValues={defaultValues}
                   /> 
                </div>
            </div>
        </div>
    </>)
}

export default UserCreate;