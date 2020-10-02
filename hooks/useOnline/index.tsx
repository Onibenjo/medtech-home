import React from "react"
// import { db } from "utils/lib/firebase"

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true

const useNavigatorOnLine = () => {
  const [status, setStatus] = React.useState<boolean>(getOnLineStatus())

  const setOnline = () => setStatus(true)
  const setOffline = () => setStatus(false)

  React.useEffect(() => {
    window.addEventListener("online", setOnline)
    window.addEventListener("offline", setOffline)

    return () => {
      window.removeEventListener("online", setOnline)
      window.removeEventListener("offline", setOffline)
    }
  }, [])

  return [status]
}

export default useNavigatorOnLine
