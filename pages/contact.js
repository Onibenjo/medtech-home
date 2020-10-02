import dynamic from "next/dynamic"
// import Contact from "../components/Contact/Contact"
import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
// import { SnackbarProvider } from "notistack"

const Contact = dynamic(() => import("../components/Contact/Contact"), {
  ssr: false,
})

const ContactUs = () => {
  // const isServer = typeof window === "undefined"

  //   if (isServer) {
  //     return (
  //       <SnackbarProvider>
  //         <Page />
  //       </SnackbarProvider>
  //     )
  //   }
  return (
    <>
      <SEO
        title="Contact Us - Medtech Africa"
        desc="Get in touch with us - contact@medtech.africa. MedTech Africa 2, Shalom Street, TKP Junction, University Road, Ilorin, Nigeria. Tel: +234 8163602212."
        canonical="https://medtech.africa/contact"
      />
      <Layout>
        <Contact />
      </Layout>
    </>
  )
}

export default ContactUs
