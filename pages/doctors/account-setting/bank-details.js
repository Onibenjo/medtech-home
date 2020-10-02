import AccountDetails from "components/DoctorWallet/Withdrawal/AccountDetails"
import { getDocLayout } from "components/Account/AccountLayout"

const BankDetailPage = () => {
  return (
    <>
      <AccountDetails />
    </>
  )
}

BankDetailPage.getLayout = getDocLayout
export default BankDetailPage
