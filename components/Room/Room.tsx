import React from "react"
import { styled } from "@material-ui/core/styles"
import Controls from "components/Controls/Controls"
import useParticipants from "hooks/useParticipants/useParticipants"
import useVideoContext from "hooks/useVideoContext/useVideoContext"

import useRoomState from "hooks/useRoomState/useRoomState"
import MenuBar from "components/MenuBar/MenuBar"
import ReconnectingNotification from "components/ReconnectingNotification/ReconnectingNotification"
import useHeight from "hooks/useHeight/useHeight"
import ParticipantTracks from "components/ParticipantTracks/ParticipantTracks"
import Participant from "./Participant"
import LocalVideoPreview from "../LocalVideoPreview"
import DoctorNote from "./DoctorNote"
import NoteButton from "./NoteButton"
import MainParticipant from "./MainParticipantInfo"

const Main = styled("main")({
  overflow: "hidden",
})
const Container = styled("div")(({ theme }) => ({
  position: "relative",
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
  gridTemplateAreas: '". participantList"',
  gridTemplateRows: "100%",
  [theme.breakpoints.down("xs")]: {
    gridTemplateAreas: '"participantList" "."',
    gridTemplateColumns: `auto`,
    gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${
      theme.sidebarMobileHeight + 6
    }px`,
    gridGap: "6px",
  },
}))

const MainContainer = styled("div")({
  display: "grid",
  gridTemplateRows: "auto 1fr",
})

const Container2 = styled("aside")(({ theme }) => ({
  padding: "0.5em",
  overflowY: "auto",
  [theme.breakpoints.down("xs")]: {
    overflowY: "initial",
    overflowX: "auto",
    padding: 0,
    display: "flex",
  },
}))

const ScrollContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    display: "flex",
  },
}))

export default function Room({ isDoctor }) {
  const roomState = useRoomState()
  const height = useHeight()

  return (
    // <VideoProvider options={connectionOptions} onError={setError}>
    // <ErrorDialog dismissError={() => setError(null)} error={error} />
    <MainContainer style={{ height }}>
      <MenuBar />
      <Main>
        {roomState === "disconnected" ? (
          <LocalVideoPreview />
        ) : (
          <MainRoom isDoctor={isDoctor} />
        )}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </MainContainer>
    // </VideoProvider>
  )
}

const MainRoom = ({ isDoctor }) => {
  const {
    room: { localParticipant },
  } = useVideoContext()
  const participants = useParticipants()
  const [addNote, setAddNote] = React.useState(false)
  return (
    <Container>
      {isDoctor && <NoteButton setAddNote={setAddNote} addNote={addNote} />}
      <Container2>
        <ScrollContainer>
          <Participant participant={localParticipant} />
        </ScrollContainer>
      </Container2>
      {participants.map((participant) => (
        <MainParticipant participant={participant} key={participant.sid}>
          <ParticipantTracks participant={participant} />
        </MainParticipant>
      ))}
      {addNote && <DoctorNote />}
    </Container>
  )
}
