import Image from "components/Image"
import Typography from "@material-ui/core/Typography"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"
import image4 from "../../images/image4.jpg"
import image5 from "../../images/image5.jpg"
import image6 from "../../images/image6.jpg"
import styles from "../../styles/FeaturesStyle"

// import Grid from "@material-ui/core/Grid"

// import image7 from "../../images/image7.jpg"

const useStyles = makeStyles(styles)

const gridOptions = {
  xs: 11,
  sm: 6,
  md: 4,
  lg: 4,
}

const Featured = () => {
  // const classes = useStyles()
  const classes = useStyles()

  // useEffect(() => {
  //   lazyLoadImages("img")
  // }, [])
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <GridContainer
        justify="center"
        className={clsx(classes.gridContainer, classes.pt)}
        align="center"
        spacing={3}
      >
        <GridItem {...gridOptions}>
          <div className={classes.gridItem}>
            <Image src={image2} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                Focused on you
              </Typography>
              <Typography variant="body1">
                Choose a convenient consultation method, voice or video call.{" "}
              </Typography>
              <Typography variant="body1">
                Your virtual clinic is controlled by you.
              </Typography>
            </div>
          </div>
        </GridItem>
        <GridItem {...gridOptions}>
          <div className={classes.gridItem}>
            <Image src={image4} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                PayGo Medical Consultation
              </Typography>
              <Typography variant="body1">
                Pay for your exact consultant time.{" "}
              </Typography>
              <Typography variant="body1">No bogus bills. </Typography>
              <Typography variant="body1">
                See a doctor with as low as N600.
              </Typography>
            </div>
          </div>
        </GridItem>
        <GridItem {...gridOptions}>
          <div className={classes.gridItem}>
            <Image src={image3} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                On Demand and Scheduled Consultation
              </Typography>
              <Typography variant="body1">
                See a doctor immediately.{" "}
              </Typography>
              <Typography variant="body1">
                Choose a convenient time & day to talk to a doctor.
              </Typography>
            </div>
          </div>
        </GridItem>
        <GridItem {...gridOptions}>
          <div className={classes.gridItem}>
            <Image src={image1} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                Medical History & Recomendations
              </Typography>
              <Typography variant="body1">
                Easy to access medical history and records.
              </Typography>
              <Typography variant="body1">
                Instant notifications from your doctors.
              </Typography>
            </div>
          </div>
        </GridItem>
        <GridItem {...gridOptions}>
          <div className={classes.gridItem}>
            <Image src={image5} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                AI powered Analytics
              </Typography>
              <Typography variant="body1">
                The best doctor companion for better informed choice.
              </Typography>
            </div>
          </div>
        </GridItem>
        <GridItem {...gridOptions}>
          <div className={classes.grid}>
            <Image src={image6} className={classes.image} />
            <div className={classes.content}>
              <Typography component="p" variant="h6">
                Community Account
              </Typography>
              <Typography variant="body1">
                Multiple account for family and friends with one app.{" "}
              </Typography>
              <Typography variant="body1">
                One wallet payment system for multiple users.
              </Typography>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <Typography component="h2" variant="h4" align="center">
        For doctors:
      </Typography>
      <GridContainer
        justify="center"
        className={classes.gridContainer}
        align="center"
        spacing={3}
      >
        <GridItem {...gridOptions}>
          {/* <MdAttachMoney size={30} title="Money" /> */}
          {/* <img src="/svg/cash_in_hand.svg" alt="icon" width={75} /> */}
          <Image src="/svg/cash_in_hand.svg" alt="icon" width={75} />
          <p className={classes.gridHeader}>
            Earn anywhere, anytime as a doctor
          </p>
          <p>Consult with patients when you want. And Earn per hour.</p>
        </GridItem>
        <GridItem {...gridOptions}>
          {/* <MdSchedule size={30} title="Schedule" /> */}
          {/* <img src="/svg/schedule.svg" alt="icon" width={60} /> */}
          <Image src="/svg/schedule.svg" alt="icon" width={60} />
          <p className={classes.gridHeader}>Set your own schedule</p>
          <p>
            Only consult when it works for you. You control your time. Own your
            virtual clinic.
          </p>
        </GridItem>
        <GridItem {...gridOptions}>
          {/* <MdFileUpload size={30} title="Upload" /> */}
          {/* <img src="/svg/verified_account.svg" alt="icon" width={60} /> */}
          <Image src="/svg/verified_account.svg" alt="icon" width={60} />
          <p className={classes.gridHeader}>Signing up is easy</p>
          <p>
            Create an account and gain access to the platform. <br />
            If you are a doctor, upload your medical credentials for
            verification by our trusted doctor review team.
          </p>
        </GridItem>
      </GridContainer>
      {/* <div className={classes.root}>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography component="p" variant="h6">
              Medical History & Recomendations
            </Typography>
            <Typography variant="body1">
              Easy to access medical history and records. <br /> Instant
              notifications from your doctors.
            </Typography>
          </div>
          <Image
            src={image1}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
        </div>
        <div className={classes.details}>
          <Image
            src={image2}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
          <div className={classes.content}>
            <Typography component="p" variant="body1">
              Focused on you
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Choose a convenient consultation method, voice or video call.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Your virtual clinic is controlled by you.
            </Typography>
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography component="p" variant="body1">
              On Demand and Scheduled Consultation
            </Typography>
            <Typography variant="body1" color="textSecondary">
              See a doctor immediately.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Choose a convenient time & day to talk to a doctor.
            </Typography>
          </div>
          <Image
            src={image3}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
        </div>
        <div className={classes.details}>
          <Image
            src={image4}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
          <div className={classes.content}>
            <Typography component="p" variant="body1">
              PayGo Medical Consultation
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Pay for your exact consultant time.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              No bogus bills.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              See a doctor with as low as N600.
            </Typography>
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography component="p" variant="body1">
              AI powered Analytics
            </Typography>
            <Typography variant="body1" color="textSecondary">
              The best doctor companion for better informed choice.
            </Typography>
          </div>
          <Image
            src={image5}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
        </div>
        <div className={classes.details}>
          <Image
            src={image6}
            style={{
              width: "350px",
              height: "200px",
            }}
          />
          <div className={classes.content}>
            <Typography component="p" variant="h6">
              Community Account
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Multiple account for family and friends with one app.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              One wallet payment system for multiple users.
            </Typography>
          </div>
        </div>
      </div> */}
    </div>
  )
}
export default Featured
