import dynamic from "next/dynamic"
import { AuthWrapper } from "components/Login"

const DoctorRoom2 = dynamic(() => import("components/Room/DoctorRoom2"), {
  ssr: false,
})

const RoomPage = () => {
  return <DoctorRoom2 />
}
export default AuthWrapper(RoomPage)
