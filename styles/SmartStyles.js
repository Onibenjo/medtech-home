const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    height: "auto",
    paddingTop: "2rem",
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  container: {
    width: "90%",
    // height: "50%",
    backgroundColor: "white",
    padding: "22",
    margin: "0 auto",
    maxWidth: "680px",
  },
  //   imagecontainer: {
  //     width: "100%",
  //     height: "700px",
  //     marginBottom: "-120px"
  //   },
  //   image: {
  //     maxWidth: "70%",
  //     height: "70%",
  //     background: "url(smartMOT.jpeg)",
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat"
  //   },
  list: {
    width: "100%",
    margin: "0 auto",
  },
  header: {
    width: "100%",
    backgroundColor: "#03D170",
    color: "white",
    fontWeight: "600",
    fontSize: "2rem",
    textAlign: "center",
  },
})
export default styles
