import Image from "next/image";
import React, { useRef } from "react";
import style from "./css/eventList.module.scss";
import Link from "next/link";
import { useState } from "react";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import HeadSEO from "../components/common/Head/head";
import { usePathname } from 'next/navigation';

export default function EventLists(pageProp) {
  const [filterEvents, setFilterEvents] = useState(false);
  const refFilterEvents = useRef(null);

  const category_all = pageProp.page_content?.events?.category_all;

  const pathName = usePathname();

  const isActive = (path) => path === pathName;

  return (
    <div>
      <HeadSEO title={"All Events"} description={"All Events"} image={null} />

      {/* Section banner */}
      <div className={style.page_top_banner}>
        <div className="container">
          <h1 className={style.banner_heading}>All Events</h1>
        </div>
        <Image
          className={style.banner_image}
          src={"/images/former.png"}
          width="100"
          height="600"
          layout="responsive"
          objectFit="cover"
          alt="Event List"
        />
      </div>

      {/* Section category */}
      <div className="container">
        <ul className={style.categoryList}>
          {category_all?.map((ls, i) => (
            <li key={ls.id} className={style.card}>
              <Link href={'/events/' + ls.slug}>
                {/* <div className={style.figureContainer}>
                  {ls?.image != null ? (
                    <Image
                      className={style.figure}
                      src={ls.image}
                      width="200"
                      height="204"
                      alt="Event List"
                    />
                  ):""}
                </div> */}
                <div className={`${isActive(ls.path) ? 'active' : ''} alloys`}>
                  <h4 className={style.cateTitle}>{ls?.name}</h4>
                </div>
                {/* <span className={style.cateCount}>{ls?.count} events</span> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export async function getServerSideProps(context) {


  const globalSettings = await GlobalHeaderFooter();
  const eventsFetch = await fetch(process.env.server.api + "get-event-by-category/test");
  const events = await eventsFetch.json();
  const page_content = { events: events }

  return {
    props: {
      page_content: page_content,
      navbar: globalSettings?.header,
      footer: globalSettings?.footer
    },
  };




}
