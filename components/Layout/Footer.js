import React from "react"
// import dynamic from "next/dynamic"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FooterIcons from "./FooterIcons"
import Link from "../ActiveLink/Link"
import styles from "../../styles/FooterStyle"
// import Terms from "../Terms/Terms";
// import Policy from "../Policy/Policy";
const useStyles = makeStyles(styles)

// const Terms = dynamic(() => import("../Terms/Terms"))
// const Policy = dynamic(() => import("../Policy/Policy"))

// const Partner = dynamic(() => import("../partner/partner"))

const Footer = () => {
  // const [open, setOpen] = React.useState(false)
  // const [openPrivacy, setOpenPrivacy] = React.useState(false)

  const classes = useStyles()
  return (
    <footer className={classes.bg_dark}>
      {/* <Terms open={open} onClose={() => setOpen(false)} />
      <Policy open={openPrivacy} onClose={() => setOpenPrivacy(false)} /> */}
      {/* <Partner open={open} onClose={() => setOpen(false)} />  */}
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} className={classes.flex}>
            <Link href="/" className={classes.title}>
              Medtech Africa
            </Link>
            <Link href="/about">About Us</Link>
            {/* <Link naked  href="#">Our Products</Link> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.flex}>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              className={classes.title}
            >
              Health Bank
            </Typography>
            <Link naked href="/partner">
              Partner with us
            </Link>
            {/* <Link naked href="#" onClick={() => setOpen(true)}>
              Partner with us
            </Link> */}
            {/* <Typography id= "myFry">{partner}</Typography> */}
            <FooterIcons />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.flex}>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              className={classes.title}
            >
              Learn More
            </Typography>
            <Typography
              href="/contact"
              variant="body1"
              align="center"
              component="a"
            >
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.flex}>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              className={classes.title}
            >
              Legal
            </Typography>
            <Typography
              component={Link}
              href="/terms"
              variant="body1"
              align="center"
            >
              Terms and Conditions
            </Typography>
            <Typography
              component={Link}
              href="/policy"
              variant="body1"
              align="center"
            >
              Privacy Policy
            </Typography>
            {/* <Typography
              onClick={() => {
                setOpen(true)
              }}
              component="p"
              variant="body1"
              align="center"
            >
              Terms and Conditions
            </Typography>
            <Typography
              onClick={() => {
                setOpenPrivacy(true)
              }}
              component="p"
              variant="body1"
              align="center"
            >
              Privacy Policy
            </Typography> */}
            <Typography variant="body1" align="center">
              FAQs
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Typography className={classes.copyright} variant="body2" align="center">
        {"Copyright © "}
        Medtech
        {` ${new Date().getFullYear()} `}- All rights reserved
      </Typography>
    </footer>
  )
}

export default Footer
