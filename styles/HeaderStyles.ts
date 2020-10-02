import { createStyles, Theme } from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // [theme.breakpoints.up("sm")]: {
      //   // height: "40vh",
      //   minHeight: 670,
      //   maxHeight: 1300,
      // },
      // backgroundImage:
      //   "url(https://source.unsplash.com/random/?medical,healthcare)",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#fefefe",
      backgroundSize: "cover",
      backgroundPosition: "center",
      // [theme.breakpoints.down("sm")]: {
      //   minHeight: "60vh",
      // },
    },
    btn1: {
      marginRight: theme.spacing(2),
    },
    btn: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
    container: {
      padding: `0 ${theme.spacing(4)}px ${theme.spacing(1)}px`,
      justifyContent: "center",
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "left",
    },
    headerText: {
      width: "100%",
      textAlign: "left",
      fontFamily: "'Raleway', sans-serif",
      fontSize: "1rem",
      display: "none",
    },
    headerTitle: {
      fontSize: "1.5em",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      // textAlign: "center",
    },
  })
export default styles
