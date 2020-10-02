import firebase from "firebase/app"
import "firebase/messaging"
import localforage from "localforage"

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token")
  },

  async init() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      })
    }
    try {
      const tokenInLocalForage = await this.tokenInlocalforage()
      if (tokenInLocalForage !== null) {
        // return false
        return tokenInLocalForage
      }
      // requesting notification permission from browser
      const status = await Notification.requestPermission()
      if (status && status === "granted") {
        // getting token from FCM
        const messaging = firebase.messaging()
        // await messaging.requestPermission()
        // const token = await messaging.getToken()
        // localforage.setItem("fcm_token", token)
        // console.log("fcm_token", token)

        const fcm_token = await messaging.getToken()
        if (fcm_token) {
          // setting FCM token in indexed db using localforage
          localforage.setItem("fcm_token", fcm_token)
          // return the FCM token after saving it
          return fcm_token
        }
        return false
      }
      return false
    } catch (error) {
      console.error(error)
      return null
    }
  },
}

// eslint-disable-next-line import/prefer-default-export
export { firebaseCloudMessaging }

// import { firebaseCloudMessaging } from '../utils/webPush'
//     firebaseCloudMessaging.init()

// init: async function () {
