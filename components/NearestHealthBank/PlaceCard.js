import React from "react"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import Grid from "@material-ui/core/Grid"

// TODO: info is bad naming.
const PlaceCard = ({ info }) => {
  const {
    address,
    distanceText,
    name,
    openNow,
    photoUrl,
    rating,
    timeText,
  } = info
  return (
    <Grid item xs={11} sm={4}>
      {/* <div key={key} className="col-3 w-100 mx-4 my-4">
      <img src={photoUrl} className="image-wrapper-sm mb-2" alt="ice-cream" />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className="d-block mb-1">{address}</span>
          <span className="d-block">{distanceText}</span>
          <span className="d-block">{timeText}</span>
        </div>
        <ul className="list-group list-group-flush">
          {openNow ?
            <li className="list-group-item">Open</li>
            :
            <li className="list-group-item">Closed</li>
          }
          <li className="list-group-item">Rating - {rating} </li>
        </ul>
      </div>
      </div> */}
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Health Bank"
            height="200"
            image={photoUrl}
            title="Health Bank"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography className="d-block mb-1">{address}</Typography>
            <Typography className="d-block">{distanceText}</Typography>
            <Typography className="d-block">{timeText}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default PlaceCard
