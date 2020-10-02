import { useEffect, useState } from "react"

export default function useHeight() {
  const [visible, setVisible] = useState(document.hidden)

  useEffect(() => {
    const onChange = () => {
      setVisible(document.hidden)
    }

    window.addEventListener("visibilitychange", onChange)
    return () => {
      window.removeEventListener("visibilitychange", onChange)
    }
  })

  return !visible
}
