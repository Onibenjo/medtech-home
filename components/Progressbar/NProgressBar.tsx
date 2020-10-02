import React, { useEffect, useRef, useCallback } from "react"
import NProgress from "nprogress"
import Router from "next/router"
// import * as gtag from "utils/lib/gtag"
// import isProd from "utils/lib/isProd"

// gtag.event({
//   action: 'submit_form',
//   category: 'Contact',
//   label: this.state.message,
// })
const NextNProgress = ({
  color = "#29D",
  startPosition = 0.1,
  stopDelayMs = 100,
  height = 3,
}) => {
  const timerRef = useRef<NodeJS.Timeout | undefined>()
  const options = {
    color,
    startPosition,
    stopDelayMs,
    height,
  }

  // let timer

  const cancel = useCallback(() => {
    const timeoutId = timerRef.current
    if (timeoutId) {
      timerRef.current = undefined
      clearTimeout(timeoutId)
    }
  }, [timerRef])

  const routeChangeStart = () => {
    NProgress.set(options.startPosition)
    NProgress.start()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routeChangeEnd = (url) => {
    // clearTimeout(timer)
    cancel()
    // if (isProd) {
    //   gtag.pageview(url)
    // }
    timerRef.current = setTimeout(() => {
      // timer = setTimeout(() => {
      NProgress.done(true)
    }, options.stopDelayMs)
  }
  useEffect(() => {
    if (options) {
      NProgress.configure(options)
    }

    Router.events.on("routeChangeStart", routeChangeStart)
    Router.events.on("routeChangeComplete", routeChangeEnd)
    Router.events.on("routeChangeError", routeChangeEnd)
    // cleanup
    return () => {
      Router.events.off("routeChangeStart", routeChangeStart)
      Router.events.off("routeChangeComplete", routeChangeEnd)
      Router.events.off("routeChangeError", routeChangeEnd)
      cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const { color, height } = options

  return (
    <style jsx global>
      {`
        #nprogress {
          pointer-events: none;
          z-index: 9999;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 9998;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: "block";
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;
          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  )
}

export default NextNProgress

// 30 seconds of code uses cookies to provide a high quality user experience and gather anonymized data for statistical analysis of the website's traffic.You can learn more by reading our cookie policy.
// By clicking "Accept" you accept their installation.
