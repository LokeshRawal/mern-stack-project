import {FaBars} from "react-icons/fa";
import AppConstants from "../../../config/constants";
import { useNavigate, NavLink } from "react-router-dom";

const AdminTopNav = () => {
    const toggleSidebar = () => {
        // e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem(AppConstants.ACCESSTOKEN_KEY);
        localStorage.removeItem(AppConstants.AUTHTOKEN_KEY);
        navigate('/login');
    }
    return (<>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           
           <NavLink className="navbar-brand ps-3" to="/admin">
            Admin Panel
           </NavLink>
           
           <button onClick={toggleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
               <FaBars />
           </button>
           
           <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              
           </div>
           
           <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                   </a>
                   <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                       <li><a className="dropdown-item" href="#!">Profile Update</a></li>
                       <li><a className="dropdown-item" href="#!">Password Change</a></li>
                       <li><hr className="dropdown-divider" /></li>
                       <li><a className="dropdown-item" href="/" onClick={logout}>Logout</a></li>
                   </ul>
               </li>
           </ul>
       </nav>
    </>)
}

export default AdminTopNav;