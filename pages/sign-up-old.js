import React from "react"
import SEO from "components/SEO"
import { makeStyles } from "@material-ui/core/styles"
import styles from "styles/RegisterStyle"
import Layout from "components/Layout/Layout"
import RegisterDoc1 from "components/Register/RegisterDoc1"

const useStyles = makeStyles(styles)

const RegisterDoctor = () => {
  const classes = useStyles()
  return (
    <>
      <SEO
        title="Now Hiring Doctors! | Medtech Africa"
        desc="Register as a Paid or Volunteer Doctor"
        canonical="/sign-up"
      />
      <Layout>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(/vector5.svg)",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {/* <div className={classes.container}> */}
          <RegisterDoc1 />
          {/* </div> */}
        </div>
      </Layout>
    </>
  )
}

export default RegisterDoctor
