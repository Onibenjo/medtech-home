import RegisterDoc from "components/Register/Doctor"
import Layout from "components/Layout/Layout"
import SEO from "components/SEO"
// import dynamic from "next/dynamic"

// const RegisterDoc = dynamic(
//   () => import("./../components/Register/Doctor/index"),
//   { ssr: false }
// )

const RegisterDocPage = () => (
  <>
    <SEO
      title="Now Hiring Doctors! | Medtech Africa"
      desc="Register as a Paid or Volunteer Doctor"
      canonical="/sign-up"
    />
    <Layout>
      <div
      // className={classes.pageHeader}
      // style={{
      //   backgroundImage: "url(/vector5.svg)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "top center",
      // }}
      >
        {/* <div className={classes.container}> */}
        <RegisterDoc />
        {/* </div> */}
      </div>
    </Layout>
  </>
)

export default RegisterDocPage
