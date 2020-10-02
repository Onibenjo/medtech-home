import React from "react"
import { styled } from "@material-ui/core"

import { MdErrorOutline } from "react-icons/md"

const BandwidthWarningContainer = styled("div")({
  position: "absolute",
  zIndex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const Warning = styled("h3")({
  textAlign: "center",
  margin: "0.6em 0",
})

export default function BandwidthWarning() {
  return (
    <BandwidthWarningContainer>
      <div>
        <MdErrorOutline fontSize="large" />
      </div>
      <Warning>Insufficient Bandwidth</Warning>
    </BandwidthWarningContainer>
  )
}
