import React, { useState } from "react"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Slider from "react-slick"
import Button from "../CustomButtons/Button"
import smart1 from "./images/smart1.jpeg"
import smart2 from "./images/smart2.jpeg"
import healthbank from "./images/healthbank.jpeg"
import styles from "../../styles/OurProductStyle"
import FormDialog from "../modal"
import Partner from "../partner/partner"
import ChatBot from "./ChaBot"

function Product() {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [open2, setOpen2] = React.useState(false)

  const handleOpen2 = () => {
    setOpen2(true)
  }

  const handleClose2 = () => {
    setOpen2(false)
  }
  const classes = makeStyles(styles)()
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  }
  return (
    <>
      <FormDialog
        handleClickOpen={handleClickOpen}
        open={open}
        handleClose={handleClose}
      />
      <Partner
        handleOpen={handleOpen2}
        open={open2}
        handleClose={handleClose2}
      />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.heading} variant="h4" align="center">
            OUR PRODUCTS
          </Typography>
          <Typography variant="h6" align="center">
            Our various patent pending technology
          </Typography>
        </Grid>
        <Grid item xs={11} sm={4} className={classes.grid}>
          <Card className={classes.card}>
            <CardActionArea>
              <Slider {...settings}>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={smart1}
                    title="Smart MOT"
                  />
                </div>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={smart2}
                    title="Smart MOT"
                  />
                </div>
              </Slider>
              <CardContent className={classes.padding}>
                <Typography gutterBottom variant="h5" component="h2">
                  Smart MOT
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href="/products/smart-mot">
                <Button
                  link
                  className={classes.btn}
                  component="a"
                  // onClick={handleClickOpen}
                >
                  Pre-order
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={11} sm={4} className={classes.grid}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Health Bank"
                height="200"
                image={healthbank}
                title="Health Bank"
              />
              <CardContent className={classes.padding}>
                <Typography gutterBottom variant="h5" component="h2">
                  Health Bank
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button link className={classes.btn} onClick={handleOpen2}>
                Partner with us
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={11} sm={4} className={classes.grid}>
          <div className={classes.chatBot}>
            <ChatBot />
          </div>
        </Grid>
      </Grid>
    </>
  )
}
export default Product
