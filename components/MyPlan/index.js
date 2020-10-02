import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import familyImage from "../../images/familyPlan.png"
import individualImage from "../../images/individualPlan.png"
import styles from "../../styles/MyPlanStyle"

const useStyles = makeStyles(styles)

export default function Plan() {
  const classes = useStyles()

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={6} sm={12} className={classes.gridCard}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardHeader
              title="FAMILY PLAN"
              align="center"
              style={{ color: "#03D170" }}
            />
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={familyImage}
              title="Flamily Plan"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h5"
                align="center"
              >
                SAVE 25% SUBSCRIBING TO A FAMILY PLAN
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="h2"
                color="primary"
              >
                NUMBER OF FAMILY
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                align="center"
                component="p"
              >
                ADULT MAXIMUM IS 2 PEOPLE
                <br />
                KIDS MAXIMUM IS 4 PEOPLE
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="h2"
                color="primary"
              >
                Rate
              </Typography>
              <Typography gutterBottom align="center" component="h6">
                N3.40Kobo/sec
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              align="center"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#00a8e1" }}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={6} sm={12} className={classes.gridCard}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardHeader
              title="INDIVIDUAL PLAN"
              align="center"
              style={{ color: "#03D170" }}
            />
            <CardMedia
              component="img"
              alt="individual"
              height="200"
              image={individualImage}
              title="Individual Plan"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h5"
                align="center"
              >
                ENJOY INSTANT ACCESS TO OUR BOARD CERTIFIED DOCTORS
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="h2"
                color="primary"
              >
                Rate
              </Typography>
              <Typography gutterBottom align="center" component="h6">
                N2.40Kobo/sec
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              align="center"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#00a8e1" }}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
