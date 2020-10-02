import { useState } from "react"
import dynamic from "next/dynamic"
import { useSnackbar } from "notistack"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Autocomplete from "@material-ui/lab/Autocomplete"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"

import countries2 from "constants/countries2"
import countryToFlag from "constants/countryToFlag"
import findStateByCountry from "constants/findStateByCountry"
import LinearProgressWithLabel from "components/Progressbar/LinearProgressWithLabel"
import { firebaseDocUploader } from "hooks/useFileUploader"
import fetchApi from "utils/lib/fetchApi"

import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers"
import { format } from "date-fns"
import styles from "../../styles/RegisterStyle"
import Button from "../CustomButtons/Button"
import CustomInput from "../CustomInput/CustomInput"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import CardHeader from "../Card/CardHeader"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"
import CardFooter from "../Card/CardFooter"
import specialties from "./specialties"
// import specialties from "../SeeDoctor/specialties"
import Iagree from "./Iagree"

// doesnt load d component immediately

const Terms = dynamic(() => import("../Terms/Terms"), { ssr: false })

const initialDetails = {
  firstName: "",
  lastName: "",
  dob: "",
  title: "",
  gender: "other",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  gradSch: "",
  gradYear: null,
  license: "",
  experience: "",
  certificate: "",
  idCard: "",
  specialty: "",
  specifiedSpecialty: "",
  service: "volunteer",
  role: "doctor",
}

const gridOptions = {
  xs: 11,
  sm: 10,
  md: 4,
  lg: 3,
}

const useStyles = makeStyles(styles)

