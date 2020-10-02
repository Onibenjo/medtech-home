import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
  root: {
    minWidth: 345,
  },
  gridCard: {
    display: "flex",
    justifyContent: "center",
  },
})

export default function Plan({
  subtitle,
  rate,
  title,
  background,
  icon,
  action,
  date,
  time,
  ...props
}) {
  const classes = useStyles
  const subheader = (
    <div style={{ color: "#d7d7d7" }}>
      {subtitle} <br /> {rate}
    </div>
  )
  const titleComp = <div style={{ fontSize: 24 }}>{title}</div>
  return (
    <Grid
      item
      md={6}
      lg={4}
      sm={12}
      xs={12}
      className={classes.gridCard}
      {...props}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardHeader
            title={titleComp}
            subheader={subheader}
            align="left"
            style={{
              backgroundColor: `${background}`,
              color: "#fff",
            }}
            avatar={icon}
            action={action}
          />
          <CardContent>
            <Typography variant="body2" component="p">
              Date : {date}
            </Typography>
            <Typography variant="body2" component="p">
              Time : {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
