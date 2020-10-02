import React from "react"
import SeeDoctor from "components/SeeDoctor/SeeDoctor"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const SeeDoctorPage = () => {
  return <SeeDoctor />
}

SeeDoctorPage.getLayout = getSiteLayout
export default SeeDoctorPage
