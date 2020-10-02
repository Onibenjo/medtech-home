import DoctorAppointment from "components/Appointment/DoctorAppointment"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"

const Appointment = () => {
  return <DoctorAppointment />
}

Appointment.getLayout = getSiteLayout
export default Appointment
