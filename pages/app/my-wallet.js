import PatientWallet from "components/PatientWallet"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const MyWallet = () => {
  return <PatientWallet />
}

MyWallet.getLayout = getSiteLayout
export default MyWallet
