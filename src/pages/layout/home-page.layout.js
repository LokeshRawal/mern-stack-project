import "bootstrap/dist/css/bootstrap.min.css"   // css import
import { Outlet } from "react-router-dom"
import FooterComponent from "../home/components/footer.component"

import HomeMenu from "../home/components/menu.component"

const HomePageLayout = (props) => {
    
    return (<>
        <HomeMenu />
        
        <Outlet />
        

        <FooterComponent />
    </>)
}

export default HomePageLayout