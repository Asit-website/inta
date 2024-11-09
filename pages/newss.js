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
import { MdKeyboardArrowDown } from "react-icons/md";

import ShoppingCollections from "../components/common/shopping/collections";
import Head from "next/head";
import HeadSEO1 from "../components/common/Head/head1";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


export default function newss(pageProp) {

    const product = pageProp.page_content.product;
    const customFields = product?.customFields;

    const fetchProduct1 = async() =>{
       console.log("hi");
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


   

  

    const [allNewsCat , setAllNewsCat] =useState([]);
    const [alnews , setalnews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(6);
    

    const fetchcats = async () => {
        try {

            const resp = await fetch("https://admin.instacertify.com/api/get-news-category", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                setAllNewsCat(formateddata?.categories)

            }


        } catch (error) {

            console.error("There was an error fetching the categories:", error);
        }
    };

    const fetchAllNews = async (page = 1) => {
        try {
            const resp = await fetch(`https://admin.instacertify.com/api/get-news?page=${page}&limit=${itemsPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (resp.status === 200) {
                const formateddata = await resp.json();
                setalnews(formateddata?.news);
                setTotalPages(Math.ceil(formateddata?.news?.length / itemsPerPage)); // Calculate total pages
            }
        } catch (error) {
            console.error("There was an error fetching the news:", error);
        }
    };
    
    const fetchNewsByCat = async (name, page = 1) => {
        try {
            const resp = await fetch(`https://admin.instacertify.com/api/get-news-by-category/${name}?page=${page}&limit=${itemsPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (resp.status === 200) {
                const formateddata = await resp.json();
                console.log(formateddata);
                setalnews(formateddata?.news);
                setTotalPages(Math.ceil(formateddata?.news?.length / itemsPerPage)); // Update total pages for categories
            }
        } catch (error) {
            console.error("There was an error fetching the news by category:", error);
        }
    };


    useEffect(() => {
         fetchcats();
         fetchAllNews(currentPage);
    }, [])


    console.log("allnew ",alnews)

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

            <HeadSEO1 />

            <div id="event-update">

                <section className="background-news">
                    <div className="container">
                        <div className="row ">
                            <div className=" col-md-12 content">
                                <div className="main-content">
                                    <div className="main-cover-content d-flex  align-middle">
                                        <div className="head-part-1">
                                            <h5>Home</h5>
                                        </div>
                                        <div className="head-svg-2">
                                            <svg
                                                width={12}
                                                height={20}
                                                viewBox="0 0 12 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2.35658 19.1666L0.729492 17.5395L8.26908 9.99992L0.729492 2.46034L2.35658 0.833252L11.5232 9.99992L2.35658 19.1666Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <div className="head-part-3">
                                            <h5>Resource</h5>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <h2>News</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cont-color-grey">
                    <div className="container col-three">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-content-hoot d-flex">
                                    <div
                                        className="btn-group  apple"
                                        role="group"
                                        aria-label="Default button group"
                                    >
                                       
                                        {
                                            allNewsCat?.map((cat , index)=>(
                                                <button onClick={()=>fetchNewsByCat(cat?.name)} key={index} type="button" className="btn btn-outline-secondary second-one rander">
                                                {cat?.name} 
                                            </button>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="container eleven-headinf-main mt-5">
                                    <div className="row eleven-flex-wrap">

                                        {
                                            alnews?.map((news , index)=>(
                                                <div   key={index} className="col-md-4 mb-4 singlwrap">
                                                <div className="card eleven-card">
                                                    {
                                                        news?.images ?
                                                        <img src={`https://admin.instacertify.com/backend/admin/images/news_management/news/${news?.images}`} className="card-img-top" alt="Card image"/>:
                                                        <img src={news?.image} className="card-img-top" alt="Card image"/>
                                                    }
                                                    <div className="card-body">
                                                        <h2 className="card-titless">
                                                           {news?.title}
                                                        </h2>
                                                        <a href={`/newssdetail?id=${news?.slug}`} className="read-more">
                                                            READ MORE
                                                        </a>
                                                    </div>
                                                </div>
                                                </div>                                            
                                            ))
                                        }
                                       
                                      
                                    </div>
                                  
                                </div>

                                <div className="page-bottom-button">
    <div className="button-down-content">
        {/* Previous Button */}
        <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() => {
                if (currentPage > 1) {
                    setCurrentPage(prevPage => prevPage - 1);
                    fetchAllNews(currentPage - 1); // Adjust for pagination
                }
            }}
        >
            <svg
                width={10}
                height={8}
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Left Arrow Icon */}
                <path
                    d="M1.025 3.475L0.5 4L1.025 4.525L4.025 7.525C4.325 7.825 4.775 7.825 5.075 7.525C5.375 7.225 5.375 6.775 5.075 6.475L3.35 4.75H8.75C9.2 4.75 9.5 4.45 9.5 4C9.5 3.55 9.2 3.25 8.75 3.25H3.35L5.075 1.525C5.225 1.375 5.3 1.225 5.3 1C5.3 0.55 5 0.25 4.55 0.25C4.325 0.25 4.175 0.325 4.025 0.475L1.025 3.475Z"
                    fill="#355684"
                />
            </svg>
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                type="button"
                className={`btn ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => {
                    setCurrentPage(index + 1);
                    fetchAllNews(index + 1); // Adjust for pagination
                }}
            >
                {index + 1}
            </button>
        ))}

        {/* Next Button */}
        <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => {
                if (currentPage < totalPages) {
                    setCurrentPage(prevPage => prevPage + 1);
                    fetchAllNews(currentPage + 1); // Adjust for pagination
                }
            }}
        >
            <svg
                width={10}
                height={8}
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Right Arrow Icon */}
                <path
                    d="M8.975 4.525L9.5 4L8.975 3.475L5.975 0.475C5.675 0.175 5.225 0.175 4.925 0.475C4.625 0.775 4.625 1.225 4.925 1.525L6.65 3.25H1.25C0.8 3.25 0.5 3.55 0.5 4C0.5 4.45 0.8 4.75 1.25 4.75H6.65L4.925 6.475C4.775 6.625 4.7 6.775 4.7 7C4.7 7.45 5 7.75 5.45 7.75C5.675 7.75 5.825 7.675 5.975 7.525L8.975 4.525Z"
                    fill="#355684"
                />
            </svg>
        </button>
    </div>
</div>


                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-fluid  last">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-content-1 d-flex">
                                    <div className="head-yet">
                                        <h2>Request A Call Back</h2>
                                    </div>
                                    <div className="input-part d-flex ">
                                        <div className="name-input d-flex">
                                            <label htmlFor="full-name">Full Name</label>
                                            <input type="text" placeholder="Enter your name..." />
                                        </div>
                                        <div className="email-input d-flex">
                                            <label htmlFor="e-mail">Email Address</label>
                                            <input type="email" placeholder=" Your email address..." />
                                        </div>
                                        <div className="phone-input d-flex">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="number" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div className="btn-submit">
                                        <button className="btn hash-code" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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