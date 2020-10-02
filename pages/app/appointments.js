import ScheduleAppointment from "components/Appointment/ScheduleAppointment"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const SchedulePage = () => {
  return <ScheduleAppointment />
}

SchedulePage.getLayout = getSiteLayout
export default SchedulePage
