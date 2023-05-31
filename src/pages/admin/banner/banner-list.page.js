import AdminBreadCrumb from "../component/breadcrumb.component";

import DataTable from 'react-data-table-component';
import { customStyles } from "../../../assets/styles/table.styles";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import bannerSvc from "./banner.service";
import { BadgeFormatter, ImageFormatter } from "../../../components/common/formatter.components";
import TableButtonComponents from "../../../components/common/table-buttons.component";
import { toast } from "react-toastify";

const AdminBannerList = () => {

    const deleteAction = async(id) => {
        try{
            let response = await bannerSvc.deleteBannerById(id);
            if(response.status){
                toast.success(response.msg);
                loadAllBanners({perPage: 10, page: 0});
            }else{
                toast.error(response.msg);
            }
        }catch(error){
            console.error({error})
        }
    }

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => <ImageFormatter url={"/images/banner/"+row.image}/>,
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
                                     urlPrefix={"/banner"} 
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
    

    const loadAllBanners = useCallback(async(config)=>{
        try{
            let response = await bannerSvc.listBanners(config);
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
        loadAllBanners({perPage: newPerpage, page: page})
    }

    const handlePageChange = (page) => {
        page = page-1;
        setPaginate({
            ...paginate,
            page: page
        })
        loadAllBanners({perPage: paginate.perPage, page:page})
    }

    useEffect(() => {
        loadAllBanners({perPage: 10, page: 0})
    }, [loadAllBanners])

    
        
    return(<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">
                Banner List Page
                <NavLink to={'/admin/banner/create'} className="btn btn-sm btn-success float-end">
                    <FaPlus /> Add Banner
                </NavLink>
            </h1>


            <AdminBreadCrumb path={[{ title: "Banner List", url: null }]} />



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

export default AdminBannerList;