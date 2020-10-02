import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import RecentVitalSigns from "../../components/MyPatient/RecentVitalSigns"

const RecentVital = () => {
  return <RecentVitalSigns />
}
RecentVital.getLayout = getSiteLayout
export default RecentVital
