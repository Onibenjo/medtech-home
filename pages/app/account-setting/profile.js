// import Profile from "components/Profile";
import dynamic from "next/dynamic"
import { getLayout } from "components/Account/AccountLayout"

const Profile = dynamic(() => import("components/Profile"), { ssr: false })

const ProfilePage = () => {
  return <Profile />
}

ProfilePage.getLayout = getLayout
export default ProfilePage
