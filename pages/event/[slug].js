import React, { useEffect, useState } from 'react'
import style from "./../css/eventDetails.module.scss";
import HeadSEO from '../../components/common/Head/head';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import $ from "jquery";

//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//ICONS
import EventDetLocation from '../../components/common/svg/eventDetials/location';
import EventDetDateTime from '../../components/common/svg/eventDetials/dateTime';
import EventDetMinus from '../../components/common/svg/eventDetials/minus';
import EventDetPlus from '../../components/common/svg/eventDetials/plus';
import EventDetWatch from '../../components/common/svg/eventDetials/watch';
import GlobalArrowUp from '../../components/common/svg/global/arrowUp';
import GlobalArrowDown from '../../components/common/svg/global/arrowDown';
import Countdown from '../../components/common/Countdown/Countdown';
import EventDetGrid from '../../components/common/svg/eventDetials/grid';
import GlobalClose from '../../components/common/svg/global/close';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import GlobalHeaderFooter from '../../utils/common/global-header-footer';

var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear'
};

export default function EventDetails(pageProp) {

    const router = useRouter();
    const eventObj = pageProp.page_content?.event;
    const [message, setMessage] = useState('');
    const [showPhotos, setShowPhotos] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const { data: session, status } = useSession();

    
    useEffect(function(){
        $(".container_eventDetails").on('click', ".qtyIncrement",function(){
            const inputQty = $(this).parent('.parentFormIncrement').find('.inputQty');
            const bc_price = $(this).parent('.parentFormIncrement').find('.bc_price').val();
            const qty = $(inputQty).attr('value');
            const count = parseInt(qty)+1;
            $(".errorMessage").html('');
            $(inputQty).attr('value', count).val(count);

            const currentPrice = parseFloat($(".priceWithIcon .count").text());
            const price = (currentPrice + parseFloat(bc_price)).toFixed(2);
            
            $(".priceWithIcon .count").html(price);
            $(".btnCheckout span").html(price);
            
            if(parseFloat(price) > 0){
                $(".btnCheckout").removeAttr('disabled');
                $(".priceWithIcon").show();
            }else{
                $(".btnCheckout").attr('disabled','disabled');
                $(".priceWithIcon").hide();
            }
        })
        $(".container_eventDetails").on('click', ".qtyDecrement",function(){
            const inputQty = $(this).parent('.parentFormIncrement').find('.inputQty');
            const bc_price = $(this).parent('.parentFormIncrement').find('.bc_price').val();
            const qty = $(inputQty).attr('value');
            $(".errorMessage").html('');
            if(qty > 0){
                const count = parseInt(qty)-1;
                $(inputQty).attr('value', count).val(count);
                
                const currentPrice = parseFloat($(".priceWithIcon .count").text());
                const price = (currentPrice - parseFloat(bc_price)).toFixed(2);
                $(".priceWithIcon").show();
                $(".priceWithIcon .count").html(price);
                $(".btnCheckout span").html(price);
                
                if(parseFloat(price) > 0){
                    $(".btnCheckout").removeAttr('disabled');
                    $(".priceWithIcon").show();
                }else{
                    $(".btnCheckout").attr('disabled','disabled');
                    $(".priceWithIcon").hide();
                }
            }
        })

    },[])

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product_id = [];
        setMessage('')
        $("#formVariants .inputQty").each(function(){
            const qty = parseFloat($(this).val());
            if(qty > 0){
                const bcId = $(this).parent('.parentFormIncrement').find('.bc_id').val();
                product_id.push({bcId, qty});
            }
        })
        if(product_id.length > 0){
            setFormSubmit(true)
            const nx_cart_id = Cookies.get('nx_cart_id');

            const cartData = [{
                customer_id: session ? session?.user?.bcId : 0,
                nx_cart_id: typeof nx_cart_id != "undefined" ? nx_cart_id : 0,
            }];

            const itemsData = [];
            product_id.map(ls=>{
                itemsData.push({
                    "quantity": ls.qty,
                    "product_id": ls.bcId
                })
            })
            cartData.push({"products":itemsData});

            try {

                const createCart = await fetch(process.env.next.api_url+"cart/create",{
                    method:"post",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(cartData)
                });
                const cartRes = await createCart.json();
    
    
                if(cartRes?.status && cartRes?.status == 404){
                    Cookies.remove('nx_cart_id');
                    setMessage("Something went wrong");
                    setFormSubmit(false)
                    $(".priceWithIcon .count").text('0.00')
                    $(".btnCheckout span").html('0.00');
                    return false;
                }
                if(cartRes?.status && cartRes?.status == 422){
                    setMessage("Event is not available for now.");
                    setFormSubmit(false)
                    $(".priceWithIcon .count").text('0.00')
                    $(".btnCheckout span").html('0.00');
                    return false;
                }
    
                
                const cart_id = cartRes?.data?.id;
                if(typeof cart_id != "undefined" && cart_id != ""){
                    console.log(cartRes?.data)
                    Cookies.set('nx_cart_id', cart_id, { expires: 4 });
                    router.push('/cart');
                }else{
                    Cookies.remove('nx_cart_id');
                    setMessage("Something went wrong");
                    setFormSubmit(false)
                    $(".priceWithIcon .count").text('0.00')
                    $(".btnCheckout span").html('0.00');
                    return false;
                }

                
            } catch (error) {
                Cookies.remove('nx_cart_id');
                setMessage("Something went wrong");
                setFormSubmit(false)
                $(".priceWithIcon .count").text('0.00')
                $(".btnCheckout span").html('0.00');
                return false;
            }

            
        }else{
            $(".btnCheckout").attr('disabled','disabled');
            setMessage("Please enter at least one quantity");
            setFormSubmit(false)
        }
    }
    
    
    return (
        <div className={style.eventDetails}>
            <HeadSEO title={eventObj?.seo_title} description={eventObj?.seo_description} image={eventObj?.image?.length > 0 ? eventObj?.image[0]:false}  />

            <div className='container container_eventDetails'>

                {/* Event all images */}
                <div className={style.eventFigure}>
                    {/* Left */}
                    { eventObj?.image?.length > 0 ? (
                        <div className={style.left}>
                            <Image className={'style.figure'} src={eventObj?.image[0]} width="620" height="441" alt={'ls.title'} quality={100} priority={true} />
                        </div>
                    ):""}
                    {/* Right */}
                    { eventObj?.image?.length > 1 ? (
                        <div className={style.right}>
                            <div className={style.rightInner}>
                                <Image className={'style.figure'} src={eventObj?.image[1]} width="400" height="217" alt={'ls.title'} quality={100} priority={true} />
                            </div>
                            { eventObj?.image?.length > 2 ? (
                                <>
                                    <div className={style.rightInner}>
                                        <Image className={'style.figure'} src={eventObj?.image[2]} width="400" height="217" alt={'ls.title'} quality={100} priority={true} />
                                    </div>
                                </>
                            )
                            : ""}
                            
                        </div>
                    ):""}


                    { eventObj?.image?.length > 2 ? (
                        <button onClick={()=>{ setShowPhotos(true) }} type="button" className={style.btn_show_more_photos}>
                            <EventDetGrid />
                            Show More Photos
                        </button>
                    ):""}

                </div>


                {/* Event body */}
                <div className={style.eventBody}>

                    {/* left */}
                    <div className={style.left}>

                        <h1 className={style.title}>{eventObj?.title}</h1>

                        {eventObj?.single_day == 0 ? (
                            <div className={style.dateTimeDetails}>
                                <div className={style.dateTime}>
                                    <h4>Event start</h4>
                                    <p>{ moment(eventObj?.start_date).format('ddd, MMMM DD') }</p>
                                </div>

                                <div className={style.dateTime}>
                                    <h4>Event end</h4>
                                    <p>{ moment(eventObj?.end_date).format('ddd, MMMM DD') }</p>
                                </div>
                            </div>
                        ) : (
                            <div className={style.dateTimeDetails}>
                                <div className={style.dateTime}>
                                    <h4>Event Date</h4>
                                    {
                                        eventObj?.start_time == null ?
                                            <p>{moment(eventObj?.date).format('ddd, MMMM DD') }</p>
                                            :
                                            <p>{moment(eventObj?.date).format('ddd, MMMM DD') }, {moment(eventObj?.start_time, 'HH:mm').format('hh:mm A')}</p>
                                    }
                                    
                                </div>
                            </div>
                        )}


                        <div className={style.description}>
                            <h2>Description</h2>
                            <div className={style.eventAbout} dangerouslySetInnerHTML={ {__html:eventObj?.description} }></div>
                        </div>

                        <div className={style.whenWhere}>

                            <h2>When and where</h2>

                            
                                <div className={style.iconWithDetails}>
                                    <span className={style.icon}><EventDetDateTime /></span>
                                    <div className={style.content}>
                                        <h4>Date and time</h4>
                                        {eventObj?.single_day == 0 ? (
                                            <p className="sd">
                                                { moment(eventObj?.start_date).format('ddd, MMMM DD')}
                                                {" - "}
                                                { moment(eventObj?.end_date).format('ddd, MMMM DD') }
                                                { eventObj?.start_time != null ? ", "+ moment(eventObj?.start_time, 'HH:mm').format('hh:mm A') : "" }
                                            </p>
                                        ) : 
                                        (
                                            eventObj?.start_time == null ?
                                                <p>{moment(eventObj?.date).format('ddd, MMMM DD') }</p>
                                                :
                                                <p>{moment(eventObj?.date).format('ddd, MMMM DD') } { eventObj?.start_time != null ? ", "+ moment(eventObj?.start_time, 'HH:mm').format('hh:mm A'):""}</p>
                                        )
                                        }
                                    </div>
                                </div>


                            <div className={style.iconWithDetails}>
                                <span className={style.icon}><EventDetLocation /></span>
                                <div className={style.content}>
                                    <h4>Location</h4>
                                    <p>{eventObj?.location}</p>

                                    {/* <button className={ showMap ? style.isActive:'' } onClick={()=> { setShowMap(value => !value) }}>
                                        { showMap ? 'Hide Map' : 'Show Map ' }
                                        { showMap ? <GlobalArrowUp /> : <GlobalArrowDown /> }
                                    </button> */}
                                </div>
                            </div>

                        </div>

                        {/* Google Map */}
                        {eventObj?.location_iframe != null ? (
                            <div className={style.googleMap}>
                                <div dangerouslySetInnerHTML={ {__html:eventObj?.location_iframe} }></div>
                            </div>
                        ) : ""}

                    </div>

                    {/* Right */}
                    {eventObj?.type?.length > 0 ? (
                        <div className={style.right} style={{display:'none !important'}}>
                            { message != '' ? (<span className={style.errorMessage+" errorMessage"}>{message}</span>) : "" }
                            { formSubmit == true ? (<span className='loadingOverlay' style={{display:'block'}} />) : "" }
                            {/* Event Summury */}
                            <form method='post' id='formVariants' onSubmit={handleSubmit}>
                                <div className={style.eventSummury + " eventSummury"}>
                                        {eventObj.type.map((ls, i)=>(
                                            <div key={i} className={style.verints}>
                                                <div className={style.verLeft}>
                                                    <h4>{ls.title} ${ls.ticket_price}</h4>
                                                    {ls.tag == null ? "": <span>({ls.tag})</span>}
                                                </div>
                                                <div className={style.verRight}>
                                                    <div className={style.formIncrement+ " parentFormIncrement"}>
                                                        <input type="hidden" className='bc_id' name={"bc_id_"+ls.bigcommerce_id} value={ls.bigcommerce_id} />
                                                        <input type="hidden" className='bc_price' name={"bc_price_"+ls.bigcommerce_id} value={ls.ticket_price} />

                                                        <button className={style.btnIncDec +" qtyDecrement"} type="button"><EventDetMinus /></button>

                                                        <input className={style.inputQty + " inputQty"} type="tel" name={"qty_"+ls.bigcommerce_id}  value={0} />

                                                        <button className={style.btnIncDec +" qtyIncrement"}  type="button"><EventDetPlus /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className={style.priceWithIcon+ " priceWithIcon"} style={{display:'none'}}>
                                            <span className={style.price}>$<span className='count'>0.00</span></span>
                                        </div>
                                        <button type="submit" className={style.btnCheckout + " btnCheckout"} disabled>Purchase for $<span>0.00</span></button>
                                


                                </div>
                            </form>
                        </div>
                    ) : 
                        <div className={style.right} style={{display:'none'}}>
                            <p className={style.noEventType}>Event is not available for now.</p>
                        </div>
                    }

                </div>


                {/* About this event */}
                <div className={style.eventBody}>
                    {/* left */}
                    <div className={style.left}>

                        <div className={style.whenWhere}>
                            <h2>About this event</h2>
                        </div>

                        <div className={style.timerTicketInfo}>
                            <div className={style.timerTicket} title='Days : Hours : Minutes : Seconds'>
                                <EventDetWatch />
                                {eventObj?.single_day == 0 ? (
                                    <div className={style.countDown}><Countdown eventTime={eventObj?.end_date} interval={1000} /></div>
                                ) : (
                                    <div className={style.countDown}><Countdown eventTime={eventObj?.date} interval={1000} /></div>
                                ) }
                            </div>
                            <div className={style.timerTicket}>
                                <EventDetWatch />
                                <span>Mobile eTicket</span>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Show more photos gallrey */}
                {showPhotos ? (
                    <div className={style.morePhotosPopups+ " morePhotosPopups"}>
                        <span onClick={()=>{ setShowPhotos(false) }}><GlobalClose className={style.close} /> </span>
                        <div className={style.inner}>
                            <Slider {...settingsMorePhotos}>
                                {eventObj?.image?.map((ls, i)=>(
                                    <><Image src={ls} width="1280" height="600" alt={eventObj?.title} quality={100} /></>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ) :""}

            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const urlSlug = context.params.slug;
    if(urlSlug != ""){
  
      	try {

            const globalSettings = await GlobalHeaderFooter();
            const eventFetch = await fetch(process.env.server.api+"get-event-details/"+urlSlug);
            const eventDetial = await eventFetch.json();

            return {
                props: {
                    page_content: eventDetial,
                    navbar: globalSettings?.header,
                    footer: globalSettings?.footer
                },
            };
            
        } catch (error) {

            return {
                props: {
                  page_content: false,
                  navbar: false,
                  footer: false,
                },
                notFound: true
              };
            
        }
  
    }else{
  
        return {
            props: {
              page_content: false,
              navbar: false,
              footer: false,
            },
            notFound: true
          };
  
    }
  
    
  }
  