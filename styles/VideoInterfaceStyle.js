const styles = () => ({
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  secondPerson: {
    position: "absolute",
    bottom: "32px",
    right: "32px",
    height: "20%",
    width: "19%",
    borderRadius: "12px",
    boxShadow: "0px 2px 3px #777",
  },
  firstPerson: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButtons: {
    position: "absolute",
    bottom: "32px",
    right: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
  },
})
export default styles
