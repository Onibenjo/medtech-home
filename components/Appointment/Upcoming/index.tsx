import Typography from "@material-ui/core/Typography"
import { useCollection } from "hooks/useCollection"
import Grid from "@material-ui/core/Grid"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useAuth } from "utils/use-auth"
import { makeStyles } from "@material-ui/core/styles"
import parseISO from "date-fns/parseISO"
import formatRelative from "date-fns/formatRelative"
import Card from "./UpcomingCard"

const useStyles = makeStyles(() => ({
  my: {
    margin: "12px 0",
    paddingLeft: "10px",
  },
  patientbtn: {
    textAlign: "center",
  },
  rotate: {
    animation: `$rotates 1s linear infinite`,
  },
  "@keyframes rotates": {
    "100%": {
      transform: " rotate(360deg)",
    },
  },
}))

const Upcoming = ({ handleClickOpen }) => {
  const classes = useStyles()
  const { user } = useAuth()

  const { data: upcomingAppointments, loading } = useCollection(
    "appointments",
    {
      listen: true,
      where: [
        ["doctor.id", "==", user.uid],
        ["status", "==", "accepted"],
      ],
      orderBy: ["date", "desc"],
    }
  )

  const parseDate = (date) => {
    return `${formatRelative(parseISO(date), new Date())}`
  }

  return (
    <>
      <Typography
        variant="h5"
        className={classes.my}
        component="h4"
        color="textSecondary"
      >
        Upcoming Appointment
      </Typography>
      <Grid container spacing={2}>
        {loading && <AiOutlineLoading3Quarters className={classes.rotate} />}
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((history, i) => {
            const date = parseDate(history.date)
            return (
              <Grid key={i} item md={4} sm={6} xs={12}>
                <Card
                  handleClickOpen={() => handleClickOpen(history.patient.id)}
                  details
                  name={history.patient.name}
                  date={date}
                  reason={history.reason}
                  image={history.patient.imageUrl}
                />
              </Grid>
            )
          })
        ) : (
          <Typography
            variant="body1"
            component="p"
            color="textSecondary"
            style={{ marginLeft: "12px", marginTop: "10px", padding: "10px" }}
          >
            No upcoming appointment
          </Typography>
        )}
      </Grid>
    </>
  )
}

export default Upcoming
