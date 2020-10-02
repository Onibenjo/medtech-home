const styles = (theme) => ({
  appBar: {
    position: "relative",
    background: theme.palette.secondary.main,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttonContainer: {
    marginBottom: "24px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "rgba(0,0,0,0.6)",
  },
  appBarContainer: {
    padding: theme.spacing(2),
    overflowX: "hidden",
  },
  header: {
    margin: "32px 0",
  },
  searchContainer: {
    display: "flex",
  },
  buttongridContainer: {
    marginTop: 18,
  },
  label: {
    color: "rgba(0, 0, 0, 0.87) !important",
  },
})
export default styles
