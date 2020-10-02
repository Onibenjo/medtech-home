import * as admin from "firebase-admin"
// import config from "./medtech-service-account.json"

// const config = {
//   type: "service_account",
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   // client_x509_cert_url:
//   //   "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qyhth%40medtech-f46d7.iam.gserviceaccount.com",
// }
// console.log(config)

const firebasePrivateKey: string = process.env.FIREBASE_PRIVATE_KEY || ""

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(config as admin.ServiceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // https://stackoverflow.com/a/41044630/1332513
      privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(config as admin.ServiceAccount),
//     // credential: admin.credential.cert({
//     //   project_id: process.env.FIREBASE_PROJECT_ID,
//     //   private_key: process.env.FIREBASE_PRIVATE_KEY,
//     //   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     //   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     //   client_id: process.env.FIREBASE_CLIENT_ID,
//     //   // projectId: process.env.FIREBASE_PROJECT_ID,
//     //   // privateKey: process.env.FIREBASE_PRIVATE_KEY,
//     //   // clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     // } as admin.ServiceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   })
// } catch (error) {
//   /*
//    * We skip the "already exists" message which is
//    * not an actual error when we're hot-reloading.
//    */
//   if (!/already exists/u.test(error.message)) {
//     // eslint-disable-next-line no-console
//     console.error("Firebase admin initialization error", error.stack)
//   }
// }

export const verifyIdToken = (token: string) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}

export const db = admin.firestore()
export const auth = admin.auth()
