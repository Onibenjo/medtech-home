// import { useState, useEffect } from "react"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import * as legoData from "./lego-loader.json"
import * as doneData from "./checked-done.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const Loading = ({ loading, title }) => {
  // const [state, setState] = useState({
  //   loading: undefined,
  //   done: undefined,
  // })

  // useEffect(() => {
  //   if (!loading) {
  //     setTimeout(() => {
  //       setState({ ...state, done: true })
  //     }, 1000)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading])

  return (
    <>
      <div className="container">
        {/* {!state.done && ( */}
        <FadeIn>
          <div className="d-flex">
            <h3>{title || "Loading"}</h3>
            {loading ? (
              <Lottie
                options={defaultOptions}
                height={120}
                width={120}
                style={{ margin: 0 }}
              />
            ) : (
              <Lottie
                options={defaultOptions2}
                height={120}
                width={120}
                style={{ margin: 0 }}
              />
            )}
          </div>
        </FadeIn>
        {/* )} */}
      </div>
      <style jsx>{`
        .d-flex {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>
    </>
  )
}

export default Loading
