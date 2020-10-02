import React from "react"
import dynamic from "next/dynamic"
import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
// import Donate from "../components/Donate"

const Donate = dynamic(() => import("../components/Donate"), { ssr: false })

const donate = () => {
  return (
    <Layout>
      <SEO
        title="Donate | Medtech Africa"
        desc="We believe in equity of healthcare for people. Sponsor a less privileged Africa medical bill"
        canonical="https://medtech.africa/donate"
      />
      <Donate />
    </Layout>
  )
}
export default donate
