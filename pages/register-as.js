import RegisterAs from "../components/RegisterAs/RegisterAs"
import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"

const RegisterAsPage = () => (
  <>
    <SEO
      title="Register | Medtech Africa"
      desc="Register as a Patient or a Medical professional"
      canonical="https://medtech.africa/register-as"
    />
    <Layout>
      <RegisterAs />
    </Layout>
  </>
)

export default RegisterAsPage
