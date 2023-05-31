import { useParams} from "react-router-dom";

const BrandDetail = () => {
    let params = useParams();

    
    return(<>
        Brand detail page of {params.slug}
    </>)
}
export default BrandDetail;