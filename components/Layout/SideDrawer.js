import React from "react"
import paths from "paths"
// import Link from "next/link";
import List from "@material-ui/core/List"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import IconButton from "@material-ui/core/IconButton"
import { MdClose } from "react-icons/md"
import Hidden from "@material-ui/core/Hidden"
import { makeStyles } from "@material-ui/core/styles"
// import { useAuth } from "utils/use-auth"
import Button from "@material-ui/core/Button"
import FadeIn from "react-fade-in"
import Link from "../ActiveLink/Link2"
import styles from "../../styles/NavbarStyles"

const useStyles = makeStyles(styles)

const SideDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles()
  // const { user } = useAuth()
  const user = ""
  return (
    <Hidden mdUp implementation="js">
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          className={classes.closeMenuButton}
        >
          <MdClose size="40" />
        </IconButton>
        <List component="nav" className={classes.nav}>
          <FadeIn delay={300}>
            <Link href={paths.products}>
              <ListItem button className={classes.navlink} component="a">
                Our Product
              </ListItem>
            </Link>
            <Link href={paths.about}>
              <ListItem button className={classes.navlink} component="a">
                About Us
              </ListItem>
            </Link>
            <Link href={paths.contact}>
              <ListItem button className={classes.navlink} component="a">
                Contact Us
              </ListItem>
            </Link>
            {!user ? (
              <div
                className={classes.navlink}
                style={{ justifyContent: "space-around" }}
              >
                <Link href={paths.login}>
                  <Button
                    // className={classes.navlink}
                    component="a"
                    color="secondary"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={paths.registerAs}>
                  <Button component="a" color="secondary" variant="outlined">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href={paths.dashboard}>
                <ListItem button className={classes.navlink} component="a">
                  Dashboard
                </ListItem>
              </Link>
            )}
          </FadeIn>
        </List>
      </Drawer>
    </Hidden>
  )
}

export default SideDrawer
