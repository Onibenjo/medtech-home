/* eslint-disable react/no-danger */
import React from "react"
import isProd from "utils/lib/isProd"
import dynamic from "next/dynamic"
import { useTheme } from "@material-ui/core/styles"
import Navbar from "./Navbar"

// import Footer from "./Footer"

const Footer = dynamic(() => import("./Footer"), { ssr: false })

const Layout = ({ children }) => {
  const theme = useTheme()
  return (
    <>
      <div
        style={{
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <div style={{ height: theme.mixins.toolbar.minHeight }} />
        {children}
        <Footer />
      </div>
      {isProd && (
        <>
          {/* <script src="https://apps.elfsight.com/p/platform.js" defer></script>
<div class="elfsight-app-d6b59acb-60f1-49f9-9d50-12f766ed2a98"></div> */}
          {/* <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              setTimeout(() => {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
               fbq('consent', 'revoke');
               fbq('init', '308575757214952');
               fbq('track', 'PageView');
               fbq('consent', 'grant');
                }, 5000)
                  `,
            }}
          /> */}
          <noscript>
            <img
              height="1"
              width="1"
              // style="display:none"
              style={{ display: "none" }}
              alt=""
              src="https://www.facebook.com/tr?id=308575757214952&ev=PageView&noscript=1"
            />
          </noscript>
        </>
      )}
    </>
  )
}

export default Layout
