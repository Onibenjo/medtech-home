import React from "react"
// import { makeStyles } from "@material-ui/core/styles"
// import { FaNotesMedical } from "react-icons/fa"
// import { GiMedicines } from "react-icons/gi"
import Typography from "@material-ui/core/Typography"
import { useCollection } from "hooks/useCollection"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import { useAuth } from "../../utils/use-auth"
import SimpleTable from "./Table"
import TreatmentCard from "./TreatmentCard"
//import NavPills from "../NavPills/NavPills"
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"

// const useStyles = makeStyles(() => ({
//   rotate: {
//     animation: `$rotates 1s linear infinite`,
//   },
//   "@keyframes rotates": {
//     "100%": {
//       transform: " rotate(360deg)",
//     },
//   },
// }))


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 700,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
}))

const Recommend = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const { user } = useAuth()
  const {
    data: recommendation,
    loading,
  } = useCollection(`patients/${user.uid}/recommendations`, { skip: false })

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Recommendation" {...a11yProps(0)} />
                <Tab label="Prescription" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <GridContainer justify="center">
                  {loading ? (
                    <AiOutlineLoading3Quarters className={classes.rotate} />
                  ) : recommendation.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      No recommendation yet
                    </Typography>
                  ) : (
                    recommendation.map((item, i) => (
                      <TreatmentCard
                        key={i}
                        doctorname={`Dr. ${item.doctorName}`}
                        treatment={item.recommendation}
                      />
                    ))
                  )}
                </GridContainer>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <GridContainer justify="center">
                  <GridItem xs={12}>
                    <SimpleTable />
                  </GridItem>
                </GridContainer>
              </TabPanel>
            </SwipeableViews>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  )
}
export default Recommend
