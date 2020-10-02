const styles = (theme) => ({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: `2rem ${theme.spacing(2)}px`,
    boxSizing: "border-content",
    margin: 0,
  },
  wrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(70px, 0.4fr))",
    justifyContent: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
export default styles
