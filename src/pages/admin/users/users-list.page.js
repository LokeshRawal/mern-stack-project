import userSvc from "./user.service";

import AdminBreadCrumb from "../component/breadcrumb.component";

import DataTable from 'react-data-table-component';
import { customStyles } from "../../../assets/styles/table.styles";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { BadgeFormatter, ImageFormatter } from "../../../components/common/formatter.components";
import TableButtonComponents from "../../../components/common/table-buttons.component";
import { toast } from "react-toastify";
const UserList = () => {
    const deleteAction = async(id) => {
        try{
            let response = await userSvc.deleteUserById(id);
            if(response.status){
                toast.success(response.msg);
                loadAllUsers({perPage: 10, page: 0});
            }else{
                toast.error(response.msg);
            }
        }catch(error){
            console.error({error})
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        
        {
            name: 'Image',
            selector: row => <ImageFormatter url={"/images/user/"+row.image}/>,
            sortable: true,     
        },
        {
            name: 'Status',
            selector: row => <BadgeFormatter value={row.status}/>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableButtonComponents 
                                     id={row._id} 
                                     deleteAction={deleteAction}
                                     urlPrefix={"/user"} 
                             />,
            sortable: true,
        },
    ];

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState({
        "totalCount": 0,
        "perPage": 10,
        "currentPage": 0
    })
    

    const loadAllUsers = useCallback(async(config)=>{
        try{
            let response = await userSvc.listUsers(config);
            if(response.status){
                setData(response.result);
                setPaginate(response.meta);
            }
        } catch(err){

        } finally{
            setLoading(false); 
        }
    },[])

    const handlePerPageChange = (newPerpage, page) => {
        page = page-1;
        setPaginate({
            ...paginate,
            perPage: newPerpage,
            page: page
        })
        loadAllUsers({perPage: newPerpage, page: page})
    }

    const handlePageChange = (page) => {
        page = page-1;
        setPaginate({
            ...paginate,
            page: page
        })
        loadAllUsers({perPage: paginate.perPage, page:page})
    }

    useEffect(() => {
        loadAllUsers({perPage: 10, page: 0})
    }, [loadAllUsers])

    
        
    return(<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">
                User List Page
                <NavLink to={'/admin/user/create'} className="btn btn-sm btn-success float-end">
                    <FaPlus /> Add User
                </NavLink>
            </h1>


            <AdminBreadCrumb path={[{ title: "User List", url: null }]} />



            <div className="card mb-4">
                <div className="card-body">
                    <DataTable
                        pagination
                        customStyles={customStyles}
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        paginationServer
                        // paginationTotalRows={paginate.totalCount}
                        paginationTotalRows={paginate ? paginate.totalCount : 0}
                        onChangeRowsPerPage={handlePerPageChange}
                        onChangePage={handlePageChange}
                    />
                </div>
            </div>
        </div>
    </>)
}


export default UserList;