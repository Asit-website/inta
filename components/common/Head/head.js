import React from 'react'
import Head from "next/head";

export default function HeadSEO(props) {
  return (
    <>
      <Head>
        <title>{props?.title}</title>
        <meta name="description" content={props?.description} />
        <meta name="author" content='Fairchild Air Force Base' />
        <meta name="publisher" content='Fairchild Air Force Base' />
        <meta name="Keywords" content='The Official Website of Fairchild FSS - United States Air Force - 92d Force Support Squadron - Fairchild Air Force Base' />
        <link rel="icon" type="image/x-icon" href="./images/fav.png"></link>


        {/* Google / Search Engine Tags */}
        <meta itemprop="name" content={props?.title} />
        <meta itemprop="description" content={props?.description} />
        
        {props?.image != false ? (<meta itemprop="image" content={props?.image} />):""}
        
        {/* Twitter */}
        {props?.image != false ? (<meta property="twitter:image" content={props?.image} />):""}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props?.title} />
        <meta property="twitter:description" content={props?.description} />

        {/* Facebook & Others */}
        {props?.image != false ? (<meta property="og:image" content={props?.image} />):""}
        <meta property="og:title" content={props?.title} />
        <meta property="og:description" content={props?.description} />
      </Head>
    </>
  )
}
