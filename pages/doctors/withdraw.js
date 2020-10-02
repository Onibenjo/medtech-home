import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import DoctorWithdrawal from "components/DoctorWallet/Withdrawal"

const MyWallet = () => {
  return <DoctorWithdrawal />
}
MyWallet.getLayout = getSiteLayout
export default MyWallet
