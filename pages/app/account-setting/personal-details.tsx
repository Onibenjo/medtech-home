import { getLayout } from "components/Account/AccountLayout"
import Profile from "components/Profile"

const PersonalDetailsPage = () => {
  return <Profile />
}

PersonalDetailsPage.getLayout = getLayout
export default PersonalDetailsPage
