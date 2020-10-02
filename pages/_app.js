import "../assets/scss/nextjs-material-kit.scss"
import React from "react"
import Head from "next/head"
import { SnackbarProvider } from "notistack"
import ThemeProvider from "utils/theme/ThemeProvider"

// gtag event
// import * as gtag from "utils/lib/gtag"
import NProgress from "../components/Progressbar/NProgressBar"

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
          {getLayout(<Component {...pageProps} />)}
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
