const nelson =
  "https://res.cloudinary.com/benjo/image/upload/v1579541555/med/nelson.jpg"
const zainab =
  "https://res.cloudinary.com/benjo/image/upload/v1579541555/med/zainab.jpg"
const emine =
  "https://res.cloudinary.com/benjo/image/upload/v1579541555/med/Emine.jpg"
const ben =
  "https://avatars0.githubusercontent.com/u/40042573?s=460&u=3146d9c53b10084a9166fe4338a4be38863e3a36&v=4"

// import nelson from "../components/Teams/images/nelson.jpeg";
// import zainab from "../components/Teams/images/zainab.jpeg";
// import emine from "../components/Teams/images/Emine.jpeg";
const styles = () => ({
  team_container: {
    width: "95vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "0 20px",
  },
  team_member: {
    minWidth: 300,
    minHeight: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {},

  emine: {
    background: `url(${emine}) top center no-repeat`,
    backgroundSize: "cover",
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    marginBottom: 8,
  },
  nelson: {
    background: `url(${nelson}) top center no-repeat`,
    backgroundSize: "cover",
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    marginBottom: 8,
  },
  zainab: {
    background: `url(${zainab}) bottom center`,
    backgroundSize: "cover",
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    marginBottom: 8,
  },
  benjamin: {
    background: `url(${ben}) bottom center`,
    backgroundSize: "cover",
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    marginBottom: 8,
  },

  team_name: {
    fontSize: 24,
    fontWeight: 500,
  },

  team_details: {
    fontSize: 16,
  },
})
export default styles
