/* eslint-disable @typescript-eslint/camelcase */
import firebase from "utils/auth/initFirebase"
import "firebase/database"
import useNavigatorOnLine from "hooks/useOnline"
import { useEffect } from "react"
import { useAuth } from "utils/use-auth"

const realtimeDb = firebase.database()
const db = firebase.firestore()

const usePresence = (allow) => {
  const { user } = useAuth()
  const isOnline = useNavigatorOnLine()
  const onlineStatusUpdate = (col, id) => {
    const isOfflineForDatabase = {
      role: col,
      online: false,
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOnlineForDatabase = {
      role: col,
      online: true,
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    }

    const userStatusFirestoreRef = db.doc(`/${col}/${id}`)

    const isOfflineForFirestore = {
      online: false,
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }

    const isOnlineForFirestore = {
      online: true,
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }

    const onlineRef = realtimeDb.ref(".info/connected") // Get a reference to the list of connections
    const userStatusDatabaseRef = realtimeDb.ref(`/status/${id}`)

    onlineRef.on("value", (snapshot) => {
      if (snapshot.val() === false) {
        userStatusFirestoreRef.set(isOfflineForFirestore, { merge: true })
        return
      }
      // console.log(snapshot.val())

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase)
          userStatusFirestoreRef.set(isOnlineForFirestore, { merge: true })
        })
    })
  }

  useEffect(() => {
    if (user && allow.pass && allow.route) {
      // if (process.browser) setToken()

      if (allow.route === "doctors") {
        onlineStatusUpdate(allow.route, user.uid)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allow)])

  return [isOnline, onlineStatusUpdate]
}

export default usePresence
