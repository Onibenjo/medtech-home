import { useState, useEffect } from "react"
import Router from "next/router"
import { fetchApi } from "utils/lib/fetch"
import Loader from "components/Loader/Lego"

const VerifyEmail = () => {
  const [state, setState] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const email = Router.query.x
    fetchApi(`/user/email-verify?email=${email}`)
      .then(() => {
        setState(false)
        Router.push("/login")
      })
      .catch(() => {
        setError(true)
      })
  }, [])
  if (error)
    return (
      <h3>
        There was an error verifying your email. Please contact us at{" "}
        <a href="mailto:contact@medtech.africa">contact@medtech.africa</a>
      </h3>
    )
  return <Loader loading={state} title="Verifying" />
}

export default VerifyEmail
