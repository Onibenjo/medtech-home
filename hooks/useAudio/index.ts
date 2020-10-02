import { useState, useEffect, useCallback } from "react"

const useAudio = (url, options = { loop: false }) => {
  const [audio] = useState(() => {
    if (typeof window === "undefined") return null
    return new Audio(url)
  })
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying((prev) => !prev)
  const play = useCallback(() => {
    if (audio) {
      audio.play()
      audio.loop = options.loop
      toggle()
    }
  }, [audio, options.loop])

  const pause = useCallback(() => {
    if (audio) {
      audio.pause()
      setPlaying(false)
    }
  }, [audio])

  useEffect(() => {
    // playing ? audio.play() : audio.pause()
    if (playing) {
      if (audio) audio.play()
      return
    }
    if (audio) {
      audio.pause()
      // audio.loop = false
    }
  }, [audio, playing])

  return { play, playing, toggle, pause }
}

export default useAudio
