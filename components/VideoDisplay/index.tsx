import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
// import Head from "next/head"
import useTwilioVideo from "hooks/useTwilioVideo/useTwilioVideo"
// import { MdCallEnd, MdVolumeMute, MdEdit } from "react-icons/md"
// import IconButton from "@material-ui/core/IconButton"
// import Fade from "@material-ui/core/Fade"
// import useHeight from "hooks/useHeight/useHeight"
// import CountDown from "components/CountDown"
// import Controls from "components/Controls/Controls"
// import ReconnectingNotification from "../ReconnectingNotification/ReconnectingNotification"
import Room from "../Room/Room"

const VideoDisplay = ({ roomID, user, handleOpen }) => {
  const router = useRouter()
  const {
    token,
    // videoRef,
    activeRoom,
    startVideo,
    leaveRoom,
  } = useTwilioVideo()
  const [appear, setAppear] = useState(true)

  // const height = useHeight()

  useEffect(() => {
    setTimeout(() => {
      setAppear(false)
    }, 3000)
  }, [appear])

  useEffect(() => {
    if (!roomID) {
      router.push("/app")
    }

    if (!token) {
      router.push("/app")
    }

    // Add a window listener to disconnect if the tab is closed. This works
    // around a looooong lag before Twilio catches that the video is gone.
    window.addEventListener("beforeunload", leaveRoom)

    return () => {
      window.removeEventListener("beforeunload", leaveRoom)
    }
  }, [token, roomID, activeRoom, startVideo, leaveRoom, router])

  // const endCall = () => {
  //   leaveRoom()
  //   handleOpen()
  // }

  return <Room isDoctor={false} />

  // return (
  //   <div onMouseMove={() => setAppear(true)} className="pos-rel">
  //     {activeRoom && (
  //       <>
  //         <div className="counter-container">
  //           {/* {wallet.balance && ( */}
  //           <CountDown />
  //           {/* )} */}
  //         </div>
  //         {/* // <Fade in={appear}> */}
  //         <div>
  //           {/* <div className="actionbuttons">

  //           </div> */}

  //           <Controls />
  //           <ReconnectingNotification />
  //         </div>
  //         {/* // </Fade> */}
  //       </>
  //     )}
  //     {/* {activeRoom && appear && (
  //       <Fade in={appear}>
  //         <div>
  //           {/* <div className="actionbuttons">
  //             <IconButton
  //               edge="start"
  //               color="inherit"
  //               className="leave-room"
  //               onClick={endCall}
  //               aria-label="close"
  //               style={{ backgroundColor: "red" }}
  //             >
  //               <MdCallEnd style={{ color: "#fff" }} />
  //             </IconButton>
  //             <IconButton
  //               edge="start"
  //               color="inherit"
  //               aria-label="close"
  //               style={{ backgroundColor: "#fff", marginLeft: 16 }}
  //             >
  //               <MdVolumeMute style={{ color: "#00a8e1" }} />
  //             </IconButton>
  //           </div>
  //            <Controls />
  //         </div>
  //       </Fade>
  //     )} */}

  //     <div className="chat" ref={videoRef} style={{ height }} />
  //     <style global jsx>{`
  //       .pos-rel {
  //         position: relative;
  //         max-height: 100vh;
  //         background: #000;
  //         max-width: 100vw;
  //       }
  //       .chat {
  //         // height: 100vh;
  //         position: relative;
  //       }
  //       .chat > .local-video {
  //         width: 100%;
  //         position: absolute;
  //         border-radius: 10px;
  //         max-width: 30%;
  //         bottom: 8px;
  //         right: 8px;
  //         z-index: 4;
  //       }
  //       .remote-participant {
  //         height: 100%;
  //         width: 100%;
  //         position: relative;
  //         background: #000;
  //       }
  //       .remote-participant > video {
  //         height: 100%;
  //         position: absolute;
  //         top: 0;
  //         width: 100%;
  //       }
  //       .remote-participant > h4 {
  //         position: absolute;
  //         display: none;
  //       }
  //       .actionbuttons {
  //         position: absolute;
  //         bottom: 32px;
  //         right: 0;
  //         left: 0;
  //         display: flex;
  //         justify-content: center;
  //         z-index: 222;
  //       }
  //       .counter-container {
  //         padding: 0 32px;
  //         position: absolute;
  //         top: 32px;
  //       }
  //     `}</style>
  //   </div>
  // )
}

export default VideoDisplay
