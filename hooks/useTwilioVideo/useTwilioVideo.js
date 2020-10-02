import React, { createContext, useContext, useReducer, useRef } from "react"
import { connect, createLocalVideoTrack } from "twilio-video"
import useLocalTracks from "components/VideoProvider/useLocalTracks/useLocalTracks"
import useRoom from "components/VideoProvider/useRoom/useRoom"
import fetchWithToken from "utils/lib/fetch"

const initialContext = {
  identity: false,
  room: false,
  token: false,
  activeRoom: false,
}

const reducer = (store, action) => {
  switch (action.type) {
    case "join":
      return {
        ...store,
        token: action.token,
        room: action.room,
        identity: action.identity,
      }

    case "set-active-room":
      return {
        ...store,
        activeRoom: action.activeRoom,
      }

    case "disconnect":
      store.activeRoom && store.activeRoom.disconnect()
      return initialContext

    default:
      console.error(`Unknown action type: ${action.type}`)
      return store
  }
}

export const TwilioVideoContext = createContext(null)

export const TwilioVideoProvider = ({ children, onError = () => null }) => {
  const onErrorCallback = (error) => {
    console.log(`ERROR: ${error.message}`, error)
    onError(error)
  }
  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalVideoTrack,
  } = useLocalTracks()
  const { room, isConnecting, connect: connect2 } = useRoom(
    localTracks,
    onErrorCallback,
    {
      // name: room,
      audio: true,
      video: { width: 640 },
      logLevel: "info",
    }
  )
  const [store, dispatch] = useReducer(reducer, initialContext)
  return (
    <TwilioVideoContext.Provider
      value={{
        store,
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        room,
        isConnecting,
        connect2,
        dispatch,
      }}
    >
      {children}
    </TwilioVideoContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <TwilioVideoProvider>{element}</TwilioVideoProvider>
)

const handleRemoteParticipant = (container) => (participant) => {
  const id = participant.sid

  const addTrack = (track) => {
    const container = document.getElementById(id)

    // Create an HTML element to show the track (e.g. <audio> or <video>).
    const media = track.attach()

    container.appendChild(media)
  }

  const el = document.createElement("div")
  el.id = id
  el.className = "remote-participant"

  const name = document.createElement("h4")
  name.innerText = participant.identity
  el.appendChild(name)

  // Attach the new element to the DOM.
  container.appendChild(el)

  // Attach existing participant audio and video tracks to the DOM.
  participant.tracks.forEach((publication) => {
    if (publication.isSubscribed) {
      addTrack(publication.track)
    }
  })

  // If new tracks get added later, add those, too.
  participant.on("trackSubscribed", addTrack)

  // When tracks are no longer available, remove the elements displaying them.
  participant.on("trackUnsubscribed", (track) => {
    // Get a list of elements from detach and remove them from the DOM.
    track.detach().forEach((ele) => ele.remove())
    const containerToRemove = document.getElementById(id)
    if (containerToRemove) containerToRemove.remove()
  })
}

const useTwilioVideo = () => {
  const { store, dispatch, connect2, room: createdActiveRoom } = useContext(
    TwilioVideoContext
  )
  const videoRef = useRef(null)
  const { room, token, activeRoom } = store

  const getParticipantToken = async ({ identity, room: roomTosend }) => {
    const result = await fetchWithToken("/user/get-token", {
      body: {
        identity,
        room: roomTosend,
      },
    })
    // const result = await fetchWithToken("/user/get-token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   mode: "cors",
    //   body: JSON.stringify({
    //     identity,
    //     room,
    //   }),
    // }).then((res) => res.json())

    dispatch({
      type: "join",
      token: result.data,
      identity,
      room,
    })
  }

  const connectToRoom = async () => {
    if (!token) {
      console.log("no token to connect")
      return
    }

    // Connect to the appropriate Twilio video chat room.
    // const activeRoom = await connect(token, {
    //   name: room,
    //   audio: true,
    //   video: { width: 640 },
    //   logLevel: "info",
    // }).catch((error) => {
    //   console.error(`Unable to join the room: ${error.message}`)
    // })
    await connect2(token)

    // console.log({ activeRoom })
    dispatch({ type: "set-active-room", activeRoom: createdActiveRoom })
    return false
    // // Add your own video and audio tracks so you can see yourself.
    // const localTrack = await createLocalVideoTrack().catch((error) => {
    //   console.error(`Unable to create local tracks: ${error.message}`)
    // })

    // // Attach the local video if it’s not already visible.
    // if (!videoRef.current.hasChildNodes()) {
    //   const localEl = localTrack.attach()
    //   localEl.className = "local-video"

    //   videoRef.current.appendChild(localEl)
    // }

    // // Currying! Delicious! 🍛
    // const handleParticipant = handleRemoteParticipant(videoRef.current)

    // // Handle any participants who are *already* connected to this room.
    // createdActiveRoom.participants.forEach(handleParticipant)

    // // Handle participants who join *after* you’ve connected to the room.
    // createdActiveRoom.on("participantConnected", handleParticipant)

    // dispatch({ type: "set-active-room", activeRoom: createdActiveRoom })
  }

  const startVideo = () => connectToRoom()
  const leaveRoom = () => createdActiveRoom.disconnect() // dispatch({ type: "disconnect" })

  return {
    ...store,
    getParticipantToken,
    startVideo,
    leaveRoom,
    activeRoom,
    room,
    token,
    videoRef,
  }
}

export default useTwilioVideo
