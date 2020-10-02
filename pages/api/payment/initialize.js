import { db, auth } from "utils/auth/firebaseAdmin"
import paystackApi from "paystack-api"

const validate = async (token) => {
  const decodedToken = await auth.verifyIdToken(token, true)
  console.log("Valid token.")

  // get user data from your DB store
  const data = (
    await db.doc(`/users/${decodedToken.uid}/transactions`).get()
  ).data()

  const user = await auth.getUser(decodedToken.uid)
  const result = {
    user: {
      uid: user.uid,
      email: user.email,
    },
    userData: data,
  }
  return result
}

// fetch("https://api.paystack.co/transaction/verify/T548763485932876", { headers: {'accept': "application/json",
//     'authorization': "Bearer sk_test_6aa9ee790045aa2eb312373e2d8283ed4330d10f",
//     'cache-control': "no-cache"}}).then(res => res.json()).then(data => data)

export default async (req, res) => {
  const paystack = paystackApi(process.env.PAYSTACK_TEST_SECRET)
  try {
    const { token } = JSON.parse(req.headers.authorization || "{}")
    const { amount, email } = JSON.parse(req.body)
    console.log(JSON.parse(req.body))
    // return res.status(200).send({ message: "done" })
    // if (!token) {
    //   return res.status(403).send({
    //     errorCode: 403,
    //     message: "Auth token missing.",
    //   })
    // }
    // const result = await validate(token)

    return paystack.transaction
      .initialize({
        email,
        amount: amount * 100,
        callback_url: "http://localhost:3000/api/payment/verify",
      })
      .then((resp) => {
        console.log(resp.data.authorization_url)
        return res.send({ url: resp.data.authorization_url })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).send({ msg: "failed" })
      })
    // const transaction = db
    //   .collection(`users/${result.user.uid}/transactions`)
    //   .doc()
    // transaction.set(body)
  } catch (err) {
    // return res.status(err.code).send({
    return res.status(500).send({
      errorCode: err.code,
      message: err.message,
    })
  }
}
