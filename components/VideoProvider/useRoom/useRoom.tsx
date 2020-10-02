import * as EventEmitter from "events"
import isMobile from "utils/lib/isMobile"
import Video, { ConnectOptions, LocalTrack, Room } from "twilio-video"
import { useCallback, useEffect, useRef, useState } from "react"
import { Callback } from "../../../types"

// @ts-ignore
window.TwilioVideo = Video

export default function useRoom(
  localTracks: LocalTrack[],
  onError: Callback,
  options?: ConnectOptions
) {
  // //@ts-ignore
  const [room, setRoom] = useState<Room>(
    new EventEmitter.EventEmitter() as Room
  )
  const [isConnecting, setIsConnecting] = useState(false)
  const localTracksRef = useRef<LocalTrack[]>([])

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks
  }, [localTracks])

  const connect = useCallback(
    (token) => {
      setIsConnecting(true)
      return Video.connect(token, {
        ...options,
        tracks: localTracksRef.current,
      }).then(
        (newRoom) => {
          setRoom(newRoom)
          const disconnect = () => newRoom.disconnect()

          newRoom.once("disconnected", () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            // // @ts-ignore
            setTimeout(() => setRoom(new EventEmitter.EventEmitter() as Room))
            window.removeEventListener("beforeunload", disconnect)

            if (isMobile) {
              window.removeEventListener("pagehide", disconnect)
            }
          })

          // @ts-ignore
          window.twilioRoom = newRoom

          // localTracksRef.current.forEach((track) =>
          //   newRoom.localParticipant.publishTrack(track, {
          //     priority: track.kind === "video" ? "low" : "standard",
          //   })
          // )

          setIsConnecting(false)

          // Add a listener to disconnect from the room when a user closes their browser
          window.addEventListener("beforeunload", disconnect)

          if (isMobile) {
            // Add a listener to disconnect from the room when a mobile user closes their browser
            window.addEventListener("pagehide", disconnect)
          }
        },
        (error) => {
          onError(error)
          setIsConnecting(false)
        }
      )
    },
    [options, onError]
  )

  return { room, isConnecting, connect }
}