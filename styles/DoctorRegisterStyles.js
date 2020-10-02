import { primaryColor } from "assets/jss/nextjs-material-kit.js"
import { container } from "../assets/jss/nextjs-material-kit.js"

const styles = () => ({
  btnColor: {
    color: "#d7d7d7",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  formControl: {
    margin: "0 0 17px 0",
  },
  underline: {
    "&:hover:before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
    },
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "7vh",
    color: "#FFFFFF",
    paddingBottom: "50px",
    display: "flex",
    flexWrap: "wrap",
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    borderRadius: "3px",
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
  pageHeader: {
    minHeight: "80vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "@media (max-width: 576px)": {
      minHeight: "650px",
    },
    "&:before": {
      background: "rgba(0, 0, 0, 0.01)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "flex-end !important",
  },
  root: {
    position: "relative",
  },
  bannerText: {
    position: "absolute",
    left: "24px",
    bottom: "64px",
    color: "#fff",
  },
  circle: {
    height: "20px",
    flex: 1,
    minWidth: "20px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "inline-block",
    textAlign: "center",
  },
  line: {
    flex: 2,
    margin: "auto 2px",
    height: "2px",
    backgroundColor: "#fff",
  },
  visible: {
    cursor: "pointer",
  },
  textField: {
    width: "100%",
    marginBottom: "17px",
    "&:hover:before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
    },
  },
})

export default styles
