// import firebase from "utils/auth/initFirebase"
// import "firebase/storage"
// import { nanoid } from "nanoid"
// import isProd from "utils/lib/isProd"

// const firebaseDocUploader = (path, type, file, updateProgress) =>
//   new Promise((resolve, reject) => {
//     const childPath = path
//     const storageReference = firebase
//       .app()
//       .storage(
//         isProd
//           ? "gs://medtech-prod-doctors-credential"
//           : "gs://medtech-doctors-credential"
//       )
//       .ref()

//     const rand = nanoid(13)
//     // const rand = name
//     const ext = file.name.split(".").pop()
//     const fileName = type
//       ? `${childPath || ""}/${type}-${rand}.${ext}`
//       : `${childPath || ""}/${rand}.${ext}`
//     // const fileName = `${childPath || ""}/${type}-${new Date().getTime()}.${ext}`
//     // Generate a file name based on current date and random number
//     const reference = storageReference.child(fileName)

//     // const reference = storageReference.child(
//     //   `${childPath || ""}/${Math.random()
//     //     .toString()
//     //     .replace("0.", "")
//     //     .substr(0, 7)}-${new Date().getTime()}.${file.name.split(".").pop()}`
//     // )

//     // Upload the file to the storage reference
//     const uploadTask = reference.put(file)

//     // Report upload progress
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         if (updateProgress) updateProgress(progress)
//       },
//       (error) => {
//         // eslint-disable-next-line no-console
//         console.log("Got error", error)
//         return reject(new Error("unable_to_upload"))
//       },
//       () => {
//         uploadTask.snapshot.ref
//           .getDownloadURL()
//           .then((url) => resolve(url)) // Return uploaded file's URL
//           .catch(() => reject(new Error("unable_to_upload")))
//       }
//     )
//   })
// const firebaseUploader = ({ path, name, file, updateProgress }) =>
//   new Promise((resolve, reject) => {
//     const childPath = path
//     const storageReference = firebase.app().storage().ref()

//     // Generate a file name based on current date and random number
//     // const reference = storageReference.child(
//     //   `${childPath || ""}/${type}-${new Date().getTime()}.${file.name
//     //     .split(".")
//     //     .pop()}`
//     // )
//     const rand = nanoid(5)
//     // const rand = name
//     const ext = file.name.split(".").pop()
//     const fileName = name
//       ? `${childPath || ""}/${name}-${rand}.${ext}`
//       : `${childPath || ""}/${rand}.${ext}`
//     const thumb = name
//       ? `${childPath || ""}/${name}-${rand}_128x128.${ext}`
//       : `${childPath || ""}/${rand}_128x128.${ext}`
//     const reference = storageReference.child(fileName)
//     // const reference = storageReference.child(
//     //   `${childPath || ""}/${Math.random()
//     //     .toString()
//     //     .replace("0.", "")
//     //     .substr(0, 7)}-${new Date().getTime()}.${file.name.split(".").pop()}`
//     // )

//     // Upload the file to the storage reference
//     const uploadTask = reference.put(file)

//     // Report upload progress
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         if (updateProgress) updateProgress(progress)
//       },
//       (error) => {
//         // eslint-disable-next-line no-console
//         console.log("Got error", error)
//         return reject(new Error("unable_to_upload"))
//       },
//       () => {
//         uploadTask.snapshot.ref
//           .getDownloadURL()
//           .then((url) => resolve({ url, thumb })) // Return uploaded file's URL
//           .catch(() => reject(new Error("unable_to_upload")))
//       }
//     )
//   })

// // eslint-disable-next-line import/prefer-default-export
const firebaseDocUploader = (xx, id, image, type) => {}
const  firebaseUploader = (s, id, image, type) => {}
export { firebaseDocUploader, firebaseUploader }
