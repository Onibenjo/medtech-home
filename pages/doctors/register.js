import React, { useState } from "react"
import Head from "next/head"
import { makeStyles } from "@material-ui/core/styles"
import styles from "../../styles/RegisterStyle"
import Layout from "../../components/Layout/Layout"
import RegisterDoc1 from "../../components/Register/RegisterDoc1"

const useStyles = makeStyles(styles)

const RegisterDoctor = () => {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>Register | Medtech Africa</title>
      </Head>
      <Layout>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(/vector5.svg)",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <RegisterDoc1 />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default RegisterDoctor
