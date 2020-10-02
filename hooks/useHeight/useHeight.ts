import { useEffect, useState } from "react"

export default function useHeight() {
  const [height, setHeight] = useState<null | number>(null)

  useEffect(() => {
    if (!height) setHeight(window.innerHeight)
    const onResize = () => {
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  })

  return `${height}px`
}
