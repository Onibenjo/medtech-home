// import { useState, useEffect } from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import * as legoData from "./json/check-animation.json"
import * as checkmark from "./json/checkmark-burst.json"
// import * as checkmark from "./json/checked-done.json"
import L2 from "./index2"

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: checkmark.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const LoadingCheck = ({ loading, size = 120 }) => {
  return (
    <FadeIn>
      {loading ? (
        <L2
          options={defaultOptions}
          height={size}
          width={size}
          style={{ margin: 0 }}
          size={size}
        />
      ) : (
        <Lottie
          options={defaultOptions}
          height={size}
          width={size}
          style={{ margin: 0 }}
        />
      )}
    </FadeIn>
  )
}

export default LoadingCheck
