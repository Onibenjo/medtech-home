import { getLayout } from "components/Account/AccountLayout"
import Medical_info from "components/medical/Medical_info"

const medicalPage = () => {
  return (
    // <Dashboard title="Home > Profile > Medical In.">
    <Medical_info />
    // </Dashboard>
  )
}

medicalPage.getLayout = getLayout
export default medicalPage
