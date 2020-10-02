/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
import React from "react"
import useScript from "hooks/useScript"

const callPaystackPop = function (paystackArgs) {
  const handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs)
  handler && handler.openIframe()
}

function usePaystackPayment(options) {
  const [loading, error] = useScript({
    src: "https://js.paystack.co/v1/inline.js",
    checkForExisting: true,
  })
  const { key } = options
  const { email } = options
  const { amount } = options
  const { reference } = options
  const _b = options.metadata
  const metadata = _b === undefined ? {} : _b
  const _c = options.currency
  const currency = _c === undefined ? "NGN" : _c
  const { channels } = options
  const _d = options.label
  const label = _d === undefined ? "" : _d
  const _e = options.plan
  const plan = _e === undefined ? "" : _e
  const _f = options.quantity
  const quantity = _f === undefined ? "" : _f
  const _g = options.subaccount
  const subaccount = _g === undefined ? "" : _g
  const _h = options.transaction_charge
  const transaction_charge = _h === undefined ? 0 : _h
  const _j = options.bearer
  const bearer = _j === undefined ? "account" : _j
  function initializePayment(callback, onClose) {
    if (error) {
      throw new Error("Unable to load paystack inline script")
    }
    if (!loading) {
      const paystackArgs = {
        callback:
          callback ||
          function () {
            return null
          },
        onClose:
          onClose ||
          function () {
            return null
          },
        key,
        ref: reference,
        email,
        amount,
        currency,
        plan,
        quantity,
        "data-custom-button": options["data-custom-button"] || "",
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
      }
      callPaystackPop(paystackArgs)
    }
  }
  React.useEffect(() => {
    if (error) {
      throw new Error("Unable to load paystack inline script")
    }
  }, [error])
  return initializePayment
}

export default usePaystackPayment

// Test Cards
// Here’s are some cards that work on our test environment.

// No validation
// Card Number: 408 408 408 408 408 1
// Expiry Date: any date in the future
// CVV: 408

// PIN+OTP validation
// (nonreusable)

// Card Number: 5060 6666 6666 6666 666 (Verve)
// Expiry Date: any date in the future
// CVV: 123
// PIN: 1234
// OTP: 123456

// PIN only validation
// (reusable)

// Card Number: 5078 5078 5078 5078 12 (Verve)
// Expiry Date: any date in the future
// CVV: 081
// PIN: 1111

// PIN+PHONE+OTP validation
// Card Number: 5078 5078 5078 5078 04 (Verve)
// Expiry Date: any date in the future
// CVV: 884
// PIN: 0000
// Phone: If less than 10 numeric characters, Transaction will fail.
// OTP: 123456

// Bank authorization Simulation
// Card Number: 408 408 0000000 409
// Expiry Date: any date in the future
// CVV: 000

// Simulating failed transactions with specific messages
// Declined
// Card Number: 408 408 0000005 408
// Expiry Date: any date in the future
// CVV: 001

// Token Not Generated. Customer Not Registered on Token Platform
// Card Number: 5078 5078 5078 5078 53 (Verve)
// Expiry Date: any date in the future
// CVV: 082
// PIN: (any PIN)

// Simulating issues
// Timeout error
// Card Number: 506066 0000000064 (Verve)
// Expiry Date: any date in the future
// CVV: 606

// 500 error
// Card Number: 506066 506066 506067 (Verve)
// Expiry Date: any date in the future
// CVV: 060
