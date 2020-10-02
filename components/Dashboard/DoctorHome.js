import Link from "next/link"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import paths from "paths"
import { useAuth } from "utils/use-auth"
import { useDocument } from "hooks/useDocument"
import { useCollection } from "hooks/useCollection"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"
import CardFooter from "../Card/CardFooter"

const useStyles = makeStyles((theme) => ({
  cardBody: {
    height: "8rem",
    width: "100%",
    padding: "0",
    "& img": {
      height: "100%",
      objectFit: "cover",
    },
  },
  root: {
    margin: "0 auto",
    maxWidth: 1020,
  },
  container: {
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-start",
    },
  },
  cardFooter: {
    padding: "0.7375rem .875rem",
  },
}))

const greetingMessage = () => {
  const currentHour = new Date().getHours()
  return currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
    ? "Good morning"
    : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
    ? "Good afternoon"
    : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
    ? "Good evening" // if for some reason the calculation didn't work
    : "Welcome"
}
const DashboardHome = () => {
  const classes = useStyles()
  const {
    user: { uid, firstName, service, numAppointments },
  } = useAuth()
  const { data: wallet, loading: walletLoading } = useDocument(
    `doctors/${uid}/private/wallet`
  )
  const { data: patients, loading: pLoading } = useCollection(
    `doctors/${uid}/mypatients`
  )
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <div className="greeting">
            {greetingMessage()}, {firstName}
          </div>
        </Grid>
        <Link href={paths.patients}>
          <Grid item sm={5} md={4} xs={10} lg={3}>
            <div className="card">
              <div className="card_left">
                <img
                  src="/images/svg/user_groups.svg"
                  width="24px"
                  alt="patient count"
                />
              </div>
              <div className="card_right">
                <div className="card_title">Patients</div>
                <div className="card_content">
                  {pLoading ? "loading..." : patients.length}
                </div>
              </div>
            </div>
          </Grid>
        </Link>
        {service === "paid" && (
          <Link href={paths.docBankAccount}>
            <Grid item sm={5} md={4} xs={10} lg={3}>
              <div className="card">
                <div className="card_left">
                  <img
                    src="/images/svg/naira.svg"
                    width="24px"
                    alt="medtech coin"
                  />
                </div>
                <div className="card_right">
                  <div className="card_title">Income</div>
                  <div className="card_content">
                    {walletLoading ? "Loading..." : wallet.balance || 0}
                  </div>
                </div>
              </div>
            </Grid>
          </Link>
        )}
        <Link href={paths.doctorAppt}>
          <Grid item sm={5} md={4} xs={10} lg={3}>
            <div className="card">
              <div className="card_left">
                <img
                  src="/images/svg/planner.svg"
                  width="24px"
                  alt="patient count"
                />
              </div>
              <div className="card_right">
                <div className="card_title">Appointments</div>
                <div className="card_content">{numAppointments || 0}</div>
              </div>
            </div>
          </Grid>
        </Link>
      </Grid>
      <Grid container spacing={3} className={classes.container}>
        <Grid item sm={5} md={4} xs={10} lg={3}>
          <Link href={paths.patients} passHref>
            <a>
              <Card>
                <CardBody className={classes.cardBody}>
                  <img
                    src="my patient.jpeg"
                    alt="my patient list"
                    style={{
                      width: "100%",
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <span>My Patient List</span>
                </CardFooter>
              </Card>
            </a>
          </Link>
        </Grid>
        <Grid item sm={5} md={4} xs={10} lg={3}>
          <Link href={paths.doctorAppt} passHref>
            <a>
              <Card>
                <CardBody className={classes.cardBody}>
                  <img
                    src="my appointment.jpeg"
                    alt="my appointment"
                    style={{
                      width: "100%",
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <span>My Appointment</span>
                </CardFooter>
              </Card>
            </a>
          </Link>
        </Grid>
        {/* <Grid item sm={5} md={4} xs={10} lg={2}>
          <Link href={paths.healthtracker}>
            <a>
              <Card>
                <CardBody className={classes.cardBody}>
                  <img
                    src="patient health.jpeg"
                    alt="patient health"
                    style={{
                      width: "100%",
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <span>Patient Health Tracker</span>
                </CardFooter>
              </Card>
            </a>
          </Link>
        </Grid> */}
      </Grid>
      <style jsx>{`
        .card {
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 1);
          display: flex;
          font-size: 1rem;
          padding: .9rem 1rem;
          justify-content: space-around;
          align-items: center;
          box-shadow: 1px 2px 5px 1px rgba(0,0,0,0.1);
        }
        .card_left {
          padding: .1rem .5rem;
          background: rgba(0,0,0,.04);
          border-radius: 8px;
        }
        .card_right {
          text-align: center;
          line-height: 1;
        }
        .card_title {
          font-size: 0.8rem;
          line-height: 2;
          font-weight: 500;
        }
        .card_content {
        font-size: 1.2rem;
        font-weight: bold;
      `}</style>
    </div>
  )
}

export default DashboardHome
