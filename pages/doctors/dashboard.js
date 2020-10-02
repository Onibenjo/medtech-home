import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import DoctorDashboardHome from "../../components/Dashboard/DoctorHome"

const DashboardPage = () => {
  return <DoctorDashboardHome />
}

DashboardPage.getLayout = getSiteLayout
export default DashboardPage
