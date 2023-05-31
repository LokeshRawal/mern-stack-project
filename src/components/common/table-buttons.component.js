import { FaPen, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'

const TableButtonComponents = ({id, deleteAction, urlPrefix}) => {

    const showAlert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
               deleteAction(id);
            }
          })
    }

    return (<>

        <NavLink to={"/admin"+urlPrefix+"/"+id} className={"btn btn-sm btn-success circle me-1"}>
            <FaPen />
        </NavLink>

        <NavLink onClick={showAlert} to="/" className={"btn btn-sm btn-danger circle me-1"}>
            <FaTrash />
        </NavLink>

    </>)
}

export default TableButtonComponents;