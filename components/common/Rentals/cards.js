import React from 'react'
import style from "../../../pages/css/rentalCards.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

export default function RentalCards(props) {
  const parentPage = props.parentPage;
  let rentalCardsSlider = ""
  if(parentPage == "slider"){ rentalCardsSlider = style.rentalCardsSlider; }
  
  const product = props?.item;
  const imagePath = props?.imagePath;
  
  return (
    <div className={style.rentalCards + " "+ rentalCardsSlider}>
      <div className={style.rentalCard}>
        <div className={style.imageContainer}>
          <Link href={`/rental/${product?.slug}`}>
              {
                product?.images?.length > 0 ?
                (
                  <Image
                    className={style.banner_image}
                    src={imagePath+"/"+product?.images[0]}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
                :
                (
                  <Image
                    className={style.banner_image}
                    src={'https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/coming-soon.png'}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
              }
              
          </Link>
        </div>
        <div className={style.cardsBody}>
          <h4 className={style.title}><Link href={`/rental/${product?.slug}`}>{product?.title}</Link></h4>
          <p className={style.location}>{product?.location}</p>
          <p className={style.date}>
            { moment(product?.check_in).format('ddd, MMMM DD') }
          </p>
          <p className={style.price}><span>${product?.price?.toFixed(2)}</span> /night</p>
        </div>
      </div>
    </div>
  )
}
