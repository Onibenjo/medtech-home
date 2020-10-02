import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { MdMenu, MdMoreVert } from "react-icons/md"
// import useNavigatorOnLine from "hooks/useOnline"
import { useDocument } from "hooks/useDocument"
import { auth } from "utils/lib/firebase"
import Link from "next/link"
import { RiBitCoinLine as MoneyIcon } from "react-icons/ri"
import paths from "paths"
import { useAuth } from "../../utils/use-auth"
import UserAvatar from "./UserAvatar/UserAvatar"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    // marginLeft: -theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    // minHeight: "2rem !important",
    // height: "3rem",
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    [theme.breakpoints.down("md")]: {
      height: "4rem",
      paddingTop: theme.spacing(2),
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "baseline",
    },
  },
  sectionMobile: {
    display: "flex",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 240px)`,
      marginLeft: "240px",
    },
    fontSize: " 1rem",
    fontFamily: "'Lato', san-serif",
    // minHeight: '2rem !important',
    // height: '3rem'
  },
  btn: {
    cursor: "pointer",
  },
  icon: {
    padding: "0.1rem 0",
    margin: "0 0.81rem",
  },
  secondaryBar: {
    zIndex: 0,
  },
  wallet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "0 .7rem",
    fontWeight: "bold",
    letterSpacing: ".13em",
  },
}))

// const alertCount = 9

export default function Appbar({ handleDrawerToggle }) {
  const { user, setUser } = useAuth()
  const classes = useStyles()
  // const onlineStatus = useNavigatorOnLine()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isPatient = user.type === "patient"

  const { data: wallet } = useDocument(
    `${user.type}s/${user.uid}/private/wallet`,
    {
      listen: true,
      skip: !isPatient,
    }
  )

  useEffect(() => {
    setUser(wallet || {})
    // if (wallet.balance) setUser(wallet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* gi */}
      <MenuItem>
        <Link href={user.type === "patient" ? paths.profile : paths.docProfile}>
          <a>Profile</a>
        </Link>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MdMail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <MdNotifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <UserAvatar user={user} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky" className={classes.appBar} elevation={2}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label="open drawer"
          >
            <MdMenu />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <Tooltip title={`Alerts • ${alertCount || "No"} alerts`}>
              <IconButton
                aria-label={`show ${alertCount} new notifications`}
                color="inherit"
              >
                <Badge badgeContent={alertCount} color="secondary">
                  <MdNotifications />
                </Badge>
              </IconButton>
            </Tooltip> */}
            {isPatient && (
              <div
                className={classes.wallet}
                style={{
                  color: wallet.balance > 600 ? "green" : "red",
                }}
              >
                <MoneyIcon />
                {wallet && wallet.balance}
              </div>
            )}
            <div
              onClick={handleProfileMenuOpen}
              onKeyDown={handleProfileMenuOpen}
              className={classes.btn}
              role="button"
              tabIndex={-1}
            >
              Hi,{" "}
              {auth.currentUser.displayName.split(" ")[0] ||
                user.displayName.split(" ")[0]}{" "}
              {/* {onlineStatus} */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                className={classes.icon}
              >
                <UserAvatar user={{ ...user, online: null }} />
              </IconButton>{" "}
            </div>
          </div>
          <div className={classes.sectionMobile}>
            {isPatient && (
              <Link
                href={
                  user.type === "patient" ? paths.myWallet : paths.docWallet
                }
              >
                <a
                  className={classes.wallet}
                  style={{
                    color: wallet.balance > 600 ? "green" : "red",
                    margin: "14px 80px 0 0",
                  }}
                >
                  <MoneyIcon />
                  {wallet && wallet.balance}
                </a>
              </Link>
            )}
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MdMoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* <AppBar
        component="div"
        className={(classes.secondaryBar, classes.appBar)}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
        </Tabs>
      </AppBar> */}
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
