import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import DoctorWallet from "../../components/DoctorWallet"

const MyWallet = () => {
  return <DoctorWallet />
}
MyWallet.getLayout = getSiteLayout
export default MyWallet
