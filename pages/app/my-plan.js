import Plan from "components/MyPlan"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const MyPlan = () => {
  return <Plan />
}

MyPlan.getLayout = getSiteLayout
export default MyPlan
