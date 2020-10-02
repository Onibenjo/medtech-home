import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import GridItem from "../Grid/GridItem.js"

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 16,
  },
  content: {},
}))

const TreatmentCard = ({ reason, doctorname, treatment, ...rest }) => {
  const classes = useStyles()

  return (
    <GridItem xs={12} sm={6} md={6}>
      <Card className={classes.root} {...rest}>
        <CardHeader title={reason} subheader={`From: ${doctorname}`} />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textPrimary" component="p">
            {treatment}
          </Typography>
        </CardContent>
      </Card>
    </GridItem>
  )
}
export default TreatmentCard
