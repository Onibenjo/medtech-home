import classNames from "classnames"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Hidden from "@material-ui/core/Hidden"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import {
  MdHome,
  // MdExitToApp
} from "react-icons/md"
import { IoIosExit, IoIosWallet, IoMdPeople } from "react-icons/io"
import {
  FaPrescriptionBottleAlt,
  FaFileMedical,
  // FaUserTie,
  FaEnvelope as FaRegEnvelope,
  FaUser,
  FaUserMd,
} from "react-icons/fa"
import { AiOutlineSchedule } from "react-icons/ai"
import paths from "paths"
import { useRouter } from "next/router"
import { useAuth } from "utils/use-auth"
import { firebaseCloudMessaging } from "utils/webPush"
import { signout, db } from "utils/lib/firebase"
import styles from "styles/DashboardStyle"
import Link from "../ActiveLink/Link2"

const useStyles = makeStyles(styles)

const doctorlist = [
  {
    text: "Dashboard",
    url: paths.doctorDashboard,
    icon: MdHome,
  },
  {
    text: "Patients",
    url: paths.patients,
    icon: IoMdPeople,
  },
  {
    text: "Appointments",
    url: paths.doctorAppt,
    icon: AiOutlineSchedule,
  },
  // {
  //   text: "Patient Health Tracker",
  //   url: paths.healthtracker,
  //   icon: "/doctors/tracker.png",
  //   alt: "health tracker",
  // },
  // {
  //   text: "Vital Signs",
  //   url: paths.vitalSigns,
  //   icon: "/doctors/wallet.png",
  //   alt: "wallet",
  // },
  // {
  //   text: "Vital Records",
  //   url: paths.vitalRecord,
  //   icon: "/doctors/wallet.png",
  //   alt: "wallet",
  // },
  // {
  //   text: "Result Uploads",
  //   url: paths.docUpload,
  //   icon: "/doctors/upload.png",
  //   alt: "uploads",
  // },

  // {
  // text: "Bank Detail",
  // url: paths.docBankDetails,
  // icon: IoIosWallet,
  // },
  {
    text: "Profile",
    url: paths.docProfile,
    icon: FaUser,
  },
  {
    text: "Support",
    url: paths.docSupport,
    icon: FaRegEnvelope,
  },
]

const userlist = [
  {
    text: "Dashboard",
    url: paths.dashboard,
    icon: MdHome,
  },
  {
    text: "Doctors",
    url: paths.seeDoctor,
    icon: FaUserMd,
  },
  {
    text: "Recommendations",
    url: paths.recommendation,
    icon: FaPrescriptionBottleAlt,
  },
  {
    text: "My Records",
    url: paths.myRecord,
    icon: FaFileMedical,
  },
  // {
  //   text: "Nearest Healthbank",
  //   url: paths.healthbank,
  //   icon: FaClinicMedical ,
  // },
  {
    text: "My Wallet",
    url: paths.myWallet,
    icon: IoIosWallet,
  },
  {
    text: "Profile",
    url: paths.profile,
    icon: FaUser,
  },
  {
    text: "Support",
    url: paths.userSupport,
    icon: FaRegEnvelope,
  },
]

const DashboardDrawer = ({
  container,
  mobileOpen,
  setMobileOpen,
  handleDrawerToggle,
}) => {
  const router = useRouter()
  const { user, toggleLoading } = useAuth()
  const classes = useStyles()

  const iconStyles = classNames({
    [classes.darkIcon]: true,
    [classes.icon]: true,
  })
  const theme = useTheme()
  // drawerlist
  let sidebarList = []
  if (router.pathname.startsWith(paths.dashboard)) {
    sidebarList = userlist
  } else if (router.pathname.startsWith(paths.doctor)) {
    sidebarList = doctorlist
  }

  async function deactivateToken() {
    try {
      const token = await firebaseCloudMessaging.init()
      toggleLoading(true)
      if (token) {
        db.doc(`${user.type}s/${user.uid}/devices/${token}`)
          .update({
            active: false,
          })
          .then(() => signout())
        return
      }
      signout()
    } catch (error) {
      console.error(error)
    }
  }
  // drawer
  const drawer = (
    <div>
      <div className={classes.companyName}>
        <img src="/logo.png" alt="logo" className={classes.img} />
        <span>Medtech Africa</span>
      </div>
      {/* <Divider /> */}
      <List className={classes.list}>
        {sidebarList.map((link, index) => (
          <Link
            href={link.url}
            activeClassName={classes.activelink}
            key={index}
          >
            <a
              className={("link", classes.listText)}
              onClick={() => setMobileOpen(false)}
              onKeyUp={() => setMobileOpen(false)}
              tabIndex={0}
              role="link"
            >
              {link.alt ? (
                <img
                  src={link.icon}
                  alt={link.alt}
                  style={{ height: "20px" }}
                  className={iconStyles}
                />
              ) : (
                <link.icon size="20" className={iconStyles} />
              )}
              <span>{link.text}</span>
            </a>
          </Link>
        ))}
        {/* </List> */}
        <Divider />
        {user.service === "paid" && (
          <>
            <Link href={paths.docWallet} activeClassName={classes.activelink}>
              <a className={("link", classes.listText)}>
                <IoIosWallet size="20" className={iconStyles} />
                <span>My Wallet</span>
              </a>
            </Link>
            <Link
              href={paths.docBankAccount}
              activeClassName={classes.activelink}
            >
              <a className={("link", classes.listText)}>
                <img
                  src="/images/svg/naira.svg"
                  width="20px"
                  height="20px"
                  alt="medtech coin"
                  className={iconStyles}
                />

                <span>Bank Accounts</span>
              </a>
            </Link>
          </>
        )}

        {/* <List> */}
        <a
          onClick={deactivateToken}
          className={("link", classes.listText)}
          href="#"
        >
          <IoIosExit size="20" className={iconStyles} />
          {/* <MdExitToApp size="20" className={iconStyles} /> */}
          <span>Logout</span>
        </a>
      </List>
    </div>
  )
  return (
    <nav className={classes.drawer} aria-label="navigation">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}
export default DashboardDrawer
