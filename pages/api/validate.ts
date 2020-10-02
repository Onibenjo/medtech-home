import { NextApiRequest, NextApiResponse } from "next"
import * as admin from "firebase-admin"

interface UserData {
  // arbitrary user data you are storing in your DB
}

interface ValidateResponse {
  user: {
    uid: string
    email: string
  }
  userData: UserData
}

// admin.initializeApp();
// admin.initializeApp({
//     credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_API_KEY
//       }),
//       databaseURL: process.env.FIREBASE_DATABASE_URL
// });

const validate = async (token: string) => {
  const decodedToken = await admin.auth().verifyIdToken(token, true)
  console.log("Valid token.")

  // get user data from your DB store
  const data = (
    await admin.firestore().doc(`/users/${decodedToken.uid}`).get()
  ).data() as UserData

  const user = await admin.auth().getUser(decodedToken.uid)
  const result = {
    user: {
      uid: user.uid,
      email: user.email,
    },
    userData: data,
  }
  return result
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Validating token...")
  try {
    const { token } = JSON.parse(req.headers.authorization || "{}")
    if (!token) {
      return res.status(403).send({
        errorCode: 403,
        message: "Auth token missing.",
      })
    }
    const result = await validate(token)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(err.code).send({
      errorCode: err.code,
      message: err.message,
    })
  }
}
