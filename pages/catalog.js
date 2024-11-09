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


var settingsMorePhotos = {
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
};


export default function catalog(pageProp) {

  const product = pageProp.page_content.product;
  const customFields = product?.customFields;


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


  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [allProduct , setAllProduct] = useState([]);
  const [allCategory , setAllCategory] = useState([]);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const category = [
    {
      title:"Labware" , 
   
    } , 
    {
      title:"Lab Chemicals" ,
      
    } ,
    {
      title:"General Laboratory Consumables" ,
     
    } , 
    {
      title:"Occupational Safety, Security" , 
   
    } ,
    {
      title:"Cleaning and Sterilization" , 
   
    } ,
    {
      title:"Life Sciences" , 
   
    } ,
    {
      title:"Analytical Measurement and Testing" , 
   
    } ,
    {
      title:"Optical Instruments and Microscopes" , 
   
    } ,
    {
      title:"Vacuum Technology, Drying, Dry Storage" , 
   
    } ,
    {
      title:"Distillation, Separation, Filtration" , 
   
    } ,
    {
      title:"Industry Specific Bundle" , 
   
    } ,
  ]
  
  const fetchProduct = async () => {
    try {
      const resp = await fetch("https://admin.instacertify.com/api/products?limit=20&offset=0&all=1", {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if(resp.status === 200){
        const formateddata = await resp.json();
        console.log(formateddata);
        setAllProduct(formateddata?.products);
        // setAllCategory(formateddata?.categories)

      }

     
    } catch (error) {
     
      console.error("There was an error fetching the categories:", error);
    }
  };

  const fetchCategory = async () => {
    try {

      const resp = await fetch("https://admin.instacertify.com/api/categories", {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        }
      });

       if(resp.status === 200){
        const formateddata = await resp.json();
        setAllCategory(formateddata)

      }

     
    } catch (error) {
     
      console.error("There was an error fetching the categories:", error);
    }
  };

  const addToCartApi = async()=>{
    // http://localhost:8081/instacertify-backend/public/api/cart/add

      const resp = fetch('https://admin.instacertify.com/instacertify-backend/public/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product_id: 1,
            quantity: 1,
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    console.log("vresp " , resp);
    
  }

  useEffect(()=>{
    fetchProduct();
    fetchCategory();
    
  },[])


  const [showdropdown , setshowdropdown ] = useState(false);


  return (
    <div className="page_shopping_list sop">
      <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

      <div className="catalogs">

      <div className="catalogcont">

        <div className="iuiu">
          <div className="all_fastners">

           <div className="left_fastner">
      <button onClick={toggleDropdown}>
        <span>FILTERS</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_265_1423)">
                    <path d="M1 4.74977H3.736C3.95064 5.5395 4.41917 6.23666 5.06933 6.7337C5.71948 7.23074 6.51512 7.50003 7.3335 7.50003C8.15188 7.50003 8.94752 7.23074 9.59767 6.7337C10.2478 6.23666 10.7164 5.5395 10.931 4.74977H23C23.2652 4.74977 23.5196 4.64441 23.7071 4.45688C23.8946 4.26934 24 4.01499 24 3.74977C24 3.48455 23.8946 3.2302 23.7071 3.04266C23.5196 2.85513 23.2652 2.74977 23 2.74977H10.931C10.7164 1.96004 10.2478 1.26288 9.59767 0.76584C8.94752 0.268803 8.15188 -0.000488281 7.3335 -0.000488281C6.51512 -0.000488281 5.71948 0.268803 5.06933 0.76584C4.41917 1.26288 3.95064 1.96004 3.736 2.74977H1C0.734784 2.74977 0.48043 2.85513 0.292893 3.04266C0.105357 3.2302 0 3.48455 0 3.74977C0 4.01499 0.105357 4.26934 0.292893 4.45688C0.48043 4.64441 0.734784 4.74977 1 4.74977ZM7.333 1.99977C7.67912 1.99977 8.01746 2.10241 8.30525 2.2947C8.59303 2.48699 8.81734 2.7603 8.94979 3.08007C9.08224 3.39985 9.1169 3.75171 9.04937 4.09118C8.98185 4.43065 8.81518 4.74247 8.57044 4.98721C8.3257 5.23195 8.01388 5.39862 7.67441 5.46615C7.33494 5.53367 6.98307 5.49901 6.6633 5.36656C6.34353 5.23411 6.07022 5.0098 5.87793 4.72202C5.68564 4.43423 5.583 4.09589 5.583 3.74977C5.58353 3.2858 5.76807 2.84099 6.09615 2.51292C6.42422 2.18484 6.86903 2.0003 7.333 1.99977Z" fill="white" />
                    <path d="M23 11H20.264C20.0497 10.2101 19.5814 9.51268 18.9313 9.01544C18.2812 8.5182 17.4855 8.24878 16.667 8.24878C15.8485 8.24878 15.0528 8.5182 14.4027 9.01544C13.7526 9.51268 13.2843 10.2101 13.07 11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8947 0.734784 13 1 13H13.07C13.2843 13.7899 13.7526 14.4873 14.4027 14.9846C15.0528 15.4818 15.8485 15.7512 16.667 15.7512C17.4855 15.7512 18.2812 15.4818 18.9313 14.9846C19.5814 14.4873 20.0497 13.7899 20.264 13H23C23.2652 13 23.5196 12.8947 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11ZM16.667 13.75C16.3209 13.75 15.9825 13.6474 15.6948 13.4551C15.407 13.2628 15.1827 12.9895 15.0502 12.6697C14.9178 12.3499 14.8831 11.9981 14.9506 11.6586C15.0181 11.3191 15.1848 11.0073 15.4296 10.7626C15.6743 10.5178 15.9861 10.3512 16.3256 10.2836C16.6651 10.2161 17.0169 10.2508 17.3367 10.3832C17.6565 10.5157 17.9298 10.74 18.1221 11.0278C18.3144 11.3156 18.417 11.6539 18.417 12C18.4165 12.464 18.2319 12.9088 17.9039 13.2369C17.5758 13.5649 17.131 13.7495 16.667 13.75Z" fill="white" />
                    <path d="M23 19.25H10.931C10.7164 18.4603 10.2478 17.7631 9.59767 17.2661C8.94752 16.769 8.15188 16.4998 7.3335 16.4998C6.51512 16.4998 5.71948 16.769 5.06933 17.2661C4.41917 17.7631 3.95064 18.4603 3.736 19.25H1C0.734784 19.25 0.48043 19.3554 0.292893 19.5429C0.105357 19.7304 0 19.9848 0 20.25C0 20.5152 0.105357 20.7696 0.292893 20.9571C0.48043 21.1447 0.734784 21.25 1 21.25H3.736C3.95064 22.0397 4.41917 22.7369 5.06933 23.2339C5.71948 23.731 6.51512 24.0003 7.3335 24.0003C8.15188 24.0003 8.94752 23.731 9.59767 23.2339C10.2478 22.7369 10.7164 22.0397 10.931 21.25H23C23.2652 21.25 23.5196 21.1447 23.7071 20.9571C23.8946 20.7696 24 20.5152 24 20.25C24 19.9848 23.8946 19.7304 23.7071 19.5429C23.5196 19.3554 23.2652 19.25 23 19.25ZM7.333 22C6.98688 22 6.64854 21.8974 6.36075 21.7051C6.07297 21.5128 5.84866 21.2395 5.71621 20.9197C5.58376 20.5999 5.5491 20.2481 5.61663 19.9086C5.68415 19.5691 5.85082 19.2573 6.09556 19.0126C6.3403 18.7678 6.65213 18.6012 6.99159 18.5336C7.33106 18.4661 7.68293 18.5008 8.0027 18.6332C8.32247 18.7657 8.59578 18.99 8.78807 19.2778C8.98036 19.5656 9.083 19.9039 9.083 20.25C9.08221 20.7139 8.89758 21.1586 8.56956 21.4866C8.24154 21.8146 7.79689 21.9992 7.333 22Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_265_1423">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
      </button>

      {/* Dropdown visibility controlled by state */}
      <div className={`left_dropdown ${isDropdownVisible ? 'show' : 'hide'}`}>
        {allCategory?.map((item, index) => (
          <div key={index} className="sincategos cursor-pointer">
            <p>{item.name}</p>
            <input type="checkbox" className="sicatchcbox" />
          </div>
        ))}
      </div>
    </div>

          </div>

        </div>

        <div className="righ_mai_wrap">

        <div className="right_fastner">

                <span>SHOWING {allProduct?.length} RESULTS</span>
              
              <div className="second_content">
              <p>Sort by:</p>

              <div className="nwltwwrap">

              <span onClick={()=> setshowdropdown(!showdropdown)}>Newly listed</span>
              <MdKeyboardArrowDown  className="MdKeyboardArrowDownfgf"/>

              {/* drodow */}
           {
            showdropdown &&   
             <div className="newdropdown">
            <p>Old</p>
         </div>
           }
 
              </div>

              </div>
            </div>
          
          <div className="catalog_cards">
            <div className="catalog_card">
              {
                allProduct?.map((product , index)=>(
                  <div key={index} className="catalog_box">
                  <img className="catalog_img" src={product?.image} alt="tensile" />
                  <div className="catalog_content">
                  <Link  style={{textDecoration:"none"}}  href={`/catalogdetail?id=${product?.slug}`}><span className="tensile_content">{product?.name} </span></Link>
                    <div className="tensile_price">
                      <span className="real">₹{product?.sale_price}</span>
                      <span className="fake">₹{product?.price}</span>
                    </div>
                    <div className="reviews">
                      <img src="./images/star.svg" alt="" />
                      <img src="./images/star.svg" alt="" />
                      <img src="./images/star.svg" alt="" />
                      <img src="./images/star.svg" alt="" />
                      <img src="./images/unstar.svg" alt="" />
                    </div>
                    <div className="add_cart_btn">
                      <button onClick={()=>{
                        // console.log("pricut ",product);
                        // addToCartApi();
                      }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.33333 2.71512H13L11.5556 8.92688H2.88889V2.02492H0V0.644531H4.33333V2.71512ZM4.33333 4.09551V7.54649H10.4L11.1944 4.09551H4.33333ZM2.88889 12.3779V10.9975H5.56111V12.3779H2.88889ZM7.94444 12.3779V10.9975H10.6167V12.3779H7.94444Z" fill="white" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
                ))
              }
          
          
            </div>
            <div className="pagination">
              <div className="first_peg">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.025 3.475L0.5 4L1.025 4.525L4.025 7.525C4.325 7.825 4.775 7.825 5.075 7.525C5.375 7.225 5.375 6.775 5.075 6.475L3.35 4.75H8.75C9.2 4.75 9.5 4.45 9.5 4C9.5 3.55 9.2 3.25 8.75 3.25H3.35L5.075 1.525C5.225 1.375 5.3 1.225 5.3 1C5.3 0.55 5 0.25 4.55 0.25C4.325 0.25 4.175 0.325 4.025 0.475L1.025 3.475Z" fill="#355684" />
                </svg>
              </div>
              <div className="second_peg">
                <span>1</span>
              </div>
              <div className="third_peg">
                <span>2</span>
              </div>
              <div className="fourth_peg">
                <span>...</span>
              </div>
              <div className="fifth_peg">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.975 4.525L9.5 4L8.975 3.475L5.975 0.475C5.675 0.175 5.225 0.175 4.925 0.475C4.625 0.775 4.625 1.225 4.925 1.525L6.65 3.25H1.25C0.8 3.25 0.5 3.55 0.5 4C0.5 4.45 0.8 4.75 1.25 4.75H6.65L4.925 6.475C4.775 6.625 4.7 6.775 4.7 7C4.7 7.45 5 7.75 5.45 7.75C5.675 7.75 5.825 7.675 5.975 7.525L8.975 4.525Z" fill="white" />
                </svg>

              </div>
            </div>
          </div>
        </div>

        </div>


      </div>

      <div className="request_callback">
        <div className="container">
          <span className="call_back">Request A Call Back</span>
          <div className="form">
            <form>
              <div className="form_flex">
                <div className="input_form">
                  <label htmlFor="">Full Name</label>
                  <input placeholder="Enter your name..." type="text" />
                </div>
                <div className="input_form">
                  <label htmlFor="">Email Address</label>
                  <input placeholder="Your email address..." type="email" />
                </div>
                <div className="input_form">
                  <label htmlFor="">Phone</label>
                  <input placeholder="Phone Number" type="number" />
                </div>
              </div>
              <button className="sub_btn">Submit</button>
            </form>
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