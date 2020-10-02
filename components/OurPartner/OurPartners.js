/* eslint-disable import/no-unresolved */
import React from "react"
// import glo from "../images/Glo_button.png";
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
// import dhub from "../../images/dhub.jpg"
// import tef from "../../images/TEF.png"
import dhub from "images/dhub.jpg"
import tef from "images/TEF.png"
import styles from "../../styles/OurPartnerStyle"
import Partner from "./Partner"

const useStyles = makeStyles(styles)
const OurPartners = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.container}>
        <Typography gutterBottom align="center" variant="h3" component="h2">
          Our Partner
        </Typography>

        <div className={classes.wrapper}>
          <Partner
            className={classes.logo}
            // logo="/dhub.jpg"
            logo={dhub}
            alt="Dhub"
            style={{ width: "50%" }}
          />
        </div>
      </div>
      <div className={classes.container}>
        <Typography gutterBottom align="center" variant="h3" component="h2">
          Our Sponsor
        </Typography>

        <div className={classes.wrapper}>
          <Partner
            className={classes.logo}
            // logo="/TEF.png"
            logo={tef}
            alt="Tony Elemelu Foundation"
            style={{ width: "110%" }}
          />
          {/* <Partner className={classes.logo} logo={glo} /> */}
        </div>
      </div>
    </>
  )
}

export default OurPartners
