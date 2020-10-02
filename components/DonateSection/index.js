import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Link from "../ActiveLink/Link"
import Button from "../CustomButtons/Button"

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.h4,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  wrapper: {
    // backgroundColor: theme.palette.dark.main,
    // color: "white"
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
    fontSize: "1rem",
    minHeight: "50vh",
  },
  btn: {
    marginLeft: 8,
  },
  donate_text: {
    fontSize: "1.1rem",
    padding: "3rem 0",
    marginRight: 16,
  },
  donate_container: {
    padding: "0 1rem",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const DonateSection = () => {
  const classes = useStyles()
  return (
    <section className={classes.wrapper}>
      <h2 className={classes.title}>
        Sponsor a less privileged Africans medical bill
      </h2>
      <Grid container className={classes.donate_container}>
        <Grid item md={8} xs={12}>
          <p className={classes.donate_text}>
            Directly pay for a sick person who cannot afford to foot his/her
            medical bill
          </p>
        </Grid>
        <Grid item md={4} xs={12} className={classes.buttonContainer}>
          <Link href="/donate">
            <Button color="primary">Sponsor now</Button>
          </Link>
        </Grid>
      </Grid>
    </section>
  )
}
export default DonateSection
