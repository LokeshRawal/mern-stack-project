import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useCallback, useEffect, useState } from "react";
import bannerSvc from "../../admin/banner/banner.service";

const HomePageBanner = () => {

    let [banner, setBanners] = useState()

    const loadBanners = useCallback(async () => {
        try {
            let response = await bannerSvc.getActiveBanners();
            if (response.status) {
                setBanners(response.result);
            }
        } catch (err) {
            console.log(err);
        }
    }, [])
    useEffect(() => {
        loadBanners()
    }, [loadBanners])
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (<>
        <div className="banner-wrapper">
            
            <Slider {...settings}>
               
                {/* <div>
                    <img src={one} style={{ width: "100%", height: "500px" }} alt="" />
                </div>
                <div>
                    <img src={two} style={{ width: "100%", height: "500px" }} alt="" />
                </div>
                <div>
                    <img src={three} style={{ width: "100%", height: "500px" }} alt="" />
                </div>
                <div>
                    <img src={four} style={{ width: "100%", height: "500px" }} alt="" />
                </div>
                <div>
                    <img src={five} style={{ width: "100%", height: "500px" }} alt="" />
                </div>
                <div>
                    <img src={six} style={{ width: "100%", height: "500px" }} alt="" />
                </div> */}
                {
                    banner && banner.map((item, index) => (
                        <div key={index}>
                            <img src={process.env.REACT_APP_BASE_URL+"/images/banner"+item.image} style={{ width: "100%", height: "500px" }} alt="" />
                        </div>
                    ))
                }
            </Slider>
        </div>

    </>)
};

export default HomePageBanner;