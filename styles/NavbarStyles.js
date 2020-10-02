const drawerWidth = 240
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: "#0e789b",
    margin: "0 auto",
    background: "#fefefe",
    // position: "fixed",
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuItem: {
    marginRight: theme.spacing(2),
    flexGrow: "3",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuItemLinks: {
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    flexGrow: 0.6,
  },
  cartButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "1rem",
    margin: "0 0.4rem",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  container: {
    maxWidth: "1024px",
    margin: "0 auto",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    margin: "0 auto",
    width: "94%",
    // maxWidth: "1440px",
    // maxWidth: "1024px",
    boxShadow: "none",
    left: 0,
    transition: theme.transitions.create("width"),
    // [theme.breakpoints.up("md")]: {
    //   paddingLeft: theme.spacing(6),
    //   paddingRight: theme.spacing(6),
    // },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    color: "#0e789b",
  },
  toolbar: {
    ...theme.mixins.toolbar,
    width: "100%",
    margin: "0 auto",
    maxWidth: "1024px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  active: {
    fontWeight: "bold",
    // background: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    // color: "#fff",
    fontSize: "1.1rem",
  },
  logo: {
    width: "2rem",
    // height: "2rem"
  },
  nav: {
    width: "auto",
    height: "100vh",
  },
  navlink: {
    padding: "1.4rem 2rem",
    fontSize: "1.2rem",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
  },
  grid: {
    display: "flex",
  },
})

export default styles
