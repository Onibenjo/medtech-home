const styles = (theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "&:nth-child(even)": {
      textAlign: "right",
    },
    "&::nth-child(odd)": {
      textAlign: "left",
    },
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "1.0rem",
    textAlign: "center",
    borderRadius: "0.3rem",
  },
  gridItem: {
    padding: "1.5rem",
    textAlign: "center",
    borderRadius: "0.5rem",
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-0.1rem) scale(1.01)",
    },
  },
  content: {
    // width: "95%",
    margin: ".7rem 0",
    flexFlow: 1,
  },
  cover: {
    width: 150,
  },
  gridContainer: {
    color: "#000",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Lato",
    borderRadius: " 9px",
    lineHeight: "1.4",
    padding: "0 0 3rem",
    maxWidth: "89%",
    margin: "0 auto",
    // background: "#fcfcfc",
    "& > *": {
      margin: ".3rem 0",
    },
  },
  pt: {
    paddingTop: "9rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "6rem",
    },
  },
  gridHeader: {
    fontSize: "1.1rem",
    fontWeight: 500,
    fontFamily: "'Montserrat', sans-serif",
  },
  image: {
    width: "100%",
    height: "auto",
    [theme.breakpoints.up("sm")]: {
      height: "14rem",
    },
  },
})
export default styles
