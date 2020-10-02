const style = (theme) => ({
  rootNew: {
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(19),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(17),
    color: theme.palette.text.secondary,
  },
  icon: {
    textAlign: "center",
    zIndex: "3",
  },
  camera: {
    zIndex: "2",
    textAlign: "center",
    background: "#C4C4C4",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "5px",
    top: "30%",
    marginLeft: "52%",
    marginTop: "-3em",
  },

  root: {
    maxWidth: 700,
  },
  card: {
    marginLeft: "18%",
  },
  header: {
    fontSize: "33px",
  },
  title: {
    fontSize: "33px",
  },
})

export default style
