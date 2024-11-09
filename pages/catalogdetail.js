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


export default function catalog(pageProp) {

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
  
  const [productdetail, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchProductDetails = async () => {
    try {

      const resp = await fetch(`https://admin.instacertify.com/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (resp.status === 200) {
        const formateddata = await resp.json();
        setProductDetails(formateddata?.product);
        setReviews(formateddata?.reviews);

      }

    } catch (error) {

      console.error("There was an error fetching the categories:", error);
    }
  };

  const getRelatedProducts = async () => {
    try {

      const resp = await fetch(`https://admin.instacertify.com/api/products/${productdetail?.id}/related`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (resp.status === 200) {
        const formateddata = await resp.json();
        setRelatedProducts(formateddata?.related_products);

      }

    } catch (error) {

      console.error("There was an error fetching the categories:", error);
    }
  };

  useEffect(() => {

    if (id) {
      fetchProductDetails();
    }
    else {
      console.log("error");
    }

  }, [id])

  useEffect(() => {
    if (productdetail) {
      getRelatedProducts();
    }
  }, [productdetail])

  return (
    
    <div className="page_shopping_list sop">
      <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

      <div className="catalogs2">
        <div className="container">

          <div className="appWrapper iuiu2">
            <div className="appContainer">
              {/* section 1  */}
              <div className="appsec1">

                {/* left slider  */}
                <div className="appseleft">

                  <Swiper
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper; // Assign the swiper instance to the ref
                    }}
                    rewind={true}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >

                    {
                      productdetail?.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="tes1wrap">
                            <img src={image} alt={`product-image-${index}`} />
                          </div>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>


                  <div className="swiper-button-prev"><img src='./images/leftionc.png' alt="" /></div>
                  <div className="swiper-button-next"><img src='./images/leftionc.png' alt="" /></div>


                  <div className="moreImages">
                    {
                      productdetail?.images?.length > 1 &&
                      productdetail?.images?.map((img, index) => (

                        <img width="84" height="84" src={img} key={index} className="cursor-pointer" onClick={() => goToSlide(index)} alt="" />
                      ))
                    }

                  </div>

                </div>


                {/* right conte */}
                <div className="slideContent">

                  <div className="slicons1">

                    <p className="avpara">
                      <span>Availability</span>: Estimated to ship on 12 august 2024
                    </p>
                    <h3>{productdetail?.product_name}</h3>
                    <p className="mobilen">Model Number : {productdetail?.sku_name}</p>
                  </div>

                  <img src='./images/stars.png' className="starimg" alt="" />

                  <div className="texespara">
                    <p className="text">Local taxes included (where applicable)</p>
                    <p className="numbers">
                      ₹{productdetail?.sale_price} <span>₹{productdetail?.price}</span>
                    </p>
                  </div>

                  <div className="quantitdiv">
                    <h3>Quantity:</h3>

                    <div className="realquacar">
                      {/* left quantity  */}
                      <div className="realQucarleft">
                        <div onClick={() => {
                          if (count > 1) {
                            setCount(count - 1);
                          }
                        }} className="releftshowd cursor-pointer">- </div>
                        <div className="releftshowd">
                          {count}
                        </div>
                        <div onClick={() => {
                          setCount(count + 1);

                        }} className="releftshowd cursor-pointer"> + </div>
                      </div>

                      {/* right  */}
                      <button className="addtocart">
                        <img src='./images/Vector.png' alt="" /> <span>ADD TO CART</span>
                      </button>
                    </div>

                    <button onClick={() => setPopup(true)} className="reqqbutns">
                      <span>Request A Quote</span>
                    </button>
                  </div>


                  {
                    popup && <div className="pop_form">
                      <div className="pop_form_cont">
                        <div className="avift">
                          <h3>Request a quote</h3>
                          <img className="cursor-pointer" onClick={() => setPopup(false)} width={20} src="./images/same.avif" />
                        </div>
                        <div className="contact_formaaa">
                          <form className="foml">
                            <input type="text" name="name" placeholder="Name" />
                            <input type="email" name="Email" placeholder="Email Address" />
                            <input type="number" placeholder="Phone Number" />
                            {/* <input type="number" placeholder="Quantity" /> */}
                            <textarea placeholder="Message" />

                            <button>Message</button>

                          </form>
                        </div>
                      </div>
                    </div>
                  }


                  <div className="socialwrap">

                    <h3>SHARE ON SOCIAL MEDIA:</h3>

                    <div className="socialimgs">

                      <img src="./images//Facebook.png" alt="" />
                      <img src='./images/Instagram.png' alt="" />
                      <img src='./images/whatsapp 1.png' alt="" />

                    </div>

                    <div className="shopadd topp">
                      <img src='./images/shoping.png' alt="" />
                      <p>Shipping additional  / Tax additional</p>
                    </div>

                    <div className="shopadd toppad">
                      <img src='./images/turn.png' alt="" />
                      <p>Easy Return Process</p>
                    </div>

                    <div className="guidance">
                      <div className="left_guidance">
                        <div className="svg_sent">
                          <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2318 8.53279V7.45099C21.2318 3.65699 18.1451 0.570312 14.3511 0.570312H10.8125C7.01849 0.570312 3.93182 3.65699 3.93182 7.45099V8.53279C1.69122 8.98942 0 10.9753 0 13.3487C0 15.7514 1.7331 17.7566 4.01473 18.1806C4.43873 20.4622 6.44396 22.1953 8.84659 22.1953H12.7784C13.3213 22.1953 13.7614 21.7552 13.7614 21.2124C13.7614 20.6695 13.3213 20.2294 12.7784 20.2294H8.84659C7.48859 20.2294 6.34271 19.3064 6.00167 18.055C7.09113 17.6214 7.86364 16.5568 7.86364 15.3146V11.3828C7.86364 10.1014 7.04179 9.00878 5.89773 8.60302V7.45099C5.89773 4.74099 8.10249 2.53622 10.8125 2.53622H14.3511C17.0611 2.53622 19.2659 4.74099 19.2659 7.45099V8.60302C18.1218 9.00878 17.3 10.1014 17.3 11.3828V15.3146C17.3 16.9406 18.6229 18.2635 20.2489 18.2635C22.9589 18.2635 25.1636 16.0587 25.1636 13.3487C25.1636 10.9753 23.4724 8.98942 21.2318 8.53279ZM1.96591 13.3487C1.96591 11.7227 3.28877 10.3999 4.91477 10.3999C5.45677 10.3999 5.89773 10.8408 5.89773 11.3828V15.3146C5.89773 15.8566 5.45677 16.2976 4.91477 16.2976C3.28877 16.2976 1.96591 14.9747 1.96591 13.3487ZM20.2489 16.2976C19.7069 16.2976 19.2659 15.8566 19.2659 15.3146V11.3828C19.2659 10.8408 19.7069 10.3999 20.2489 10.3999C21.8749 10.3999 23.1977 11.7227 23.1977 13.3487C23.1977 14.9747 21.8749 16.2976 20.2489 16.2976Z" fill="#EC691F" />
                            <path d="M12.5817 13.3487C12.0388 13.3487 11.5987 12.9087 11.5987 12.3658V11.8398C11.5987 10.7904 12.1634 9.81183 13.0724 9.286C13.3761 9.11039 13.5646 8.7839 13.5646 8.43397C13.5646 7.89197 13.1237 7.45102 12.5817 7.45102C12.0397 7.45102 11.5987 7.89197 11.5987 8.43397C11.5987 8.97686 11.1587 9.41693 10.6158 9.41693C10.0729 9.41693 9.63281 8.97686 9.63281 8.43397C9.63281 6.80797 10.9557 5.48511 12.5817 5.48511C14.2077 5.48511 15.5305 6.80797 15.5305 8.43397C15.5305 9.48337 14.9658 10.4619 14.0568 10.9877C13.7532 11.1633 13.5646 11.4898 13.5646 11.8398V12.3658C13.5646 12.9087 13.1246 13.3487 12.5817 13.3487Z" fill="#EC691F" />
                            <path d="M12.5767 17.2804C13.1196 17.2804 13.5597 16.8403 13.5597 16.2974C13.5597 15.7545 13.1196 15.3145 12.5767 15.3145C12.0338 15.3145 11.5938 15.7545 11.5938 16.2974C11.5938 16.8403 12.0338 17.2804 12.5767 17.2804Z" fill="#EC691F" />
                          </svg>
                          <span>NEED ANY GUIDANCE?</span>
                        </div>
                        <div className="svg_pant">
                          <span>Connect with an expert for your assistance.</span>
                        </div>

                      </div>
                      <div className="right_guidance">
                        <button>CONTACT US</button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        <div className="container_section">
          <div className="container">
            <div className="description_flex">
              <p onClick={func1} id="fast">Product Overview</p>
              <p onClick={func2} id="second">Product specifications</p>
              <p onClick={func3} id="third">Ratings & Reviews</p>
            </div>

            <div className="description_content">
              {
                start === 1 && (
                  <div className="description_information">
                    <p>{productdetail?.product_detail}</p>
                  </div>
                )
              }

              {
                start === 2 && (
                  <div className="description_information">
                    <p>{productdetail?.product_specification}</p>
                  </div>
                )
              }

              {
                start === 3 && (
                  <div className="description_information">
                    {
                      reviews?.map((r, index) => (
                        <div key={index} className="singreview">
                          <h4>{r?.detail}</h4>
                          <p>Post At: {new Date(r?.created_at).toLocaleDateString('en-GB')}</p>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div className="container">
          <div className="catalog_cards cata_card1">
            <h3>Related Products</h3>
            <div className="catalog_card">
              {
                relatedProducts?.map((prod, index) => (
                  <div key={index} className="catalog_box">
                    <img className="catalog_img" src={prod?.image} alt="tensile" />
                    <div className="catalog_content">
                      {/* <span className="tensile_content">{prod?.name}</span> */}
                      <Link style={{ textDecoration: "none" }} href={`/catalogdetail?id=${prod?.slug}`}><span className="tensile_content">{prod?.name} </span></Link>
                      <div className="tensile_price">
                        <span className="real">₹{prod?.sale_price}</span>
                        <span className="fake">₹{prod?.price}</span>
                      </div>
                      <div className="reviews">
                        <img src="./images/star.svg" alt="" />
                        <img src="./images/star.svg" alt="" />
                        <img src="./images/star.svg" alt="" />
                        <img src="./images/star.svg" alt="" />
                        <img src="./images/unstar.svg" alt="" />
                      </div>
                      <div className="add_cart_btn">
                        <button>
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
