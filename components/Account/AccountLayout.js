import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
// import { useDocument } from "hooks/useDocument"
import { useAuth } from "utils/use-auth"
import ProgressBar from "../Progressbar/AcctProgressBar"

import { getLayout as getSiteLayout } from "../Dashboard/Dashboard"

const ActiveLink = ({ children, href, className }) => {
  const router = useRouter()
  return (
    <Link href={href} scroll={false}>
      {/* <> */}
      <a
        className={`${
          router.pathname === href ? "active" : "inactive"
        } ${className} `}
      >
        {children}
        <style jsx>
          {`
            .active {
              color: #1a202c;
              border-color: #2d3748;
            }
            .inactive {
              color: #718096;
              border-color: transparent;
            }
            .inactive:hover {
              color: #4a5568;
            }
            a {
              display: block;
              padding-bottom: 1rem;
              font-weight: 600;
              font-size: 0.875rem;
              border-bottom-width: 2px;
              white-space: nowrap;
              cursor: pointer;
            }
            a:focus {
              outline: 0;
              color: #1a202c;
            }
            .ml-10 {
              margin-left: 1.5rem;
            }
          `}
        </style>
      </a>
      {/* </> */}
    </Link>
  )
}

const AccountLayout = ({ children, root }) => {
  const { user } = useAuth()
  // const { data: accounts } = useDocument(
  //   `doctors/${user.uid}/private/bank_accounts`,
  //   {
  //     skip: user.type !== "doctor",
  //   }
  // )

  const [value, setValue] = useState(70)
  // useEffect(() => {
  //   if (accounts && !user.photoURL.includes("blank.png")) {
  //     setValue((oldValue) => {
  //       const newValue = oldValue + 30
  //       return newValue
  //     })
  //   } else if (accounts && user.photoURL.includes("blank.png")) {
  //     setValue((oldValue) => {
  //       const newValue = oldValue + 15
  //       return newValue
  //     })
  //   } else if (!accounts && user.photoURL.includes("blank.png")) {
  //     setValue((oldValue) => {
  //       const newValue = oldValue + 15
  //       return newValue
  //     })
  //   }
  // }, [accounts, user.photoURL])

  // const [value1, setValue1] = useState(60)

  // useEffect(() => {
  //   if (
  //     user.dob &&
  //     user.state &&
  //     user.phoneNumber &&
  //     !user.photoURL.includes("blank.png")
  //   ) {
  //     setValue1((oldValue) => {
  //       const newValue = oldValue + 40
  //       return newValue
  //     })
  //   } else if (
  //     user.dob &&
  //     user.state &&
  //     user.phoneNumber &&
  //     user.photoURL.includes("blank.png")
  //   ) {
  //     setValue1((oldValue) => {
  //       const newValue = oldValue + 30
  //       return newValue
  //     })
  //   }
  // }, [user.dob, user.phoneNumber, user.photoURL, user.state])

  useEffect(() => {
    // const emptyValCount = Object.values(user).filter(
    //   (x) => !x || x.toString().includes("blank.png")
    // ).length
    // or
    const keys = ["numAppointments", "online", "last_changed"]
    const emptyValCount = Object.entries(user)
      .filter(([key]) => !keys.includes(key))
      .filter((x) => !x || x.toString().includes("blank.png"))
    // console.log(user)
    const total = Object.values(user).length
    setValue(() => {
      const newValue = 100 - (emptyValCount.length / total) * 100
      return newValue
    })
  }, [user])

  return (
    <div className="max-w-xl mx-auto px-8">
      <h1>Account Settings</h1>
      {value < 100 && (
        <>
          <h6>Account setup</h6>
          <ProgressBar value={Math.round(value)} max={100} />
        </>
      )}
      {/* {root === "app" ? (
         <ProgressBar value={value1} max={100} />
       ) : (
         <ProgressBar value={value} max={100} />
       )} */}
      <div className="container">
        {root === "app" ? (
          <>
            <ActiveLink
              href={`/${root}/account-setting/profile`}
              className="ml-10"
            >
              Profile
            </ActiveLink>

            <ActiveLink
              href={`/${root}/account-setting/medical-info`}
              className="ml-10"
            >
              Medical Info
            </ActiveLink>
          </>
        ) : (
          <>
            {/* <ProgressBar value={value} max={100} /> */}
            <ActiveLink
              href={`/${root}/account-setting/profile`}
              className="ml-10"
            >
              Profile
            </ActiveLink>

            <ActiveLink
              href={`/${root}/account-setting/reviews`}
              className="ml-10"
            >
              Reviews
            </ActiveLink>
            {/* {user.service === "paid" && ( */}
            <ActiveLink
              href={`/${root}/account-setting/bank-details`}
              className="ml-10"
            >
              Bank Details
            </ActiveLink>
            <ActiveLink
              href={`/${root}/account-setting/set-time`}
              className="ml-10"
            >
              Working Hours
            </ActiveLink>
            {/* )} */}
          </>
        )}
      </div>

      <div>{children}</div>
      <style jsx>
        {`
          h1 {
            font-size: 1.5rem;
            color: #1a202c;
            font-weight: 600;
          }
          .container {
            margin: 1.5rem 0;
            display: flex;
            overflow-x: auto;
            // scrollbar-width: none;
            box-shadow: inset 0 -2px 0 #edf2f7;
          }
          // .container::-webkit-scrollbar {
          //   display: none;
          // }
        `}
      </style>
    </div>
  )
}

export const getLayout = (page) =>
  getSiteLayout(<AccountLayout root="app">{page}</AccountLayout>)

export const getDocLayout = (page) =>
  getSiteLayout(<AccountLayout root="doctors">{page}</AccountLayout>)

export default AccountLayout
