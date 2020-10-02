/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-namespace */
import Head from "next/head"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // "df-messenger": any
      "df-messenger": DFProps
      // "df-messenger": React.DetailedHTMLProps<
      //   React.HTMLAttributes<HTMLElement>,
      //   HTMLElement
      // >
    }
  }
}

interface DFProps {
  intent: string
  "chat-title": string
  "agent-id": string
  "language-code": string
}

interface Props {
  title: string
  desc: string
  canonical?: string
  css?: string
  image?: string
  chatbot?: string
  js?: string
}

const Meta = ({ title, desc, canonical, css, image, chatbot, js }: Props) => {
  const isProduction = process.env.NODE_ENV === "production"
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} key="title" />
      <meta name="description" content={desc} key="description" />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" key="ogtype" />
      <meta name="og:title" property="og:title" content={title} key="ogtitle" />
      <meta
        name="og:description"
        property="og:description"
        content={desc}
        key="ogdesc"
      />
      <meta property="og:site_name" content="Medtech Africa" key="ogsitename" />
      <meta property="og:url" content={`${canonical}`} key="ogurl" />
      {/* <!-- Twitter --/> */}
      <meta property="twitter:url" content={`${canonical}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:site" content="@medtechafrica" />
      <meta name="twitter:creator" content="@medtechafrica" />
      {/* image */}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      {/* Fonts and icons */}
      {/* <link
    href="https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@400;500;600&family=Poppins:wght@400;500&family=Raleway:wght@400;500&display=swap"
    rel="stylesheet"
    /> */}
      {css && <link rel="stylesheet" href={`${css}`} />}

      {/* images */}
      {image ? (
        <meta property="og:image" content={`${image}`} />
      ) : (
        <meta property="og:image" content="/logo.png" key="ogimage" />
      )}
      {image ? (
        <meta name="twitter:image" content={`${image}`} />
      ) : (
        <meta property="twitter:image" content="/logo.png" key="twitterimage" />
      )}
      {isProduction && chatbot ? (
        <>
          <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
          <df-messenger
            intent="WELCOME"
            chat-title="Medtech Covid19"
            agent-id="13a33dcf-3660-47de-8e56-ddba15e239f4"
            language-code="en"
          />
        </>
      ) : null}
      {/* canonical 
    {canonical && <link rel="canonical" href={`${canonical}`} />}
    */}
      {/* js */}
      {js && <script type="text/javascript" src={`${js}`} />}
      {/* {isProduction && ( */}
      {/* <>
        <script
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
                fbq('init', '308575757214952');
                fbq('track', 'PageView');
              }, 3000);
                  `,
          }}
        />
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
      </> */}
      {/* )} */}
    </Head>
  )
}

export default Meta
