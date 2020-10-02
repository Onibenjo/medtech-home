// import { useEffect } from "react"
// import { useRouter } from "next/router"
// import dynamic from "next/dynamic"
import Layout from "components/Layout/Layout"
// import { ProvideAuth } from "utils/use-auth"
import SEO from "components/SEO"
import RegisterComp from "components/Register/RegisterPatient"
// import Loader from "components/Loader/index2"

// const RegisterComp = dynamic(
//   () => import("components/Register/RegisterPatient"),
//   {
//     loading: () => <Loader size={100} />,
//   }
// )

const RegisterPage = () => {
  // const { user } = useAuth()
  // const router = useRouter()

  // useEffect(() => {
  //   router.prefetch("/login")
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (user && !!user.emailVerified) router.push("/doctors/dashboard")
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  return (
    <>
      <SEO
        title="Register as a Patient | Medtech Africa"
        desc="Talk to a Doctor remotely on phone"
        canonical="https://medtech.africa/signup"
      />
      <Layout>
        <RegisterComp />
      </Layout>
    </>
  )
}

export default RegisterPage
