import PatientView from "components/MyPatient/PatientView"
import { useRouter } from "next/router"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"

const MyPatient = () => {
  const router = useRouter()
  const { pid } = router.query
  return <PatientView id={pid} />
}
MyPatient.getLayout = getSiteLayout
export default MyPatient
