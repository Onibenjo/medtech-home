/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import firebase from "utils/auth/initFirebase"
import "firebase/firestore"
import "firebase/auth"
// async function loadDb() {
//   const fb = await import("firebase/app")

//   await import("firebase/database")
//   await import("firebase/firestore")
//   await import("firebase/auth")

//   // try {
//   //   firebase.initializeApp({
//   //     databaseURL: 'https://your-blog.firebaseio.com'
//   //   });
//   // } catch (error) {
//   //   /*
//   //    * We skip the "already exists" message which is
//   //    * not an actual error when we're hot-reloading.
//   //    */
//   //   if (!/already exists/.test(error.message)) {
//   //     console.error('Firebase initialization error', error.stack);
//   //   }
//   // }

//   return fb.firestore()
// }
// const firebase = loadDb()
const auth = firebase.auth()
// const db = loadDb()
const db = firebase.firestore()

const sendPasswordResetEmail = (email) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      return true
    })
    .catch((error) => {
      // An error happened.
      console.log("error", error)
    })
}
const login = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (res: any): Promise<firebase.auth.UserCredential> => {
        return res
      }
    )
    .catch((error) => {
      console.log(error)
    })
}
const confirmPasswordReset = (code, password) => {
  return firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => {
      return true
    })
}

const signout = () => {
  return firebase.auth().signOut()
}
const signin = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (res: any): Promise<firebase.auth.UserCredential> => {
        // if (!res.user.emailVerified) {
        //   return signout()
        // }
        return res
      }
    )
}

// const signup = (details) => {
//   let photoURL
//   return (
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(details.email, details.pass)
//       .then((response: any) => {
//         response.user.sendEmailVerification()
//         return response.user
//       })
//       .then((res: any) => {
//         photoURL = `http://gravatar.com/avatar/${details.email}?d=identicon`
//         res.updateProfile({
//           displayName: `${details.firstName} ${details.lastName}`,
//           photoURL,
//         })
//         return res
//       })
//       // .then(() => {
//       // return patientsRef.doc(res.uid).set({
//       //   ...details,
//       //   uid: res.uid,
//       // })
//       // })
//       .then(() => {
//         return signout()
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code
//         const errorMessage = error.message

//         console.log("errorCode", errorCode, "errorMessage", errorMessage)
//       })
//   )
// }

export {
  auth,
  db,
  // signup,
  signin,
  signout,
  sendPasswordResetEmail,
  confirmPasswordReset,
  login,
}
export default firebase
