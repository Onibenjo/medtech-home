import Link from "next/link"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import paths from "paths"
import { useAuth } from "utils/use-auth"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"
import CardFooter from "../Card/CardFooter"

const useStyles = makeStyles((theme) => ({
  cardBody: {
    minHeight: "7rem",
    // maxHeight: "15rem",
    width: "100%",
    padding: "0",
    marginBottom: 0,
  },
  container: {
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-start",
    },
  },
  cardFooter: {
    padding: "0.7375rem .6875rem",
    fontSize: "0.85rem",
    lineHeight: "1.5rem",
  },
}))

const items = [
  {
    path: paths.seeDoctor,
    src: "See a doctor.jpeg",
    alt: "See a doctor",
    footer: "See A Doctor",
  },
  // {
  //   path: paths.healthbank,
  //   src: "nearest healthbank.jpeg",
  //   alt: "nearest healthbank",
  //   footer: "Nearest Health Bank",
  // },
  {
    path: paths.myRecord,
    src: "my record.jpeg",
    alt: "my record",
    footer: "My Record",
  },
  // {
  //   path: paths.healthbank,
  //   src: "locate phar.jpeg",
  //   alt: "locate pharmacy",
  //   footer: "Nearest Pharmacy",
  // },
  // {
  //   path: paths.myPlan,
  //   src: "my plan.jpeg",
  //   alt: "my plan",
  //   footer: "My Plans",
  // },
  {
    path: paths.scheduleAppt,
    src: "schedule appointment.jpeg",
    alt: "appointments",
    footer: "Appointments",
  },
]
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
    user: { firstName },
  } = useAuth()
  return (
    <div>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <div className="greeting">
            {greetingMessage()}, {firstName}
          </div>
        </Grid>
        {items.map((item) => (
          <Grid item sm={4} md={4} xs={10} lg={2} key={item.path}>
            <Link href={item.path} passHref>
              <a>
                <Card>
                  <CardBody className={classes.cardBody}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        height: "8rem",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <span>{item.footer}</span>
                  </CardFooter>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default DashboardHome
