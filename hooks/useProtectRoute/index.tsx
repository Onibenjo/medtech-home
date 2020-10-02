import { useEffect, useState } from "react"
import { useAuth } from "utils/use-auth"
import { useRouter } from "next/router"

interface Allow {
  pass: boolean
  route: string | null
}

const useProtectRoute = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [allow, setAllow] = useState<Allow>({
    pass: false,
    route: null,
  })

  useEffect(() => {
    // console.log("router")
    if (!user) {
      return
    }
    // const routeCheck = () => {
    if (user.type === "patient") {
      if (router.pathname.startsWith("/app")) {
        setAllow({ pass: true, route: "patients" })
        return
      }
      router.push("/app")
      // return
    }
    if (user.type === "doctor") {
      if (router.pathname.startsWith("/doctors")) {
        setAllow({ pass: true, route: "doctors" })
        return
      }
      router.push("/doctors")
    }
    if (user.type === "admin") {
      if (router.pathname.startsWith("/admin")) {
        setAllow({ pass: true, route: null })
        return
      }
      router.push("/admin")
    }
    // }
    // routeCheck()
    // nt-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router])
  return allow
}

export default useProtectRoute
