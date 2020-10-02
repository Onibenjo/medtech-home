import { createStyles, Theme } from "@material-ui/core/styles"

const width = (theme: Theme) => theme.sidebarWidth * 1.3

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      // backgroundColor: "#f9f6f6",
      // backgroundColor: "#F3F6F9",
      // backgroundColor: "#F3F5F7",
      // backgroundColor: "#F4F7FC",
      // backgroundColor: "#E6E7EB",
      backgroundColor: "#F8F9FA",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: width(theme),
        flexShrink: 0,
        // fontSize: "1.1rem",
      },
      // color: "#fff",
    },
    drawerPaper: {
      fontFamily: "'Gordita', 'Poppins', 'Lato', sans-serif",
      width: theme.sidebarWidth,
      [theme.breakpoints.up("md")]: {
        width: width(theme),
        fontSize: "1.3rem",
      },
      backgroundColor: "#fff",
      // backgroundColor: "#3F4C67",
      // color: "#fff",
      boxShadow: theme.shadows[1],
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${width(theme)}px)`,
        marginLeft: width(theme),
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${width(theme)}px)`,
        marginLeft: width(theme),
      },
      minHeight: "90vh",
      paddingBottom: theme.spacing(8),
    },
    darkIcon: {
      // color: "#03d170",
      color: "rgba(0,0,0,0.7)",
    },
    lightIcon: {
      color: "#fff",
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      flexGrow: 1,
      alignSelf: "flex-end",
      color: "rgba(0,0,0,0.6)",
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    img: {
      // width: "1.5rem",
      width: "15%",
      // height: "1.5rem",
      marginRight: ".8rem",
      [theme.breakpoints.down("sm")]: {
        width: "30%",
        height: "auto",
        marginRight: 0,
        marginBottom: 2,
      },
    },
    companyName: {
      display: "flex",
      fontWeight: 600,
      fontSize: "1.2rem",
      justifyContent: "center",
      alignItems: "center",
      padding: "1.1rem .3rem",
      whiteSpace: "nowrap",
      color: theme.palette.secondary.light,
      fontFamily: "'Poppins', 'Lato', sans-serif",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "1rem .3rem 0.9rem",
        flexDirection: "column",
      },
    },
    activelink: {
      // backgroundColor: "#275745",
      color: `${theme.palette.common.white} !important`,
      backgroundColor: theme.palette.secondary.main,
      // backgroundColor: theme.palette.primary.main,
      // color: `${theme.palette.primary.dark} !important`,
      // backgroundColor: "rgba(0,0,0,0.05)",
      // fontSize: "1.07rem !important",
      // borderLeft: `5px solid ${theme.palette.primary.main}`,
      fontWeight: 500,
      borderRadius: 5,
      "& > *": {
        color: `${theme.palette.common.white} !important`,
      },
    },
    icon: {
      margin: 10,
    },
    listText: {
      display: "flex",
      fontSize: "0.9rem",
      alignItems: "center",
      color: "rgba(0,0,0,0.7)",
      justifyItems: "center",
      whiteSpace: "nowrap",
      margin: "0.05rem auto",
      padding: "0.1rem 0.7rem",
      width: "90%",
      "&:hover": {
        color: "rgba(0,0,0,0.8)",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 5,
        "& > *": {
          color: `${theme.palette.common.white} !important`,
        },
      },
      [theme.breakpoints.up("md")]: {
        // fontSize: "1.1rem",
        width: "80%",
        margin: "0.3rem auto",
        padding: "0.3rem 1rem",
      },
    },
    link: {
      fontSize: "0.9rem",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
    },
    bottomNav: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      boxShadow: theme.shadows[7],
      "& > *": {
        fontSize: "1.2rem",
      },
    },
  })

export default styles
