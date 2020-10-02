import { useState } from "react"
import dynamic from "next/dynamic"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import { firebaseDocUploader } from "hooks/useFileUploader"
import Autocomplete from "@material-ui/lab/Autocomplete"
import LinearProgressWithLabel from "components/Progressbar/LinearProgressWithLabel"
import { KeyboardDatePicker } from "@material-ui/pickers"
import CustomInput from "components/CustomInput/CustomInput"
import CardBody from "components/Card/CardBody"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "components/CustomButtons/Button"
import FadeIn from "react-fade-in"
import LoadingCheck from "components/Loader/index2"
import specialties from "../specialties"
// import specialties from "../SeeDoctor/specialties"
import Iagree from "../Iagree"

const useStyles = makeStyles(() => ({
  pb2: { paddingBottom: "1.2rem" },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  formControl: {
    width: "100%",
    margin: "0 0 17px 0",
    position: "relative",
    paddingTop: "27px",
  },
  w90: {
    width: "90%",
  },
  nomargin: {
    margin: 0,
  },
  uploadLoader: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
  },
}))

interface TermsProp {
  open: boolean
  onClose: () => void
}

const Terms = dynamic<TermsProp>(() => import("components/Terms/Terms"), {
  ssr: false,
})

const Credentials = ({
  handleChange,
  setAutoComplete,
  step,
  gradSch,
  gradYear,
  license,
  service,
  specialty,
  specifiedSpecialty,
  // idProgress,
  // certProgress,
  error,
  setError,
  // setIdProgress,
  // setCertProgress,
  setDetails,
  firstName,
  lastName,
  handleSubmit,
  certificate,
  idCard,
}) => {
  const classes = useStyles()
  const [agree, setAgree] = useState(true)
  const [open, setOpen] = useState(false)
  const [idProgress, setIdProgress] = useState(0)
  const [certProgress, setCertProgress] = useState(0)

  const handleDateChange = (_, val) => {
    setDetails((prev) => ({
      ...prev,
      gradYear: val,
    }))
  }
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      const { id } = e.target
      setError({ ...error, [id]: false })
      const type = id === "idCard" ? setIdProgress : setCertProgress
      type(5)
      firebaseDocUploader(`${firstName}${lastName}`, id, image, type)
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

  if (step !== 3) return null

  return (
    <FadeIn>
      <CardBody>
        <Autocomplete
          id="specialty-select"
          fullWidth
          options={specialties}
          classes={{
            option: classes.option,
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
              className={classes.nomargin}
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
              onChange: (e) => handleChange(e),
            }}
            className={classes.nomargin}
          />
        )}
        <CustomInput
          className={classes.nomargin}
          labelText="Graduation School (medical)"
          id="gradSch"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: gradSch,
            onChange: handleChange,
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
            onChange: handleChange,
          }}
          className={classes.nomargin}
        />
        {/* cert */}
        <CustomInput
          error={error.certificate}
          labelText="Upload Certification"
          id="certificate"
          helperText={
            error.certificate && "An error occured while uploading. Try again"
          }
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "file",
            onChange: handleFileChange,
          }}
          labelProps={{ shrink: true }}
        />
        {!!certProgress && (
          <div className={classes.uploadLoader}>
            <LinearProgressWithLabel value={certProgress} />
            <LoadingCheck size={23} loading={!certificate} />
          </div>
        )}

        {/* id */}
        <CustomInput
          error={error.idCard}
          labelText="Valid ID card"
          id="idCard"
          helperText={
            error.idCard && "An error occured while uploading. Try again"
          }
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "file",
            accept: "image/*",
            onChange: handleFileChange,
          }}
          labelProps={{ shrink: true }}
        />
        {!!idProgress && (
          <div className={classes.uploadLoader}>
            <LinearProgressWithLabel value={idProgress} />
            <LoadingCheck loading={!idCard} size={23} />
          </div>
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
        <Iagree setAgree={setAgree} setOpen={setOpen} agree={agree} />
        <Terms open={open} onClose={() => setOpen(false)} />
        {/* @ts-ignore */}
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
      </CardBody>
    </FadeIn>
  )
}

export default Credentials
