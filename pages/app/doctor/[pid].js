import React from "react"
import DoctorDetails from "components/DoctorDetails"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"
import { useRouter } from "next/router"

const MyPatient = () => {
  const router = useRouter()
  const { pid } = router.query
  return <DoctorDetails id={pid} />
}
MyPatient.getLayout = getSiteLayout
export default MyPatient
