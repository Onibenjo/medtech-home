import { getDocLayout } from "components/Account/AccountLayout"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import StarRating from "components/StarRating"
import Grid from "@material-ui/core/Grid"
import formatDistance from "date-fns/formatDistance"

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 140 },
})

const PatientCard = ({
  rating,
  reviewNote,
  patientImage,
  patientName,
  createdAt,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={patientImage} />
        {/* <UserAvatar
            aria-label={patietnName}
            user={{ displayName: patientNamme, thumbnail: patientImage }}
            className={classes.avatar}
          /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {patientName}
          </Typography>
          {/* <Typography gutterBottom variant="caption">
            {patientName} {formatRelative(createdAt.toDate(), new Date())}
          </Typography> */}
          <Typography gutterBottom variant="caption">
            {formatDistance(createdAt.toDate(), new Date())}
          </Typography>
          <StarRating rating={rating} />
          <Typography variant="body2" color="textSecondary" component="p">
            {reviewNote}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const ReviewsPage = () => {
  const { user } = useAuth()

  const { data: reviews, loading, error, retry } = useCollection(
    `doctors/${user.uid}/reviews`,
    {
      orderBy: "createdAt",
    }
  )

  if (loading) return <center>Loading....</center>
  if (error)
    return (
      <center>
        There was error loading reviews{" "}
        <button onClick={retry} type="button">
          retry
        </button>
      </center>
    )
  if (!reviews.length) return <center>You currently have no reviews</center>

  return (
    <Grid container spacing={5}>
      {reviews &&
        reviews.map((review) => (
          <Grid item key={review.id} xs={12} sm={6} md={4} lg={4} xl={3}>
            <PatientCard key={review.id} {...review} />
          </Grid>
        ))}
    </Grid>
  )
}

ReviewsPage.getLayout = getDocLayout
export default ReviewsPage
