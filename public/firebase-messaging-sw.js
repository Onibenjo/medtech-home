/* global importScripts, firebase */
// importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js")
// importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js")
importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-messaging.js")

if (!firebase.apps.length) {
  // firebase.initializeApp({
  // messagingSenderId: **********
  // })
  firebase.initializeApp({
    apiKey: "AIzaSyCfXhOEhn5E7qprxGEWYFlp5ZY8T375dzo",
    projectId: "medtech-f46d7",
    messagingSenderId: 707689134028,
    appId: "1:707689134028:web:676ab4e9075348e0",
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  })
}
// firebase.messaging()
// background notifications will be received here
firebase.messaging().onBackgroundMessage((payload) => {
  console.log("payload", payload)
  const options = {
    ...payload.notification,
    icon: payload.data.image || "/logo.png",
  }
  const notificationTitle = "Medtech Africa"

  return self.registration.showNotification(
    payload.data.name || notificationTitle,
    options
  )
  // return self.registration.showNotification(title, options)
})

// firebase.messaging()
