const styles = (theme) => ({
  appBar: {
    position: "relative",
    background: theme.palette.secondary.main,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  btnColor: {
    color: "rgba(0,0,0,0.6)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
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
  },
  appBarContainer: {
    padding: theme.spacing(2),
    overflowX: "hidden",
  },
  label: {
    color: "rgba(0, 0, 0, 0.87) !important",
  },
  rotate: {
    animation: `$rotates 1s linear infinite`,
  },
  "@keyframes rotates": {
    "100%": {
      transform: " rotate(360deg)",
    },
  },
})
export default styles
