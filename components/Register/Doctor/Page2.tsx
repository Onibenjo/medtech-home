import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import countries2 from "constants/countries2"
import countryToFlag from "constants/countryToFlag"
import InputAdornment from "@material-ui/core/InputAdornment"
import CustomInput from "components/CustomInput/CustomInput"
import CardBody from "components/Card/CardBody"
import findStateByCountry from "constants/findStateByCountry"
import { DatePicker } from "@material-ui/pickers/"
import FadeIn from "react-fade-in"

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
}))

const Location = ({
  handleChange,
  setAutoComplete,
  step,
  experience,
  dob,
  country,
  city,
  phoneNumber,
  phoneCode,
  setPhoneCode,
}) => {
  const classes = useStyles()

  if (step !== 2) return null

  const allStates = country ? findStateByCountry(country.label) : [""]
  const phoneValid = /^[0]?\d{10}$/.test(phoneNumber)

  return (
    <FadeIn>
      <div>
        <CardBody>
          <DatePicker
            value={dob}
            maxDate={
              new Date(
                new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12 * 16
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
          <Autocomplete
            id="country"
            options={countries2}
            classes={{
              option: classes.option,
              root: classes.pb2,
            }}
            value={country}
            onChange={(_e, val) => {
              setPhoneCode(val.phone)
              setAutoComplete("country", val)
            }}
            // inputValue={country}
            // onInputChange={(e, newInputValue) => {
            //   setAutoComplete("country", newInputValue)
            // }}
            autoHighlight
            disableClearable
            getOptionLabel={(option) => (option ? option.label : "")}
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
            id="city"
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
            id="phoneNumber"
            formControlProps={{
              fullWidth: true,
            }}
            error={country === "Nigeria" && phoneNumber && !phoneValid}
            helperText={!phoneValid && "Enter valid phone number"}
            className={classes.nomargin}
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
            labelText="Years of Work Experience"
            id="experience"
            formControlProps={{
              fullWidth: true,
            }}
            className={classes.nomargin}
            inputProps={{
              type: "number",
              name: "experience",
              value: experience,
              onChange: handleChange,
            }}
          />
        </CardBody>
      </div>
    </FadeIn>
  )
}

export default Location
