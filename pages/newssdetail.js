import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "./css/shoppings-lists.module.scss";
import Link from "next/link";

import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import Navbar from '../components/common/Navbar/Navbar'
//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingProductSlider from "../components/common/shopping/product-slider";
import ShoppingCollections from "../components/common/shopping/collections";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRouter } from 'next/router';

// import { stat } from "fs";


var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


export default function newssdetail(pageProp) {

    const product = pageProp.page_content.product;
    const customFields = product?.customFields;

    const [count, setCount] = useState(1);

    const [start, setStart] = useState(1);

    const [popup, setPopup] = useState(false);

    const func1 = () => {
        setStart(1);
        document.getElementById("fast").style.color = "#EC691F"
        document.getElementById("fast").style.borderBottom = "4px solid #EC691F"
        document.getElementById("fast").style.fontWeight = "600"

        document.getElementById("second").style.color = "#444444"
        document.getElementById("second").style.borderBottom = "none"
        document.getElementById("second").style.fontWeight = "500"

        document.getElementById("third").style.color = "#444444"
        document.getElementById("third").style.borderBottom = "none"
        document.getElementById("third").style.fontWeight = "500"
    }

    const func2 = () => {
        setStart(2);
        document.getElementById("fast").style.color = "#444444"
        document.getElementById("fast").style.borderBottom = "none"
        document.getElementById("fast").style.fontWeight = "500"

        document.getElementById("second").style.color = "#EC691F"
        document.getElementById("second").style.borderBottom = "4px solid #EC691F"
        document.getElementById("second").style.fontWeight = "600"

        document.getElementById("third").style.color = "#444444"
        document.getElementById("third").style.borderBottom = "none"
        document.getElementById("third").style.fontWeight = "500"
    }

    const func3 = () => {
        setStart(3);

        document.getElementById("fast").style.color = "#444444"
        document.getElementById("fast").style.borderBottom = "none"
        document.getElementById("fast").style.fontWeight = "500"

        document.getElementById("second").style.color = "#444444"
        document.getElementById("second").style.borderBottom = "none"
        document.getElementById("second").style.fontWeight = "500"

        document.getElementById("third").style.color = "#EC691F"
        document.getElementById("third").style.borderBottom = "4px solid #EC691F"
        document.getElementById("third").style.fontWeight = "600"
    }

    //   const [section1, SetSection1] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{
    //         if(ls.node.name == "Section - 1"){
    //           const reqFetchProduct = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct = await reqFetchProduct.json();
    //           SetSection1(resultProduct);
    //         }
    //       });
    //     }
    //   });
    //   const [section2, SetSection2] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{

    //         if(ls.node.name == "Section - 2"){ 
    //           const reqFetchProduct_2 = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct_2 = await reqFetchProduct_2.json();
    //           SetSection2(resultProduct_2);
    //         }

    //       });
    //     }
    //   });
    //   const [section3, SetSection3] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{

    //         if(ls.node.name == "Section - 3"){ 
    //           const reqFetchProduct_3 = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct_3 = await reqFetchProduct_3.json();
    //           SetSection3(resultProduct_3); 
    //         }

    //       });
    //     }
    //   });
    //   const [section4, SetSection4] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{

    //         if(ls.node.name == "Section - 4"){ 
    //           const reqFetchProduct_4 = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct_4 = await reqFetchProduct_4.json();
    //           SetSection4(resultProduct_4); 
    //         }

    //       });
    //     }
    //   });
    //   const [section5, SetSection5] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{

    //         if(ls.node.name == "Section - 5"){ 
    //           const reqFetchProduct_5 = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct_5 = await reqFetchProduct_5.json();
    //           SetSection5(resultProduct_5); 
    //         }

    //       });
    //     }
    //   });
    //   const [section6, SetSection6] = useState(()=>{
    //     if(customFields?.edges?.length > 0) {
    //       customFields?.edges?.map(async (ls)=>{

    //         if(ls.node.name == "Section - 6"){ 
    //           const reqFetchProduct_6 = await fetch(process.env.next.api_url+"collections/category", {method:"POST", headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }, body: JSON.stringify({"id": ls.node.value }) });
    //           const resultProduct_6 = await reqFetchProduct_6.json();
    //           SetSection6(resultProduct_6); 
    //         }

    //       });
    //     }
    //   });
    const swiperRef = useRef(null);

    const goToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    const router = useRouter();
    const { id } = router.query;

    console.log(id);

    const [aboutnew, setaboutnew] = useState({});

    const [alnews, setalnews] = useState([]);


    const fetchnewsbyycat = async (name) => {
        try {

            const resp = await fetch(`https://admin.instacertify.com/api/get-news-details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                console.log("formare ", formateddata);
                setaboutnew(formateddata?.news);

            }


        } catch (error) {

            console.error("There was an error fetching the categories:", error);
        }
    }

    const fetchallnews = async () => {

        try {

            const resp = await fetch("https://admin.instacertify.com/api/get-news", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                setalnews(formateddata?.news);

            }


        } catch (error) {

            console.error("There was an error fetching the categories:", error);
        }
    }
    useEffect(() => {

        if (id) {
            // fetchProductDetails();
            fetchnewsbyycat();
        }
        else {
            console.log("error");
        }

    }, [id])

    useEffect(() => {
        fetchallnews();
    }, [])


    return (

        <div className="page_shopping_list sop">
            <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

            <div className="aboutwrap">

                <div className="aboutcont">

                    {/* <img src={"https://res.cloudinary.com/dgif730br/image/upload/v1729498113/WhatsApp_Image_2024-10-21_at_1.35.14_PM.jpg"} className="aboutbanner" alt="" /> */}

                    <div className="aboutcontent3s">
                        <span>{aboutnew?.title}</span>
                    </div>


                </div>

            </div>

            <div className='blgdeta2wrap'>

                <div className="blode2cont">

                    <div className="blode2leftcon">

                        <div>
                            <img src={aboutnew?.image} alt="" className="blogdtaimgmain" />
                            <div className="blogbantitle">  {aboutnew?.title}  </div>
                        </div>

                        <div className="blogtags">
                            {/* <p><span>By</span> Usha Fasteners</p>
                            <p><span>In</span> Fasteners</p>
                            <p><span>On</span>{abou}</p> */}
                        </div>


                        <div className="singblogw">
                            <div dangerouslySetInnerHTML={{ __html: aboutnew?.description }} />
                        </div>



                    </div>

                    <div className="blode2rightc">

                        <h3>Recent Blogs</h3>

                        {
                            alnews?.map((val, index) => {
                                return <div key={index} className="singblosdarslidd">

                                    <img className="yu" src={`https://admin.instacertify.com/backend/admin/images/news_management/news/${val?.images[0]}`} alt="" />
                                   <a style={{textDecoration:"none"}} href={`/newssdetail?id=${val?.slug}`}><h4 >{val?.title}</h4></a>

                                    <p className="dateobje"><img src="./images/renim.svg" alt="" /> <span>{new Date(aboutnew?.created_at).toLocaleDateString()}</span></p>

                                </div>
                            })
                        }
                    </div>
                </div>

            </div>



        </div>

    );
}

export async function getServerSideProps(context) {
    try {

        const globalSettings = await GlobalHeaderFooter();
        return {
            props: {
                page_content: false,
                navbar: globalSettings?.header,
                footer: globalSettings?.footer
            },
        };

    } catch (error) {

        return {
            props: {
                page_content: false,
                navbar: false,
                footer: false
            },
            notFound: true
        };

    }
}
