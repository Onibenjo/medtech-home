import React from "react"
import Smart from "components/Smart"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const smartMot = () => {
  return <Smart />
}

smartMot.getLayout = getSiteLayout
export default smartMot