const RegisterDoc1 = () => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [agree, setAgree] = useState(true)
  const [error, setError] = useState({})
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(initialDetails)
  const [phoneCode, setPhoneCode] = useState("")
  const [idProgress, setIdProgress] = useState(0)
  const [certProgress, setCertProgress] = useState(0)

  const handleDateChange = (_, val) => {
    setDetails((prev) => ({
      ...prev,
      gradYear: val,
    }))
  }

  const allStates = details.country ? findStateByCountry(details.country) : [""]

  const phoneValid = /^[0]?\d{10}$/.test(details.phoneNumber)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      const { id } = e.target
      setError({ ...error, [id]: false })
      const type = id === "idCard" ? setIdProgress : setCertProgress
      type(1)
      firebaseDocUploader(
        `${details.firstName}${details.lastName}`,
        id,
        image,
        type
      )
        .then((url) => {
          setDetails((prev) => ({
            ...prev,
            [id]: url,
          }))
          // setError({})
        })
        .catch((err) => setError({ ...error, [id]: err.message }))
    }
  }

  const handleOnChange = (e) => {
    e.persist()
    setDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      details.firstName &&
      details.lastName &&
      details.dob &&
      details.email &&
      details.phoneNumber &&
      details.country &&
      details.city &&
      details.gradSch &&
      details.gradYear &&
      details.license &&
      details.experience &&
      details.certificate &&
      details.idCard &&
      (details.specialty || details.specifiedSpecialty)
    ) {
      const specialty =
        details.specialty === "Others"
          ? details.specifiedSpecialty
          : details.specialty
      const dob = format(details.dob, "dd/MM/yyyy")
      fetchApi("/user/register/doctor", {
        method: "POST",
        body: {
          ...details,
          specialty,
          phone: `+${phoneCode}${details.phoneNumber}`,
          pass: details.email,
          dob,
        },
      })
        .then(() => {
          enqueueSnackbar("Registered successfully", {
            variant: "success",
          })
          setSuccess(true)
          enqueueSnackbar(`Check your mail for further details`, {
            variant: "info",
          })
        })
        .catch((err) => {
          enqueueSnackbar(`${err.message}`, {
            variant: "error",
          })
        })
    } else {
      enqueueSnackbar(`Please fill all field`, {
        variant: "info",
      })
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((s) => ({ ...s, [name]: value }))
  }
  const setAutoComplete = (stateVal, val) => {
    setDetails((s) => ({ ...s, [stateVal]: val }))
  }

  const {
    firstName,
    lastName,
    dob,
    title,
    gender,
    email,
    phoneNumber,
    country,
    city,
    gradSch,
    gradYear,
    license,
    experience,
    service,
    specialty,
    specifiedSpecialty,
  } = details

  return (
    <div>
      <div className={classes.container}>
        <Terms open={open} onClose={() => setOpen(false)} />
        <GridContainer justify="center" className={classes.grid} align="center">
          <GridItem {...gridOptions}>
            {/* <MdAttachMoney size={30} title="Money" /> */}
            <img src="/svg/cash_in_hand.svg" alt="icon" width={75} />
            <p className={classes.gridHeader}>Earn anywhere, anytime</p>
            <p>
              Consult with patients when you want and earn up to $10 per hour
            </p>
            {/* // <p>Consult with patients when you want.</p> */}
          </GridItem>
          <GridItem {...gridOptions}>
            {/* <MdSchedule size={30} title="Schedule" /> */}
            <img src="/svg/schedule.svg" alt="icon" width={60} />
            <p className={classes.gridHeader}>Set your own schesule</p>
            <p>
              Only consult when it works for you. You control your time. Own
              your virtual clinic.
            </p>
          </GridItem>
          <GridItem {...gridOptions}>
            {/* <MdFileUpload size={30} title="Upload" /> */}
            <img src="/svg/verified_account.svg" alt="icon" width={60} />
            <p className={classes.gridHeader}>Signing up is easy</p>
            <p>
              Create an account and gain access to the platform. Upload your
              medical credentials for verification by our trusted doctor review
              team.
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={6} lg={5}>
            {!success ? (
              <Card>
                <CardHeader className={classes.cardHeader}>
                  <h1>Register</h1>
                  <h2 style={{ fontSize: "1rem" }}>
                    as a volunteer or paid doctor
                  </h2>
                </CardHeader>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <CardBody>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: firstName,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: lastName,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />
                      <CustomInput
                        labelText="Title"
                        id="title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: title,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />

                      <FormControl fullWidth>
                        {/* Gender */}
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender"
                          id="gender"
                          value={gender}
                          onChange={handleChange}
                          row
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio size="small" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio size="small" />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio size="small" />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>

                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: email,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />
                      {/* <TextField
                      id="dob"
                      label="Date of Birth"
                      type="date"
                      value={dob}
                      onChange={(e) => handleOnChange(e)}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> */}
                      <DatePicker
                        value={dob}
                        maxDate={
                          new Date(
                            new Date().getTime() -
                              1000 * 60 * 60 * 24 * 30 * 12 * 16
                          )
                        }
                        format="do MMM yyyy"
                        onChange={(date) => setAutoComplete("dob", date)}
                        fullWidth
                        invalidDateMessage=""
                        margin="normal"
                        id="dob"
                        name="dob"
                        label="Date of Birth"
                        views={["year", "month", "date"]}
                      />
                      {/* <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="specialty-label">Specialty</InputLabel>
                    <Select
                      labelId="specialty-label"
                      id="specialty"
                      value={specialty}
                      onChange={handleOnChange}
                      input={
                        <Input classes={{ underline: underlineClasses }} />
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {specialties
                        .sort((a, b) => (a < b ? -1 : 1))
                        .map((spec, i) => (
                          <MenuItem key={i} value={spec}>
                            {spec}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl> */}

                      <Autocomplete
                        id="specialty-select"
                        fullWidth
                        options={specialties}
                        classes={{
                          option: classes.option,
                          root: classes.pb2,
                        }}
                        value={specialty}
                        onChange={(_e, val) => {
                          setAutoComplete("specialty", val)
                        }}
                        autoHighlight
                        disableClearable
                        getOptionLabel={(option) => option || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose your specialty"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                              name: "specialty",
                            }}
                          />
                        )}
                      />
                      {specialty === "Others" && (
                        <CustomInput
                          labelText="Please Specify"
                          id="specifiedSpecialty"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            value: specifiedSpecialty,
                            onChange: (e) => handleOnChange(e),
                          }}
                        />
                      )}
                      <Autocomplete
                        id="country"
                        fullWidth
                        options={countries2}
                        classes={{
                          option: classes.option,
                          root: classes.pb2,
                        }}
                        onChange={(_e, val) => {
                          // console.log(val)
                          // setAutoComplete("country", val)
                          setPhoneCode(val.phone)
                        }}
                        inputValue={country}
                        onInputChange={(e, newInputValue) => {
                          setAutoComplete("country", newInputValue)
                        }}
                        autoHighlight
                        disableClearable
                        getOptionLabel={(option) =>
                          option ? option.label : ""
                        }
                        renderOption={(option) => (
                          <>
                            <span>{countryToFlag(option.code)}</span>
                            {option.label} ({option.code}) +{option.phone}
                          </>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                              name: "country",
                            }}
                          />
                        )}
                      />
                      <Autocomplete
                        id="city-select"
                        fullWidth
                        options={allStates}
                        classes={{
                          option: classes.option,
                          root: classes.pb2,
                        }}
                        inputValue={city}
                        onInputChange={(_e, val) => {
                          setAutoComplete("city", val)
                        }}
                        disabled={!country}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a city"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                              name: "city",
                            }}
                          />
                        )}
                      />
                      <CustomInput
                        labelText="Phone Number"
                        id="number"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={
                          country === "Nigeria" && phoneNumber && !phoneValid
                        }
                        // error={
                        //   country &&
                        //   country.label === "Nigeria" &&
                        //   phoneNumber &&
                        //   !phoneValid
                        // }
                        helperText={!phoneValid && "Enter valid phone number"}
                        inputProps={{
                          type: "text",
                          value: phoneNumber,
                          name: "phoneNumber",
                          onChange: handleChange,
                          startAdornment: (
                            <InputAdornment position="start">
                              +{phoneCode || ""}{" "}
                            </InputAdornment>
                          ),
                        }}
                      />

                      <CustomInput
                        labelText="Graduation School (medical)"
                        id="gradSch"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: gradSch,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />

                      <KeyboardDatePicker
                        fullWidth
                        margin="normal"
                        views={["year"]}
                        disableFuture
                        // onYearChange={(e) => console.log(e)}
                        id="gradYear"
                        label="Year of Graduation"
                        format="yyyy"
                        // value={selectedDate}
                        value={gradYear}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <CustomInput
                        labelText="Medical license no"
                        id="license"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: license,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />
                      <CustomInput
                        labelText="Years of Work Experience"
                        id="experience"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: experience,
                          onChange: (e) => handleOnChange(e),
                        }}
                      />
                      {/* cert */}
                      <CustomInput
                        error={error.certificate}
                        labelText="Upload Certification"
                        id="certificate"
                        helperText={
                          error.certificate &&
                          "An error occured while uploading. Try again"
                        }
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "file",
                          onChange: (e) => handleFileChange(e),
                        }}
                        labelProps={{ shrink: true }}
                      />
                      {!!certProgress && (
                        <LinearProgressWithLabel value={certProgress} />
                      )}
                      {/* id */}
                      <CustomInput
                        error={error.idCard}
                        labelText="Valid ID card"
                        id="idCard"
                        helperText={
                          error.idCard &&
                          "An error occured while uploading. Try again"
                        }
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "file",
                          accept: "image/*",
                          onChange: (e) => handleFileChange(e),
                        }}
                        labelProps={{ shrink: true }}
                      />
                      {!!idProgress && (
                        <LinearProgressWithLabel value={idProgress} />
                      )}
                      <FormControl fullWidth>
                        {/* Gender */}
                        <FormLabel component="legend">Service type</FormLabel>
                        <RadioGroup
                          aria-label="Service type"
                          name="service"
                          id="service"
                          value={service}
                          onChange={handleChange}
                          row
                        >
                          <FormControlLabel
                            value="volunteer"
                            control={<Radio size="small" />}
                            label="Volunteer"
                          />
                          <FormControlLabel
                            value="paid"
                            control={<Radio size="small" />}
                            label="Paid"
                          />
                        </RadioGroup>
                      </FormControl>

                      <Iagree
                        setAgree={setAgree}
                        setOpen={setOpen}
                        agree={agree}
                      />
                    </CardBody>

                    <CardFooter className={classes.cardFooter}>
                      <Button
                        round
                        fullWidth
                        // simple
                        color="secondary"
                        disabled={agree}
                        size="lg"
                        onClick={handleSubmit}
                      >
                        Submit Form
                      </Button>
                    </CardFooter>
                  </form>
                </MuiPickersUtilsProvider>
              </Card>
            ) : (
              <Card>
                <CardBody className={classes.successMessage}>
                  <Typography variant="h5" align="center" component="h5">
                    Thank you for registering. Check your mail for further
                    information.
                  </Typography>
                </CardBody>
              </Card>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export default RegisterDoc1
