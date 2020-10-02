import React from "react"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
import PreviousRecords from "../../components/PreviousRecords"

const PrevVitalRecords = () => {
  return <PreviousRecords />
}

PrevVitalRecords.getLayout = getSiteLayout
export default PrevVitalRecords
