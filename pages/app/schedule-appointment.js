import ScheduleAppointment from "components/Appointment/ScheduleAppointment"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"
import { useRouter } from "next/router"

const SchedulePage = () => {
  const router = useRouter()
  const { id } = router.query

  return <ScheduleAppointment id={id} />
}

SchedulePage.getLayout = getSiteLayout
export default SchedulePage
