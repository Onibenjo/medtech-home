import { db, verifyIdToken } from "utils/auth/firebaseAdmin"
import paystackApi from "paystack-api"

// fetch("https://api.paystack.co/transaction/verify/T548763485932876", { headers: {'accept': "application/json",
//     'authorization': "Bearer sk_test_6aa9ee790045aa2eb312373e2d8283ed4330d10f",
//     'cache-control': "no-cache"}}).then(res => res.json()).then(data => data)

export default async (req, res) => {
  const paystack = paystackApi(process.env.PAYSTACK_TEST_SECRET)
  try {
    const token = req.headers.authorization.split("Bearer ")[1] || ""
    if (!token) {
      return res.status(403).send({
        errorCode: 403,
        message: "Auth token missing.",
      })
    }
    const result = await verifyIdToken(token)

    const { data } = await paystack.transaction.verify({
      reference: req.body,
    })

    if (data.status === "success") {
      const {
        id,
        reference,
        paid_at,
        created_at,
        customer,
        paidAt,
        createdAt,
        transaction_date,
        authorization,
        ip_address,
        currency,
        channel,
      } = data
      const amount = data.amount / 100
      const userRef = db.collection(`wallet`).doc(result.uid)
      const transactionRef = db
        .collection(`users`)
        .doc(result.uid)
        .collection(`transactions`)
        .doc(`${id}`)

      const dbData = {
        id,
        reference,
        paid_at,
        created_at,
        amount,
        customer,
        createdAt,
        transaction_date,
        authorization,
        ip_address,
        currency,
        channel,
        email: customer.email,
        type: "deposit",
        reason: "Deposit",
        time: paidAt,
      }

      await db.runTransaction((t) => {
        let newBal
        return t
          .get(userRef)
          .then((doc) => {
            if (!doc.exists) {
              // eslint-disable-next-line no-throw-literal
              throw { code: 404, message: "Document does not exist!" }
            }
            newBal = doc.data().balance + amount // You calculate the new value
            return t.update(userRef, { balance: newBal })
          })
          .then((t2) => {
            return t2.set(transactionRef, dbData)
          })
      })
    }
    return res.status(200).send({ message: data.status })
  } catch (err) {
    return res.status(err.code || 500).send({
      // return res.status(500).send({
      errorCode: err.code,
      message: err.message,
    })
  }
}
