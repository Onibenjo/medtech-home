import SetTime from "components/Appointment/SetTime"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"

const SetTimePage = () => <SetTime />

SetTimePage.getLayout = getSiteLayout
export default SetTimePage
