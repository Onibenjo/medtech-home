import { FaUser, FaUserFriends } from "react-icons/fa"
import React, { useEffect, useRef, useState } from "react"

import { AiFillSchedule } from "react-icons/ai"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import Hidden from "@material-ui/core/Hidden"
import { MdHome } from "react-icons/md"
import { makeStyles } from "@material-ui/core/styles"
import styles from "styles/DashboardStyle"
import { useAuth } from "utils/use-auth"
import { useRouter } from "next/router"

const useStyles = makeStyles(styles)

const BottomNavBar = () => {
  const classes = useStyles()
  const router = useRouter()
  const {
    user: { type },
  } = useAuth()

  const role = useRef(
    type === "admin" ? "app" : type === "doctor" ? "doctors" : "app"
  ).current

  const route = router.pathname.slice(role.length + 2)
  const [value, setValue] = useState("dashboard")

  const handleChange = (event, newValue) => {
    event.persist()
    if (role) {
      const routeToGo =
        newValue === "dashboard" ? `/${role}` : `/${role}/${newValue}`
      router.push(routeToGo, routeToGo, {
        shallow: true,
      })
      setValue(newValue)
    }
  }

  useEffect(() => {
    setValue(route || "dashboard")
    // setValue(route.includes("account") ? "profile" : route)
  }, [route])

  return (
    <Hidden mdUp implementation="css">
      {/* {type !== "admin" ? ( */}
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          label="Home"
          value="dashboard"
          icon={<MdHome />}
        />
        {type === "doctor" && (
          <BottomNavigationAction
            label="Patients"
            value="my-patients"
            icon={<FaUserFriends />}
          />
        )}
        {type === "patient" && (
          <BottomNavigationAction
            label="Doctors"
            value="see-doctor"
            icon={<FaUserFriends />}
          />
        )}
        <BottomNavigationAction
          label="Appointments"
          value="appointments"
          icon={<AiFillSchedule />}
        />
        <BottomNavigationAction
          label="Profile"
          value={
            route.includes("account-setting")
              ? route
              : "account-setting/profile"
          }
          icon={<FaUser />}
        />
      </BottomNavigation>
      {/* ) : null} */}
    </Hidden>
  )
}

export default BottomNavBar
