import React from "react"
import paths from "paths"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { FiMenu } from "react-icons/fi"
import dynamic from "next/dynamic"
import Button2 from "../CustomButtons/Button"
// import { useAuth } from "utils/use-auth"
import Link from "../ActiveLink/Link2"
import styles from "../../styles/NavbarStyles"
// import SideDrawer from "./SideDrawer"
const SideDrawer = dynamic(() => import("./SideDrawer"), { ssr: false })

const useStyles = makeStyles(styles)

const Navbar = () => {
  // const [headerShow, setheaderShow] = React.useState(false)
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  // const { user } = useAuth()
  // const user = ""
  // const user = useAuth() ? useAuth().user : null
  // const handleScroll = () => {
  //   if (window.scrollY > 0) {
  //     setheaderShow(true)
  //   } else {
  //     setheaderShow(false)
  //   }
  // }
  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  return (
    <div className={classes.root}>
      <AppBar
        // position="fixed"
        className={classes.appBar}
        style={{
          // width: headerShow ? '100%' : "90%",
          width: "100%",
          background: "#fefefe",
          margin: "0 auto",
          zIndex: "99",
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label="menu"
          >
            <FiMenu size="30" />
          </IconButton>
          <div className={classes.logo}>
            {/* <img src="https://medtech.africa/logo.png" alt="logo" style={{ width: "100%" }} /> */}
            <picture>
              <source srcSet="/logo2.png?webp" type="image/webp" />
              <source srcSet="/logo2.png" type="image/png" />
              <img src="/logo.png" alt="logo" style={{ width: "100%" }} />
            </picture>
          </div>
          <Link href="/" passHref>
            <Button color="inherit" className={classes.button} component="a">
              Medtech Africa
            </Button>
          </Link>
          <div className={classes.menuItem}>
            <Link href={paths.about} activeClassName={classes.active}>
              {/* <Button color="inherit" className={classes.button}> */}
              <a className={classes.button}>
                About Us
                {/* </Button> */}
              </a>
            </Link>
            {/* <Link href={paths.products} activeClassName={classes.active}>
              <a className={classes.button}>
                Our Product
              </a>
            </Link> */}
            <Link href={paths.contact} activeClassName={classes.active}>
              {/* <Button color="inherit" className={classes.button}> */}
              <a className={classes.button}>
                Contact
                {/* </Button> */}
              </a>
            </Link>
          </div>
          <div className={classes.menuItemLinks}>
            <Link href={paths.login}>
              <Button2
                color="primary"
                // className={classes.button}
                component="a"
                variant="contained"
                size="sm"
              >
                {/* <a className={classes.button}> */}
                Login
                {/* </a> */}
              </Button2>
            </Link>
            <Link href="/register-as">
              <Button
                color="secondary"
                variant="outlined"
                // round
                component="a"
                size="small"
                // size="sm"
              >
                Register
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {mobileOpen && (
        <SideDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
    </div>
  )
}

export default Navbar
