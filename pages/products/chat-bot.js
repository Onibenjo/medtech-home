import React from "react"
import GridContainer from "../../components/Grid/GridContainer"
import GridItem from "../../components/Grid/GridItem"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO"

const HealthBank = () => {
  return (
    <Layout>
      <SEO
        title="Our Product/Chatbot| Medtech Africa"
        desc="Our product also entails the use of the chatbot which is an AI that helps with medicals problems "
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
          <h2>AI Obus</h2>
          Our Artificial Intelligence program helps us predict and understand
          future Health conditions and needs of our patients.
          <br />
          <br />
          We compute patient's bio data from their vital signs transmitted via
          the SmartMoT and their physiological responses during diagnosis with
          our board certified physicians for predictive treatment of ailments
          and diseases and also to monitor their health conditions
          <br />
          <br />
          We rely on both Patient's Primary data and Health responses to give a
          more accurate prediction.
          <br />
          <br />
          Let us help you stay healthy.
        </GridItem>
      </GridContainer>
    </Layout>
  )
}

export default HealthBank
