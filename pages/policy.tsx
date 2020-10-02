import Layout from "components/Layout/Layout"
import Policy from "components/Policy/Policy2"
import SEO from "components/SEO"

const Home = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Medtech Africa"
        desc="Notice Of Privacy Practices on Africa's first PayGo Telemedicine platform"
        canonical="https://medtech.africa/policy"
      />
      <Layout>
        <Policy />
      </Layout>
    </>
  )
}

export default Home
