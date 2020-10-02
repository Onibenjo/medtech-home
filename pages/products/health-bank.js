import React from "react"
import GridContainer from "../../components/Grid/GridContainer"
import GridItem from "../../components/Grid/GridItem"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO"

const HealthBank = () => {
  return (
    <Layout>
      <SEO
        title="Health Bank | Medtech Africa"
        desc="Medical professionals can partner with us to own their own healthbank. We partner with Existing Pharmacies, Local Healthcare Centres ..."
        canonical="https://medtech.africa"
      />
      <GridContainer>
        <GridItem xs={12} md={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          dolorem deserunt soluta recusandae similique ipsam ad fuga sit, optio
          repudiandae accusantium, repellat facilis esse veritatis? Temporibus
          repudiandae deserunt culpa
        </GridItem>
        <GridItem xs={12} md={6}>
          <h2> Health Bank</h2>
          Medical professionals can partner with us to own their own healthbank,
          earn money and enjoy a flexible working schedule. We partner with:{" "}
          <br />
          - Existing Pharmacies
          <br />
          - Local Healthcare Centres
          <br />- Licensed medical professionals Become a freelance doctor and
          earn additional income. Our Healthbank system is designed to support
          internet conectivity for remote rural community. It's solar powered.
        </GridItem>
      </GridContainer>
    </Layout>
  )
}

export default HealthBank
