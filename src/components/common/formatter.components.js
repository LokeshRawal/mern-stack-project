import { Badge } from "react-bootstrap"
import helpers from "../../config/helpers"

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export const ImageFormatter = ({url}) => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (<>
        <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                <a href={process.env.REACT_APP_BASE_URL+url}>
                    Preview Image
                </a>
                
            </LightGallery>
        
    </>)
}

export const BadgeFormatter = ({value}) => {
    return (<>
        <Badge bg={value === 'active' ? 'success' : 'danger'} size="sm">
            {helpers.ucfirst(value)}
        </Badge>

    </>)
}