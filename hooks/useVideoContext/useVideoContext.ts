import { useContext } from "react"
import { TwilioVideoContext } from "../useTwilioVideo/useTwilioVideo"
// import { VideoContext } from "../../components/VideoProvider"

export default function useVideoContext() {
  // const context = useContext(VideoContext)
  const context = useContext(TwilioVideoContext)
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider")
  }
  return context
}
