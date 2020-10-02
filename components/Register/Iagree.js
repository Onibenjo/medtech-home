import React from "react"
import Checkbox from "@material-ui/core/Checkbox"

const Iagree = ({ setOpen, setAgree, agree }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox color="secondary" onChange={() => setAgree(!agree)} />
      <p
        component="p"
        variant="body1"
        align="left"
        style={{ flex: 3, fontSize: "1rem" }}
      >
        I consent to share my information with Medtech Africa for credentialing
        and agree to the{" "}
        <span
          role="link"
          style={{ cursor: "pointer", color: "purple" }}
          onClick={() => {
            setOpen(true)
          }}
        >
          Terms and Conditions.
        </span>
      </p>
    </div>
  )
}
export default Iagree
