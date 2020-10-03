import React from "react"
import Link from "next/link"
import Grid from "@material-ui/core/Grid"
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Button from "../CustomButtons/Button"
import styles from "../../styles/HeaderStyles"

const useStyles = makeStyles(styles)

const Header = () => {
  const classes = useStyles()
  return (
    <header className={classes.root} style={{ minHeight: '80vh' }}>
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12} sm={10} md={6} className={classes.item}>
          <img style={{ width: "100%" }} src="logo2.svg" alt="medical doctor" />
        </Grid>
        <Grid item xs={12} sm={10} md={5} className={classes.item}>
          <Typography
            variant="h3"
            component="h1"
            className={classes.headerTitle}
          >
            The easiest, fastest and most affordable way to talk to a doctor
          </Typography>
          {/* <Typography variant="h5" className={classes.headerText}>
            An innovative medical technology company creating equity in
            healthcare by connecting deprived Africans to board-certified
            physicians and help predict future health conditions at an
            affordable cost.
          </Typography> */}
          <div className={classes.btn}>
            {/* <Link href="/login"> */}
              <Button
                color="primary"
                round
                className={classes.btn1}
                component="a"
                href="https://medtech.africa/login"
              >
                Login
              </Button>
            {/* </Link> */}
            <Link href="/register-as">
              <Button color="secondary" round component="a">
                Create free account
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header
