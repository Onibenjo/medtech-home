import Profile from "components/Profile/DoctorProfile"
import { getDocLayout } from "components/Account/AccountLayout"

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  )
}

ProfilePage.getLayout = getDocLayout
export default ProfilePage
