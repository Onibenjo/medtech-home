import React from "react"
import { styled } from "@material-ui/core/styles"

// import Controls from "components/Controls/Controls";
import { ConnectOptions } from "twilio-video"
import LocalVideoPreview from "../../components/LocalVideoPreview"
// import MenuBar from "../../components/MenuBar/MenuBar";
import ReconnectingNotification from "../../components/ReconnectingNotification/ReconnectingNotification"
// import Room from "../../components/Room/Room";
import useRoomState from "../../hooks/useRoomState/useRoomState"
import ErrorDialog from "../../components/ErrorDialog/ErrorDialog"
import VideoInterface from "../../components/VideoInterface"

const Main = styled("main")({
  overflow: "hidden",
})

// See: https://media.twiliocdn.com/sdk/js/video/releases/2.0.0/docs/global.html#ConnectOptions
// for available connection options.
const connectionOptions: ConnectOptions = {
  // bandwidthProfile: {
  //   video: {
  //     mode: "collaboration",
  //     dominantSpeakerPriority: "standard",
  //     renderDimensions: {
  //       high: { height: 1080, width: 1920 },
  //       standard: { height: 720, width: 1280 },
  //       low: { height: 90, width: 160 },
  //     },
  //   },
  // },
  bandwidthProfile: {
    video: {
      mode: "grid",
      maxTracks: 10,
      renderDimensions: {
        high: { height: 1080, width: 1980 },
        standard: { height: 720, width: 1280 },
        low: { height: 176, width: 144 },
      },
    },
  },
  audio: true,
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: "VP8", simulcast: false }],
}

export default function App() {
  return (
    // <VideoProvider options={connectionOptions} onError={setError}>
    // <ErrorDialog dismissError={() => setError(null)} error={error} />
    <Main>
      {/* {roomState === "disconnected" ? <LocalVideoPreview /> : <Room />} */}
      {/* {roomState === "disconnected" ? <LocalVideoPreview /> : null} */}
      {/* <Controls /> */}
      {/* <VideoInterface /> */}
    </Main>
    // <ReconnectingNotification />
    // </VideoProvider>
  )
}
