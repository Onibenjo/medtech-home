// /* eslint-disable import/no-mutable-exports */
// import firebase from "firebase/app"

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// }

// export const initFirebase = () => {
//   // return
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config)
//     if (typeof window !== "undefined") {
//       firebase
//         .firestore()
//         .enablePersistence({ synchronizeTabs: true })
//         // eslint-disable-next-line func-names
//         .catch(function (err) {
//           if (err.code === "unimplemented") {
//             // The current browser does not support all of the
//             // features required to enable persistence
//           }
//           // eslint-disable-next-line no-console
//           console.log(err.message)
//         })
//       // To enable analytics. https://firebase.google.com/docs/analytics/get-started
//       if ("measurementId" in config) firebase.analytics()
//     }
//   }
// }
// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
//   if (typeof window !== "undefined") {
//     // To enable analytics. https://firebase.google.com/docs/analytics/get-started
//     if ("measurementId" in config) firebase.analytics()
//   }
// }
// // export const db = firebase.firestore()
const firebase = {}
export default firebase
