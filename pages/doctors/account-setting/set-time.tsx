import SetTime from "components/Appointment/SetTime"
import { getDocLayout as getSiteLayout } from "components/Account/AccountLayout"

const SetTimePage = () => <SetTime />

SetTimePage.getLayout = getSiteLayout
export default SetTimePage
