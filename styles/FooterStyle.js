const styles = () => ({
  bg_dark: {
    minHeight: "60vh",
    backgroundColor: "#333",
    color: "#fff",
    padding: "3rem 4rem 1rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    whiteSpace: "nowrap",
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "end",
    "& *": {
      textDecoration: "none",
      color: "#fff",
      fontSize: "1.1rem",
    },
  },
  copyright: {
    marginTop: 52,
    fontSize: 15,
  },
  title: {
    fontSize: "1.22rem",
    fontWeight: "bold",
    padding: ".7rem 0",
    margin: "0 0 .9rem 0",
    "& ~ *": {
      padding: ".7rem 0",
    },
  },
})
export default styles
