import React from "react"
import Record from "components/MyRecord"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const MyRecord = () => {
  return <Record />
}

MyRecord.getLayout = getSiteLayout

export default MyRecord
