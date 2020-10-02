const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "none",
  },
  upload: {
    fontSize: 38,
  },
  uploadCon: {
    marginLeft: "-30px",
    zIndex: "2",
    backgroundColor: "rgba(255,255,255,0.4)",
    padding: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    cursor: "pointer",
  },
  large: {
    width: "106px",
    height: "106px",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1),
    alignItems: "flex-end",
  },
})
export default styles
