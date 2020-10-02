// import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import { MdArrowDropDown } from "react-icons/md"
import { IoIosVideocam } from "react-icons/io"
// import { FaHeartbeat, FaStethoscope, FaTemperatureHigh } from "react-icons/fa"
// import { GiBackPain } from "react-icons/gi"
import Grid from "@material-ui/core/Grid"
// import { db } from "utils/lib/firebase"
import { useCollection } from "hooks/useCollection"
// import RecordBox from "./RecordBox"
// import formatRelative from "date-fns/formatRelative"
import format from "date-fns/format"
import { useAuth } from "utils/use-auth"
import MedicalHistory from "./MedicalHistory"
import Loader from "../Loader/index2"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function MyRecord() {
  // const medicalRecord = [
  //   {
  //     title: "Pulse",
  //     rate: "Rate :: 65 bpm",
  //     date: "08 Nov. 2019",
  //     time: "12:00pm",
  //   },
  //   {
  //     title: "Blood Pressure",
  //     subtitle: "NIBP SYS / DIA",
  //     rate: "115 / 76 mmhg",
  //     map: "MAP 85",
  //     date: "08 Nov. 2019",
  //     time: "12:05pm",
  //   },
  //   {
  //     title: "Respiratory",
  //     rate: "Rate :: 17 bpm",
  //     date: "08 Nov. 2019",
  //     time: "12:07pm",
  //   },
  //   {
  //     title: "Pain Level",
  //     rate: "Rate :: 0",
  //     date: "08 Nov. 2019",
  //     time: "12:10pm",
  //   },
  //   {
  //     title: "Temperature",
  //     rate: "Rate :: 37 C",
  //     date: "08 Nov. 2019",
  //     time: "12:13pm",
  //   },
  // ]

  const { user } = useAuth()

  const { data: callHistory, loading } = useCollection(`calls`, {
    where: ["patientId", "==", user.uid],
    limit: 10,
  })

  // const parseDate = (date) => {
  //   return `${formatRelative(parseISO(date), new Date())}`
  // }

  const classes = useStyles()

  // const identifyIcon=(type)=>{
  //   if(type === "Pulse") return <IoIosPulse color="#fff" fontSize="24px" />
  //   else if(type === "Blood Pressure") return <FaHeartbeat color="#fff" fontSize="24px" />
  //   else if(type === "Respiratory") return <FaStethoscope color="#fff" fontSize="24px" />
  //   else if(type === "Pain Level") return <GiBackPain color="#fff" fontSize="24px" />
  //   else if(type === "Temperature") return <FaTemperatureHigh color="#fff" fontSize="24px" />
  // }
  // const identifyBgColor=(type)=>{
  //   if(type === "Pulse") return "#47A93C"
  //   else if(type === "Blood Pressure") return "#C77C4B"
  //   else if(type === "Respiratory") return "#5982C0"
  //   else if(type === "Pain Level") return "#C34D4D"
  //   else if(type === "Temperature") return "#73428C"

  // }

  return (
    <div className={classes.root}>
      {/* <Accordion>
        <AccordionSummary 
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Medical Record - Latest{" "}
          </Typography>
        </AccordionSummary >
        <AccordionDetails >
          <Grid container spacing={2}>
            {" "}
            {
              medicalRecord.length === 0? <Typography variant="body1" component="p"> No record Found</Typography> :
              medicalRecord.map((record, i) => (
              <RecordBox
                key={i}
                action={record.map}
                title={record.title}
                rate={record.rate}
                date={record.date}
                time={record.time}
                background={identifyBgColor(record.title)}
                icon={identifyIcon(record.title)}
                subtitle={record.subtitle}
              />
            ))}
          </Grid>
        </AccordionDetails >
      </Accordion> */}
      {/* <Accordion>
        <AccordionSummary 
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Medical Record - Previous
          </Typography>
        </AccordionSummary >
        <AccordionDetails >
          <Grid container spacing={2}>
          {
            medicalHistory.length === 0 ? 
            <Typography variant="body1" component="p"> No record Found</Typography> :
            medicalHistory.map((history,i)=><MedicalHistory key={i} icon={<MdHistory />} date={history.date} day={history.day} />)
          }
            
          </Grid>
        </AccordionDetails >
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}> Call History </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {loading ? (
              <Loader size={30} />
            ) : callHistory.length === 0 ? (
              <Typography variant="body1" component="p">
                {" "}
                No record Found
              </Typography>
            ) : (
              callHistory
                .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                .map((call, i) => (
                  <MedicalHistory
                    key={i}
                    call
                    icon={<IoIosVideocam />}
                    doctorId={call.doctorId}
                    date={
                      call.createdAt &&
                      format(call.createdAt.toDate(), "dd/MM/yyyy")
                    }
                    callTime={call.status}
                  />
                ))
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
