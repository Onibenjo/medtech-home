import dynamic from "next/dynamic"
import { AuthWrapper } from "components/Login"
// import { getLayout as getSiteLayout } from "components/Dashboard/Patient";

const Room2 = dynamic(() => import("components/Room/Room2"), { ssr: false })

function RoomPage() {
  return <Room2 />
}

// RoomPage.getLayout = AuthWrapper
export default AuthWrapper(RoomPage)
