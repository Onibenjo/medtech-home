import Layout from "../components/Layout/Layout"
import Product from "../components/OurProduct/Product"
import SEO from "../components/SEO"

function OurProduct() {
  return (
    <Layout>
      <SEO
        title="Our Product | Medtech Africa"
        desc="Our various patent pending technology: Order a smart medical of things (MOT) device, partner with us(healthbank) and our Artificial Intelligence program that help us predict ..."
        canonical="https://medtech.africa/our-product"
      />
      <div>
        <Product />
      </div>
    </Layout>
  )
}

export default OurProduct
