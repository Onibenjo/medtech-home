const styles = (theme) => ({
  download_section: {
    paddingTop: "2rem",
    display: "flex",
    width: "100%",
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "5rem",
    paddingBottom: "3rem",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  download_windows: {
    width: "50%",
    maxHeight: "4rem",
    minHeight: "3.3rem",
    display: "flex",
    backgroundColor: " #000",
    color: " #fff",
    border: "none",
    fontSize: "1rem",
    boxSizing: "border-box",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Poppins", serif',
    letterSpacing: "0.25rem",
  },
  download_windows_text: {
    textAlign: "left",
    marginLeft: 10,
  },
  download_windows_text_small: {
    fontSize: "0.7em",
    letterSpacing: "0.15rem",
    display: "block",
  },
  download_section_h1: {
    ...theme.typography.h3,
  },
  download_section_btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& img": {
      paddingBottom: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gridGap: "1.4rem",
      // width: "80%",
      height: "6rem",
      "& img, button": {
        height: "100%",
        width: "100%",
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      width: "60%",
      height: "100%",
      "& img, button": {
        height: "100%",
        width: "100%",
      },
      "& button": {
        fontSize: "0.8rem",
      },
    },
  },
})
export default styles
