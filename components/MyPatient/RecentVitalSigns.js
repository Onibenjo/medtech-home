import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { FaHeartbeat, FaStethoscope, FaTemperatureHigh } from "react-icons/fa"
import { GiBackPain } from "react-icons/gi"
import { IoIosPulse } from "react-icons/io"
import Grid from "@material-ui/core/Grid"
import RecordBox from "../MyRecord/RecordBox"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  heading: {
    marginBottom: 16,
  },
}))

const RecentVitalSigns = () => {
  const medicalRecord = [
    {
      title: "Pulse",
      rate: "Rate :: 65 bpm",
      date: "08 Nov. 2019",
      time: "12:00pm",
      bgColor: "#47A93C",
      icon: <IoIosPulse color="#fff" fontSize="24px" />,
    },
    {
      title: "Blood Pressure",
      subtitle: "NIBP SYS / DIA",
      rate: "115 / 76 mmhg",
      map: "MAP 85",
      date: "08 Nov. 2019",
      time: "12:05pm",
      bgColor: "#C77C4B",
      icon: <FaHeartbeat color="#fff" fontSize="24px" />,
    },
    {
      title: "Respiratory",
      rate: "Rate :: 17 bpm",
      date: "08 Nov. 2019",
      time: "12:07pm",
      bgColor: "#5982C0",
      icon: <FaStethoscope color="#fff" fontSize="24px" />,
    },
    {
      title: "Pain Level",
      rate: "Rate :: 0",
      date: "08 Nov. 2019",
      time: "12:10pm",
      bgColor: "#C34D4D",
      icon: <GiBackPain color="#fff" fontSize="24px" />,
    },
    {
      title: "Temperature",
      rate: "Rate :: 37 C",
      date: "08 Nov. 2019",
      time: "12:13pm",
      bgColor: "#73428C",
      icon: <FaTemperatureHigh color="#fff" fontSize="24px" />,
    },
  ]
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h5" className={classes.heading}>
        Recent vital signs
      </Typography>
      <Grid container spacing={2}>
        {medicalRecord.map((record, i) => (
          <RecordBox
            key={i}
            action={record.map}
            title={record.title}
            rate={record.rate}
            date={record.date}
            time={record.time}
            background={record.bgColor}
            icon={record.icon}
            subtitle={record.subtitle}
          />
        ))}
      </Grid>
    </div>
  )
}
export default RecentVitalSigns
