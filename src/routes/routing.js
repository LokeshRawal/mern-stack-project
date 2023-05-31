import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePageLayout from "../pages/layout/home-page.layout";
import LoginPage from "../pages/home/auth/login.page";
import RegisterPage from "../pages/home/auth/register.page";
import BrandDetail from "../pages/home/brand/brand-detail.page";
import AdminLayout from "../pages/admin/admin.layout";
import DashboardPage from "../pages/admin/dashboard.page";
import HomePage from "../pages/home/home.page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./permissionRoutes";
import Admin from "../pages/admin";
import {  useDispatch } from "react-redux";
import store from "../store";
import { getLoggedInUser } from "../reducers/user.slicer";
import { useEffect } from "react";
import AppConstants from "../config/constants";
const Routing = () => {
    let dispatch = useDispatch();
    dispatch(getLoggedInUser());
       
    return(<>
        
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePageLayout />}>
                        <Route index element={<HomePage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="brand/:slug" element={<BrandDetail />}></Route>
                        {/* <Route path="/brand/:slug" element={<BrandDetail />}/> */} 
                    </Route>
                
                    
                    {/* only Admin access */}
                    <Route path="/admin" element={<PrivateRoute Component={<AdminLayout />} checkrole="admin"/>}>
                        <Route index element={<DashboardPage />}></Route>
                        <Route path="profile" element={<>Admin Profile</>}></Route>

                        <Route path="banner" element={<Admin.AdminBannerList />}></Route>
                        <Route path="banner/create" element={<Admin.AdminBannerCreate/>}></Route>
                        <Route path="banner/:id" element={<Admin.AdminBannerUpdate/>}></Route>

                        <Route path="brand" element={<Admin.AdminBrandList />}></Route>
                        <Route path="brand/create" element={<Admin.AdminBrandCreate/>}></Route>
                        <Route path="brand/:id" element={<Admin.AdminBrandUpdate/>}></Route>

                        <Route path="category" element={<Admin.AdminCategoryList />}></Route>
                        <Route path="category/create" element={<Admin.AdminCategoryCreate/>}></Route>
                        <Route path="category/:id" element={<Admin.AdminCategoryUpdate/>}></Route>

                        <Route path="user" element={<Admin.UserList />} />
                        <Route path="user/create" element={<Admin.UserCreate />} />

                        <Route path="product" element={<Admin.AdminProductList />}></Route>
                        <Route path="product/create" element={<Admin.AdminProductCreate/>}></Route>
                        <Route path="product/:id" element={<Admin.AdminProductUpdate/>}></Route>
                    </Route>

                    {/* only seller access */}
                    <Route path="/seller" element={<PrivateRoute Component={<AdminLayout />} checkrole="seller"/>}>
                        <Route index element={<>Seller Dashboard</>} />
                    </Route>

                    {/* only customer access */}
                    <Route path="/customer" element={<PrivateRoute Component={<AdminLayout />} checkrole="customer"/>}>
                        <Route index element={<>Customer Dashboard</>} />
                    </Route>

                    <Route path="*" element={<>404 Page Not Found</>}/>

                </Routes>
            </BrowserRouter>
        
    </>)
}

export default Routing;