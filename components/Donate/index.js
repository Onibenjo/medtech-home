import React, { useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import { FiFilter } from "react-icons/fi"
import GridItem from "components/Grid/GridItem"
import InputAdornment from "@material-ui/core/InputAdornment"
import { MdSearch } from "react-icons/md"
import Typography from "@material-ui/core/Typography"
import axios from "axios"
import { makeStyles } from "@material-ui/core/styles"
import { useCollection } from "hooks/useCollection"
import styles from "../../styles/DonateStyle"
import PatientsContainer from "./PatientsContainer"
import GridContainer from "../Grid/GridContainer"
import Filter from "./Filter"
import CustomInput from "../CustomInput/CustomInput"

const useStyles = makeStyles(styles)

const Donate = () => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState("")
  const [locationValue, setLocationValue] = useState("")
  const [applyFilteredLocation, setApplyFilteredLocation] = useState("")
  const [ailmentValue, setAilmentValue] = useState("")
  const { data: patients } = useCollection("queue", {
    where: ["status", "==", "unpaid"],
  })
  const [applyFilteredAilment, setApplyFilteredAilment] = useState("")
  const [homeIsFilter, setHomeIsFilter] = useState(false)
  const [filterValue, setFilterValue] = useState({
    date: false,
    emergency: false,
    ailment: false,
    location: false,
  })
  const [rate, setRate] = useState(0)
  useEffect(() => {
    const fetchRate = () => {
      axios
        .get(
          "https://free.currconv.com/api/v7/convert?q=USD_NGN&compact=ultra&apiKey=6376c468c873cade6202"
        )
        .then(({ data }) => setRate(data.USD_NGN))
        .catch((_e) => console.log(_e))
    }
    fetchRate()
  }, [])

  const handleFilter = () => {
    setApplyFilteredLocation(locationValue)
    setApplyFilteredAilment(ailmentValue)
    setHomeIsFilter(!homeIsFilter)
    if (filterValue.location === false && locationValue.length > 1) {
      setLocationValue("")
      setApplyFilteredLocation("")
    }
    if (filterValue.ailment === false && ailmentValue.length > 1) {
      setAilmentValue("")
      setApplyFilteredAilment("")
    }
  }

  function createData(name, ailment, consultation, cost, location, date, id) {
    return { name, ailment, consultation, cost, location, date, id }
  }

  const rows = patients.map((data) =>
    createData(
      `${data.firstName} ${data.lastName}`,
      data.ailment,
      `${data.duration} mins`,
      data.cost,
      data.location,
      new Date(data.createdAt.toDate()).toDateString(),
      data.id
    )
  )

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase())
  }

  const handleFilterChange = (name) => (event) => {
    setFilterValue({ ...filterValue, [name]: event.target.checked })
  }

  const { date, emergency, ailment, location } = filterValue

  return (
    <>
      <Typography
        className={classes.header}
        variant="h4"
        align="center"
        component="h1"
      >
        Sponsor a less priviledged
      </Typography>
      <GridContainer>
        <GridItem md={2} sm={2} xs={1} />
        <GridItem md={8} sm={8} xs={10}>
          <GridContainer>
            <GridItem md={8} sm={8} xs={12}>
              <CustomInput
                labelText="Search Patient Name"
                id="first"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (e) => handleSearch(e),
                  value: searchValue,
                  type: "text",
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            <GridItem
              md={4}
              sm={4}
              xs={12}
              className={classes.buttongridContainer}
            >
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setHomeIsFilter(!homeIsFilter)}
                >
                  Sort by
                  <FiFilter />
                </Button>
                {homeIsFilter ? (
                  <Filter
                    date={date}
                    classes={classes}
                    ailment={ailment}
                    handleFilterChange={handleFilterChange}
                    handleFilter={handleFilter}
                    location={location}
                    emergency={emergency}
                    setLocationValue={(e) => setLocationValue(e.target.value)}
                    setAilmentValue={(e) => setAilmentValue(e.target.value)}
                  />
                ) : null}
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem md={2} sm={2} xs={1} />
      </GridContainer>
      <GridContainer>
        <GridItem md={1} sm={1} xs={1} />
        <GridItem md={10} sm={10} xs={10}>
          <PatientsContainer
            // confirming={confirming}
            // handlePayment={handlePayment}
            rate={Math.round(rate)}
            rows={rows}
            searchValue={searchValue}
            applyFilteredLocation={applyFilteredLocation}
            applyFilteredAilment={applyFilteredAilment}
          />
        </GridItem>
        <GridItem md={1} sm={1} xs={1} />
      </GridContainer>
    </>
  )
}

export default Donate
