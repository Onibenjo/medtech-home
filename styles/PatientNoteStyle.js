import { primaryColor } from "assets/jss/nextjs-material-kit.js"
import { container } from "../assets/jss/nextjs-material-kit.js"

const styles = () => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    // paddingTop: "1vh",
    color: "#FFFFFF",
    paddingBottom: "50px",
  },
  form: {
    margin: "0",
    display: "flex",
    justifyContent: "space-around",
    padding: "1rem 4rem",
    flexDirection: "column",
  },
  cardHeader: {
    borderRadius: "3px",
    padding: "1rem 15px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "10px",
    textAlign: "center",
    border: "0",
    marginBottom: "0",
  },
  grid: {
    color: "#000",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Lato",
    padding: "0",
    borderRadius: " 9px",
    lineHeight: "1.4",
    // background: "#fcfcfc",
    "& > *": {
      margin: ".3rem 0",
    },
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "flex-end !important",
  },
  textField: {
    width: "100%",
    marginBottom: "17px",
    marginTop: "10px",
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
})

export default styles
