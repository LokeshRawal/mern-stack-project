import { Outlet, } from "react-router-dom";
import "../../assets/css/admin.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css"
import AdminTopNav from "./component/admin-top-nav.component";
import AdminSidebar from "./component/admin-sidebar.component";
import AdminFooter from "./component/admin-footer.component";

const AdminLayout = () => {
    
    return (<>
        <AdminTopNav />
        <div id="layoutSidenav">
            <AdminSidebar />
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                <AdminFooter />
            </div>
        </div>
    </>)

}
export default AdminLayout;