/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react"
import ContentLoader from "react-content-loader"
import Head from "next/head"
import { makeStyles } from "@material-ui/core/styles"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import styles from "styles/DashboardStyle"
import firebase from "utils/auth/initFirebase"
import { useSnackbar, SnackbarProvider } from "notistack"
import useAudio from "hooks/useAudio"
import { useDocument } from "hooks/useDocument"
import { useAuth, ProtectRoute } from "utils/use-auth"
import { firebaseCloudMessaging } from "utils/webPush"
import { routes } from "paths"
import usePresence from "hooks/useOnline/usePresence"
import useProtectRoute from "hooks/useProtectRoute"
import Appbar from "./Appbar"
import Drawer from "./DashboardDrawer"
import BottomNavBar from "./BottomNavBar"

const useStyles = makeStyles(styles)
// f8f9fa

const ProvideAuth = dynamic(
  () => import("../../utils/use-auth").then((mod) => mod.ProvideAuth),
  {
    ssr: false,
  }
)

const IncomingCall = dynamic(() => import("components/Calls/Incoming"), {
  ssr: false,
})

// const Dashboard = React.memo(({ container, children, user, ...props }) => {
const Dashboard = ({ container, children, title }) => {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  // audio
  const { play } = useAudio("/audio/end_of_call.mp3")
  const audioRef = React.useRef()
  const [token, updateToken] = useState("")
  const allow = useProtectRoute()
  const [isOnline] = usePresence(allow)
  const router = useRouter()
  const { user, setUser } = useAuth()
  const classes = useStyles()
  // firebase user dat calls
  const { data: userDetails, loading } = useDocument(
    `${user.type}s/${user.uid}`
  )
  const { data: tokenDb, loading: lToken, set, update } = useDocument(
    token ? `${user.type}s/${user.uid}/devices/${token}` : null
  )
  const { data: accounts } = useDocument(
    `doctors/${user.uid}/private/bank_accounts`,
    {
      skip: !(user.type === "doctor" && user.service === "paid"),
    }
  )

  const [mobileOpen, setMobileOpen] = useState(false)
  const [callData, setCallData] = useState({})
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const keyRef = useRef(null)
  const updateUser = useCallback(() => {
    if (!loading) {
      setUser({ ...userDetails })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  // use effect hooks

  useEffect(() => {
    // on connection loss
    if (!isOnline) {
      keyRef.current = enqueueSnackbar("No internet connection!", {
        variant: "error",
        persist: !isOnline,
      })
    }
    // when we're back online
    if (isOnline && keyRef.current) {
      closeSnackbar(keyRef.current)
      enqueueSnackbar("You're back online", {
        variant: "success",
        autoHideDuration: 3000,
      })
    }
    if (!lToken && !tokenDb.exists) {
      set({
        token,
        active: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      return
    }
    if (!lToken && !tokenDb.active) {
      update({
        token,
        active: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, tokenDb])

  useEffect(() => {
    // console.log({ loading, loading2 })
    updateUser()
  }, [updateUser])
  // bottom navbar useeffect hook

  function getMessage() {
    firebase.messaging().onMessage((message, error, completed) => {
      console.log({ message, error, completed })
      const { data } = message
      const canVibrate = "vibrate" in navigator || "mozVibrate" in navigator

      if (canVibrate && !("vibrate" in navigator))
        navigator.vibrate =
          navigator.mozVibrate ||
          navigator.webkitVibrate ||
          navigator.mozVibrate ||
          navigator.msVibrate
      if (canVibrate) navigator.vibrate(2000)
      play()
      audioRef.current.play()

      if (data && data.type === "call") {
        if (data.status === "incoming") {
          setCallData(data)
          handleOpen()
          setTimeout(() => {
            if (!open) handleOpen()
          }, 20000)
        }

        return
      }
      if (message.notification)
        enqueueSnackbar(message.notification.body, {
          variant: "success",
        })
    })
  }
  async function setToken() {
    try {
      const tk = await firebaseCloudMessaging.init()
      if (tk) {
        updateToken(tk)
        getMessage()
      }
      const status = await Notification.requestPermission()
      if (status === "denied")
        enqueueSnackbar("Please enable notification and refresh!", {
          variant: "warning",
          // autoHideDuration: 10000,
          persist: true,
        })
      // if (token) {
      //   db.doc(`${user.type}s/${user.uid}/devices/${token}`).set({
      //     token,
      //     active: true,
      //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //   })
      //   getMessage()
      // }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
  useEffect(() => {
    if (user && allow.pass && allow.route) {
      if (process.browser) setToken()
    }
    if (user.type === "doctor" && user.service === "paid" && !accounts.exists) {
      enqueueSnackbar("Card details are required", {
        variant: "info",
        autoHideDuration: 10000,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allow), accounts])

  // if (user && allow.pass) {
  if (user) {
    return (
      <>
        <Head>
          <title>
            {routes[router.pathname] || "Dashboard"} | Medtech Africa
          </title>
        </Head>
        <div className={classes.root}>
          <Appbar handleDrawerToggle={handleDrawerToggle} />
          <Drawer
            container={container}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            // classes={classes}
          />
          <main className={classes.content}>
            {!allow.pass ? (
              <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                viewBox="0 0 600 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                // {...props}
              >
                <rect x="37" y="42" rx="0" ry="0" width="154" height="44" />
                <rect x="218" y="44" rx="0" ry="0" width="134" height="42" />
                <rect x="39" y="141" rx="0" ry="0" width="150" height="92" />
                <rect x="221" y="141" rx="0" ry="0" width="137" height="96" />
                <rect x="393" y="46" rx="0" ry="0" width="124" height="41" />
                <rect x="393" y="139" rx="0" ry="0" width="142" height="99" />
              </ContentLoader>
            ) : (
              <>
                <audio ref={audioRef}>
                  <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
                  <track kind="captions" />
                </audio>
                {children}
                <IncomingCall
                  open={open}
                  handleClose={handleClose}
                  {...callData}
                />
              </>
            )}
          </main>
          <BottomNavBar />
        </div>
      </>
    )
  }
  return null
}

export const getLayout2 = (page) => (
  <ProvideAuth>
    <Dashboard>{page}</Dashboard>
  </ProvideAuth>
)
export const getLayout1 = (page) => (
  <ProtectRoute>
    <Dashboard>{page}</Dashboard>
  </ProtectRoute>
)
// export const getLayout = ProtectRoute((page) => <Dashboard>{page}</Dashboard>)

export const getLayout = (page) => {
  const isServer = typeof window === "undefined"

  if (isServer) {
    return (
      <SnackbarProvider>
        <ProtectRoute>
          <Dashboard>{page}</Dashboard>
        </ProtectRoute>
      </SnackbarProvider>
    )
  }

  return (
    <ProvideAuth>
      <ProtectRoute>
        <Dashboard>{page}</Dashboard>
      </ProtectRoute>
    </ProvideAuth>
  )
}

export default Dashboard
