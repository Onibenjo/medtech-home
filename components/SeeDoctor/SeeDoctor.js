import React, { useState } from "react"
import { useRouter } from "next/router"
import { MdSearch, MdClose } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Slide from "@material-ui/core/Slide"
import useMediaQuery from "@material-ui/core/useMediaQuery"
// firebase util
// import { db } from "utils/lib/firebase"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import countries2 from "constants/countries2"
import { useCollection } from "hooks/useCollection"
import DoctorDetails from "../DoctorDetails"
import Doctor from "./Doctor"
import styles from "../../styles/SeeDoctorStyle"
import CustomInput from "../CustomInput/CustomInput"
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"
import SpecialtyFilter from "./SpecialtyFilter"
import Filter from "./Filter"
import specialtiesAlimment from "./specialtiesAilment"
// Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
// creating the styles
const useStyles = makeStyles(styles)

const SeeDoctor = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  const allCountries = []
  countries2.forEach((coun) => allCountries.push(coun.label))
  const countries = allCountries
  const router = useRouter()
  // going back to default route
  const handleClose = () => {
    router.push("/app/see-doctor")
  }
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState("")
  const [specifiedSpecialty, setSpecifiedSpecialty] = useState("")
  const [openSpecialty, setOpenSpecialty] = useState(false)
  const [specialty, setSpecialty] = useState("")
  const [filteredCountry, setFilteredCountry] = useState("")
  const [applyFilteredCountry, setApplyFilteredCountry] = useState("")
  const [isFilter, setIsFilter] = useState(false)
  const [isDocOnline, setIsDocOnline] = useState(false)
  const [filterValue, setFilterValue] = useState({
    country: false,
    doctorOnline: false,
  })
  const { data: doctors, loading } = useCollection("doctors", {
    listen: true,
    orderBy: "online",
    where: ["verified", "==", true],
  })
  const handleClick = (id) => {
    // setSelectedDoctorId(id)
    router.push(`/app/see-doctor?pid=${id}`, `/app/doctor/${id}`, {
      shallow: true,
    })
  }

  const handleSelectChange = (e) => {
    setSpecialty(e.target.value)
    if (e.target.value === "Others") setOpenSpecialty(true)
    else setOpenSpecialty(false)
  }
  const handleOthers = () => {
    setOpenSpecialty(false)
    setSpecialty(specifiedSpecialty)
  }
  const handleFilter = () => {
    setApplyFilteredCountry(filteredCountry)
    setIsFilter(!isFilter)
    setIsDocOnline(filterValue.doctorOnline)
    if (filterValue.country === false && filteredCountry.length > 2) {
      setFilteredCountry("")
      setApplyFilteredCountry("")
    }
  }

  const filterByAilment = (doctor) => {
    const searchAilment = specialtiesAlimment.filter((item) =>
      item.ailment.includes(searchValue)
    )
    const availableSpec = []
    searchAilment.forEach((item) => availableSpec.push(item.specialty))

    return availableSpec.indexOf(doctor.specialty) !== -1
  }

  // const getSpecialtyImage = (specialtySelected) => {
  //   const searchAilment = specialtiesAlimment.filter(
  //     (item) => item.specialty === specialtySelected
  //   )
  //   return searchAilment[0] ? searchAilment[0].image : null
  // }

  const renderDoctor = () =>
    doctors
      .filter(
        (doctor) =>
          (specialty === "" ||
            doctor.specialty.toLowerCase().includes(specialty.toLowerCase())) &&
          (isDocOnline === false || doctor.online === isDocOnline) &&
          (searchValue === "" ||
            `${doctor.firstName} ${doctor.lastName}`
              .toLowerCase()
              .includes(searchValue) ||
            filterByAilment(doctor)) &&
          (applyFilteredCountry === "" ||
            `${doctor.country}, ${doctor.city}`
              .toLowerCase()
              .includes(applyFilteredCountry.toLowerCase()))
      )
      .sort((d1, d2) => (d1.star < d2.star ? 1 : -1))
      .filter((doc) =>
        doc.service === "volunteer" ? doc.online === true : doc
      )
      .map((doctor, i) => (
        <div
          key={i}
          role="menuitem"
          onClick={() => handleClick(doctor.id)}
          onKeyPress={() => handleClick(doctor.id)}
          style={{ cursor: "pointer", fontSize: 18 }}
          tabIndex="-1"
        >
          <Doctor
            doctorname={`${doctor.firstName} ${doctor.lastName}`}
            location={`${doctor.country}, ${doctor.city}`}
            specialty={doctor.specialty}
            service={doctor.service}
            image={
              doctor.imageUrl
              // doctor.imageUrl ? doctor.imageUrl : "/images/doctorThumbnail.jpg"
            }
            star={doctor.avgRating}
            // specialtyImage={getSpecialtyImage(doctor.specialty)}
            // specialtyDesc={doctor.specialtyDesc}
            online={doctor.online}
          />
        </div>
      ))
  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase())
  }
  const handleSpecialtyClose = () => setOpenSpecialty(false)
  const handleResetClose = () => {
    setOpenSpecialty(false)
    setSpecialty("")
  }

  const handleFilterChange = (name) => (event) => {
    setFilterValue({ ...filterValue, [name]: event.target.checked })
  }

  const { country, doctorOnline } = filterValue

  return (
    <>
      <GridContainer>
        <Dialog
          fullScreen={matches}
          maxWidth="sm"
          fullWidth
          open={!!router.query.pid}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <MdClose />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Doctor
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.appBarContainer}>
            <DoctorDetails id={router.query.pid} />
          </main>
        </Dialog>
        <GridItem md={3} />
        <GridItem md={6}>
          <CustomInput
            labelText="Doctor Name or symptoms (e.g. malaria)"
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
          <div className={classes.buttonContainer}>
            <SpecialtyFilter
              openSpecialty={openSpecialty}
              handleSpecialtyClose={handleSpecialtyClose}
              handleSelectChange={handleSelectChange}
              specialty={specialty}
              handleResetClose={handleResetClose}
              classes={classes}
              setOpenSpecialty={setOpenSpecialty}
              handleOthers={handleOthers}
              specifiedSpecialty={specifiedSpecialty}
              setSpecifiedSpecialty={setSpecifiedSpecialty}
              doctors={doctors}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.btnColor}
                onClick={() => setIsFilter(!isFilter)}
              >
                More Filters
                <FiFilter />
              </Button>
              {isFilter ? (
                <Filter
                  countries={countries}
                  doctors={doctors}
                  country={country}
                  classes={classes}
                  filteredCountry={filteredCountry}
                  doctorOnline={doctorOnline}
                  handleFilterChange={handleFilterChange}
                  handleFilter={handleFilter}
                  setFilteredCountry={setFilteredCountry}
                />
              ) : null}
            </div>
          </div>
        </GridItem>
        <GridItem md={3} />
      </GridContainer>
      <GridContainer>
        <GridItem md={2} />
        <GridItem md={8}>
          {loading ? (
            <AiOutlineLoading3Quarters className={classes.rotate} />
          ) : doctors ? (
            renderDoctor().length > 0 ? (
              renderDoctor()
            ) : (
              <Typography
                variant="body1"
                className={classes.empty}
                align="center"
                component="p"
              >
                {" "}
                No Doctor was found
              </Typography>
            )
          ) : (
            <Typography
              variant="body1"
              className={classes.empty}
              align="center"
              component="p"
            >
              {" "}
              No Doctor available
            </Typography>
          )}
        </GridItem>
        <GridItem md={2} />
      </GridContainer>
    </>
  )
}

export default SeeDoctor
