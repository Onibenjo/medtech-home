import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import { MdArrowDropDown } from "react-icons/md"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}))

export default function MedicalInfo() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Medical Info
        </h3>
        <List>
          <ListItem>
            <ListItemText primary="Blood Group" secondary="" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Genotype" secondary="" />
          </ListItem>
        </List>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Surgical History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* {medicalRecord.map((record, i) => (
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
            ))} */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Obsteric History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Medication and Medical Allergies
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory call={true} icon={<MdCall />} />
            <MedicalHistory call={true} icon={<IoIosVideocam />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Family History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Social History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Habits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Immunization History
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdArrowDropDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Test and Records</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <MedicalHistory icon={<MdHistory />} /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
