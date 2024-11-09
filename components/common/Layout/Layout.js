import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const Layout = ({children, pageProps}) => {
  return (
    <>
   
      <Navbar navbarProps={pageProps.navbar} />
      <main role="main">{children}</main>
      <Footer footerProps={pageProps.footer} />
      
    </>
  )
}

export default Layout;