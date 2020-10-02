const styles = (theme) => ({
  root: {
    marginLeft: "-20px",
  },
  image: {
    marginTop: "-20px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "0",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
      width: "140%",
    },
  },
})
export default styles
