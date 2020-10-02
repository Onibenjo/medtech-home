import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import PatientUpload from "../../components/PatientUpload/PatientUpload"

const PatientUploadPage = () => {
  return <PatientUpload />
}

PatientUploadPage.getLayout = getSiteLayout
export default PatientUploadPage
