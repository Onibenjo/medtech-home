import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import PatientHealthTracker from "../../components/patientHealthTracker/PatientHealthTracker"

const PatientHealthTrackerPage = () => {
  return <PatientHealthTracker />
}

PatientHealthTrackerPage.getLayout = getSiteLayout
export default PatientHealthTrackerPage
