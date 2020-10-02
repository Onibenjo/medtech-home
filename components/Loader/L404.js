// import { useState, useEffect } from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import * as p404 from "./json/404-page.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: p404.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const L404 = () => {
  return (
    <>
      <FadeIn>
        <div className="d-flex">
          <Lottie
            options={defaultOptions}
            height={120}
            width={120}
            style={{ margin: 0 }}
          />
        </div>
      </FadeIn>
      <style jsx>{`
        .d-flex {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100%;
        }
      `}</style>
    </>
  )
}

export default L404
