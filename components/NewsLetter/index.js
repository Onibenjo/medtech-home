import React from "react"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Button from "../CustomButtons/Button"

const useStyles = makeStyles((theme) => ({
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
    margin: "0 auto",
    padding: "2rem 0",
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginLeft: 8,
  },
}))

const NewsLetter = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
        spacing={3}
      >
        <Grid item xs={12} md={5} sm={12}>
          <Typography
            // className="subscribe"
            align="center"
            variant="h4"
          >
            Subscribe to our Newsletter
          </Typography>
        </Grid>
        <Grid item md={7} xs={12} sm={12} className={classes.grid}>
          <Grid container alignItems="center" justify="center">
            <Grid item md={8}>
              <TextField
                id="outlined-basic"
                color="primary"
                size="small"
                label="Enter your email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item md={4}>
              <Button color="twitter" className={classes.btn} size="small">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default NewsLetter
