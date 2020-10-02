/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react"
import firebase from "utils/auth/initFirebase"

const getToken = useCallback(async (identity, roomName) => {
  const user = firebase.auth().currentUser
  const headers = new window.Headers()
  const idToken = await user.getIdToken()
  headers.set("Authorization", idToken)

  const endpoint = "/token"

  return fetch(`${endpoint}`, { headers }).then((res) => res.json())
}, [])

export default getToken
