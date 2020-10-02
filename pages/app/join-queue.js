import React from "react"
import JoinQueueList from "components/JoinQueueList"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const JoinQueue = () => {
  return <JoinQueueList />
}

JoinQueue.getLayout = getSiteLayout

export default JoinQueue
