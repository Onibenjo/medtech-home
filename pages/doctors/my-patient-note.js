import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import PatientNote from "../../components/PatientNote/index"

const MyPatient = () => {
  return <PatientNote />
}
MyPatient.getLayout = getSiteLayout
export default MyPatient
