import Layout from "components/Layout/Layout"
import Terms from "components/Terms/Terms2"
import SEO from "components/SEO"

const Home = () => {
  return (
    <>
      <SEO
        title="Terms and Conditions | Medtech africa"
        desc="These Terms of Use set forth the terms
        and conditions governing your use of the Medtech Africa's service"
        canonical="https://medtech.africa/terms"
      />
      <Layout>
        <Terms />
      </Layout>
    </>
  )
}

export default Home
