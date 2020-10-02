import "../assets/scss/nextjs-material-kit.scss"

import Head from "next/head"
import React from "react"
import { SnackbarProvider } from "notistack"
import ThemeProvider from "utils/theme/ThemeProvider"
import dynamic from "next/dynamic"

// import { ProvideAuth } from "utils/use-auth"




// gtag event
// import * as gtag from "utils/lib/gtag"
// import isProd from "utils/lib/isProd"
// import NProgress from "../components/Progressbar/NProgressBar"

// const ProvideAuth = dynamic(
//   () => import("../utils/use-auth").then((mod) => mod.ProvideAuth),
//   {
//     ssr: false,
//   }
// )
const NProgress = dynamic(() => import("components/Progressbar/NProgressBar"), {
  ssr: false,
})

export default function MyApp({ Component, pageProps }) {
  // export default class MyApp extends App {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const getLayout = Component.getLayout || ((page) => page)

  // const isServer = typeof window === "undefined"
  // if (isServer) {
  //   return (
  //     <>
  //       <Head>
  //         <title>Medtech Africa</title>
  //         <meta
  //           name="viewport"
  //           content="minimum-scale=1, initial-scale=1, width=device-width"
  //         />
  //       </Head>
  //       <SnackbarProvider
  //         preventDuplicate
  //         maxSnack={3}
  //         anchorOrigin={{
  //           vertical: "bottom",
  //           horizontal: "right",
  //         }}
  //       >
  //         {getLayout(<Component {...pageProps} />)}
  //       </SnackbarProvider>
  //     </>
  //   )
  // }

  return (
    <>
      <Head>
        <title>Medtech Africa</title>
        <meta
          name="viewport"
          content="viewport-fit=cover, minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        <SnackbarProvider
          preventDuplicate
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {/* <CssBaseline /> */}
          <NProgress />
          {/* <ProvideAuth>{getLayout(<Component {...pageProps} />)}</ProvideAuth> */}
          {getLayout(<Component {...pageProps} />)}
          {/* {all} */}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}
// }

// export function reportWebVitals({ id, name, label, value }) {
//   // gtag
//   const val = Math.round(name === "CLS" ? value * 1000 : value)
//   if (isProd) {
//     gtag.event({
//       action: name,
//       category: `Next.js ${label} metric`,
//       label: id,
//       value: val,
//     })
//   }
// }
