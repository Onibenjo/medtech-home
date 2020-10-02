import React, { useState, useEffect, useRef } from "react"
import Video, { createLocalVideoTrack, ConnectOptions } from "twilio-video"

import Head from "next/head"

const VideoPage = () => {
  const [identity, setIdentity] = useState(null)
  const [token, setToken] = useState(null)
  const [roomName, setRoomName] = useState("mta")
  const [previewTracks, setPreviewTracks] = useState(null)
  const [localMediaAvailable, setLocalMediaAvailable] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [peerIdentity, setPeerIdentity] = useState(false)
  const localMedia = useRef(null)
  const remoteMedia = useRef(null)

  // Get token from the API-Gateway
  useEffect(() => {
    createLocalVideoTrack().then((track) => {
      localMedia.current.appendChild(track.attach())
    })
    fetch("https://emerald-moose-2587.twil.io/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        identity: "benjo",
        room: "medtech",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const { identity, token } = response
        setIdentity(identity)
        setToken(token)
      })
      .catch((err) => console.log(err))
    console.log({ localMedia, remoteMedia })
  }, [])
  // function to start video call when user clicks start button
  const start = () => {
    const options = {
      name: roomName,
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
      maxAudioBitrate: 12000,
      networkQuality: { local: 1, remote: 1 },
      preferredVideoCodecs: [{ codec: "VP8", simulcast: false }],
    }

    if (previewTracks) {
      options.tracks = previewTracks
    }
    // To initialize connection to twilio
    Video.connect(token, options).then(connected, (error) => {
      console.error(error.message)
    })
  }
  // Add your video track

  const addTracks = (tracks, container) => {
    console.log({ tracks })
    tracks.forEach((track) => {
      console.log("track subscribed", track.isSubscribed)
      // if (track.isSubscribed) {
      //   const track = track.track;
      // }
      container.appendChild(track.attach())
    })
  }
  // Add participant video track
  const addParticipantTracks = (participant, container) => {
    const tracks = Array.from(participant.tracks.values())
    addTracks(tracks, container)
  }
  // After connection is success
  const connected = (room) => {
    setActiveRoom(room)
    setLocalMediaAvailable(true)
    setHasJoinedRoom(true)
    const previewContainer = localMedia.current
    // Note: Twilio reasponse will give video object
    console.log(previewContainer.querySelector("video"))
    if (!previewContainer.querySelector("video")) {
      addParticipantTracks(room.localParticipant, previewContainer)
    }
    // Following functions are called based on the actions
    room.participants.forEach((participant) => {
      const previewContainer = remoteMedia.current

      setPeerIdentity(participant.identity)

      addParticipantTracks(participant, previewContainer)
    })
    // When a Participant joins the Room, log the event.
    room.on("participantConnected", (participant) => {
      // do something
      console.log(`Participant "${participant.identity}" connected`)

      setPeerIdentity(participant.identity),
        // partnerConnected: true,

        // participant.tracks.forEach((publication) => {
        //   if (publication.isSubscribed) {
        //     const track = publication.track;
        //     remoteMedia.current.appendChild(track.attach());
        //   }
        // });
        addParticipantTracks(participant, remoteMedia.current)

      participant.on("trackSubscribed", (track) => {
        remoteMedia.current.appendChild(track.attach())
      })
    })
    room.once("disconnected", () => {
      // Reset the room only after all other `disconnected` listeners have been called.
      setTimeout(() => setActiveRoom(null))
    })

    // @ts-ignore
    window.twilioRoom = room
    // When a Participant adds a Track, attach it to the DOM.
    room.on("trackAdded", (track, participant) => {
      console.log({ track, participant })
      console.log(`${participant.identity} added track: ${track.kind}`)
      const previewContainer = remoteMedia.current
      addTracks([track], previewContainer)
    })
    // When a Participant removes a Track, detach it from the DOM.
    room.on("trackRemoved", (track, participant) => {
      console.log(`${participant.identity} removed track: ${track.kind}`)
      removeTracks([track])
    })
    // When a Participant leaves the Room, detach its Tracks.
    room.on("participantDisconnected", (participant) => {
      console.log(`Participant '${participant.identity}' left the room`)
      removeParticipantTracks(participant)
    })
    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      if (previewTracks) {
        previewTracks.forEach((track) => {
          track.stop()
        })
      }
      removeParticipantTracks(room.localParticipant)
      room.participants.forEach(removeParticipantTracks)
      setActiveRoom(null)
      setHasJoinedRoom(false)
      setLocalMediaAvailable(false)
    })
  }
  // Function called when user click end button
  const end = () => {
    activeRoom.disconnect()
    setHasJoinedRoom(false)
    setLocalMediaAvailable(false)
    setPeerIdentity(false)
  }
  // Removing local track
  const removeTracks = (tracks) => {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove()
      })
    })
  }
  // Removing participant's track
  const removeParticipantTracks = (participant) => {
    const tracks = Array.from(participant.tracks.values())
    removeTracks(tracks)
  }
  return (
    <>
      <Head>
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div ref={localMedia} />
                <div className="text-center">
                  {!hasJoinedRoom && <div> Loading</div>}
                </div>
              </div>
              <div className="card-footer">
                {hasJoinedRoom ? (
                  <button onClick={end} type="button">
                    {" "}
                    End{" "}
                  </button>
                ) : (
                  <button onClick={start} type="button">
                    {" "}
                    Start{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div ref={remoteMedia} />
                <div className="text-center">
                  {!peerIdentity && <div> Loading</div>}
                </div>
              </div>
              <div className="card-footer text-center">
                {!peerIdentity ? (
                  <span>Wait for peer user to connect channel !!!</span>
                ) : (
                  <span>Peer User Name :{`${peerIdentity}`}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default VideoPage
