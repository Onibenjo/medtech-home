import { NextApiRequest, NextApiResponse } from "next"
import { db, auth } from "utils/auth/firebaseAdmin"
import paystackApi from "paystack-api"
// const paystack = require("paystack-api")(process.env.PAYSTACK_TEST_SECRET)

const validate = async (token) => {
  const decodedToken = await auth.verifyIdToken(token, true)
  console.log("Valid token.")
  return decodedToken
}

// fetch("https://api.paystack.co/transaction/verify/T548763485932876", { headers: {'accept': "application/json",
//     'authorization': "Bearer sk_test_6aa9ee790045aa2eb312373e2d8283ed4330d10f",
//     'cache-control': "no-cache"}}).then(res => res.json()).then(data => data)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const paystack = paystackApi(process.env.PAYSTACK_TEST_SECRET)
  try {
    const { token } = JSON.parse(req.headers.authorization || "{}")

    console.log(req.query)
    const { reference } = req.query
    // if (!token) {
    //   return res.status(403).send({
    //     errorCode: 403,
    //     message: "Auth token missing.",
    //   })
    // }
    // const result = await validate(token)

    const response = await paystack.transaction.verify({ reference })
    console.log(response)

    if (response.data.status === "success") {
      //   const { paid_at, amount, customer } = response
      //   await db.collection(`/users/${result.uid}/transactions`).add({
      //     paid_at,
      //     amount,
      //     email: customer.email,
      //   })
      res.writeHead(302, {
        Location: "http://localhost:3000/app/my-wallet",
      })
      return res.end()
    }

    return res.status(200).send({ message: response })
  } catch (err) {
    // return res.status(err.code).send({
    return res.status(500).send({
      errorCode: err.code,
      message: err.message,
    })
  }
}
