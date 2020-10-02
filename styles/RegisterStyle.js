import { primaryColor, container } from "assets/jss/nextjs-material-kit.js"

import { createStyles } from "@material-ui/core/styles"

const styles = createStyles({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "7vh",
    color: "#FFFFFF",
    paddingBottom: "50px",
  },
  form: {
    margin: "0",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "1.3rem",
    flexDirection: "column",
  },
  cardHeader: {
    borderRadius: "3px",
    padding: "1rem 15px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "30px",
    textAlign: "center",
    border: "0",
    marginBottom: "0",
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
  banner_text: {
    position: "absolute",
    left: "24px",
    bottom: "64px",
    color: "#fff",
  },
  span_group: {
    display: "flex",
    margin: "0 8px",
    height: "20px",
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
  pb2: { paddingBottom: "1.2rem" },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  stepper: {
    paddingBottom: 0,
  },
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
  bannerText: {
    position: "absolute",
    left: "24px",
    bottom: "64px",
    color: "#fff",
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
  successMessage: {
    padding: "64px 24px",
  },
  w90: {
    width: "90%",
  },
  grid: {
    color: "#000",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Lato",
    padding: "1rem 0",
    borderRadius: " 9px",
    lineHeight: "1.4",
    background: "#fcfcfc",
    "& > *": {
      margin: ".3rem 0",
    },
  },
  grid2: {
    color: "#000",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Lato",
    padding: "1rem 0",
    borderRadius: " 9px",
    lineHeight: "1.4",
    background: "#fcfcfc",
    "& > *": {
      margin: ".3rem 0",
    },
    margin: "auto",
    width: "70%",
  },
  gridHeader: {
    fontSize: "1.1rem",
    fontWeight: 500,
    fontFamily: "'Montserrat', sans-serif",
  },
})
export default styles
