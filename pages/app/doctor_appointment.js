import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"
import DoctorAppointment from "components/Appointment/DoctorAppointment"

const DoctorAppointmentPage = () => {
  return <DoctorAppointment />
}

DoctorAppointmentPage.getLayout = getSiteLayout
export default DoctorAppointmentPage
