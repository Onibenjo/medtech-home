import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import { MdVisibility } from "react-icons/md"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import countries2 from "constants/countries2"
import countryToFlag from "constants/countryToFlag"
import findStateByCountry from "constants/findStateByCountry"
import styles from "styles/RegisterStyle"
import CardFooter from "../Card/CardFooter.js"
import CardBody from "../Card/CardBody.js"
import CustomInput from "../CustomInput/CustomInput.js"
import Button from "../CustomButtons/Button"

const useStyles = makeStyles(styles)
const RegisterPage2 = ({
  state,
  country,
  pass,
  passVerification,
  // privilege,
  onPrevClick,
  onNextClick,
  handleChange,
  setAutoComplete,
  phoneNumber,
  handlePassVerification,
}) => {
  const classes = useStyles()
  const [passVisibility, setPassVisibility] = useState(false)
  const [conPassVisibility, setConPassVisibility] = useState(false)
  const [conPass, setConPass] = useState("")
  const allStates = country ? findStateByCountry(country.label) : [""]

  const phoneValid = /^[0]?\d{10}$/.test(phoneNumber)

  return (
    <>
      <CardBody>
        <Autocomplete
          id="country-select-demo"
          fullWidth
          options={countries2}
          classes={{
            option: classes.option,
            root: classes.pb2,
          }}
          value={country}
          onChange={(_e, val) => {
            setAutoComplete("country", val)
          }}
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
          id="state-select"
          fullWidth
          options={allStates}
          classes={{
            option: classes.option,
            root: classes.pb2,
          }}
          inputValue={state}
          onInputChange={(_e, val) => {
            setAutoComplete("state", val)
          }}
          disabled={!country}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a state"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
                name: "state",
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
            country && country.label === "Nigeria" && phoneNumber && !phoneValid
          }
          helperText={!phoneValid && "Enter valid phone number"}
          inputProps={{
            type: "text",
            value: phoneNumber,
            name: "phoneNumber",
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                +{country && country.phone}{" "}
              </InputAdornment>
            ),
          }}
        />

        {/* <FormControl fullWidth>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            id="demo-simple-select"
            value={country}
            name="country"
            onChange={handleChange}
            color="primary"
          >
            <MenuItem selected>Choose</MenuItem>
            <MenuItem value="algeria">Algeria</MenuItem>
            <MenuItem value="angola">Angola</MenuItem>
            <MenuItem value="benin">Benin</MenuItem>
            <MenuItem value="botswana">Botswana</MenuItem>
            <MenuItem value="burkina Faso">Burkina Faso</MenuItem>
            <MenuItem value="burundi">Burundi</MenuItem>
            <MenuItem value="cameroon">Cameroon</MenuItem>
            <MenuItem value="cape-verde">Cape Verde</MenuItem>
            <MenuItem value="central-african-republic">
              Central African Republic
            </MenuItem>
            <MenuItem value="chad">Chad</MenuItem>
            <MenuItem value="comoros">Comoros</MenuItem>
            <MenuItem value="congo-brazzaville">Congo - Brazzaville</MenuItem>
            <MenuItem value="congo-kinshasa">Congo - Kinshasa</MenuItem>
            <MenuItem value="ivory-coast">Côte d’Ivoire</MenuItem>
            <MenuItem value="djibouti">Djibouti</MenuItem>
            <MenuItem value="egypt">Egypt</MenuItem>
            <MenuItem value="equatorial-guinea">Equatorial Guinea</MenuItem>
            <MenuItem value="eritrea">Eritrea</MenuItem>
            <MenuItem value="ethiopia">Ethiopia</MenuItem>
            <MenuItem value="gabon">Gabon</MenuItem>
            <MenuItem value="gambia">Gambia</MenuItem>
            <MenuItem value="ghana">Ghana</MenuItem>
            <MenuItem value="guinea">Guinea</MenuItem>
            <MenuItem value="guinea-bissau">Guinea-Bissau</MenuItem>
            <MenuItem value="kenya">Kenya</MenuItem>
            <MenuItem value="lesotho">Lesotho</MenuItem>
            <MenuItem value="liberia">Liberia</MenuItem>
            <MenuItem value="libya">Libya</MenuItem>
            <MenuItem value="madagascar">Madagascar</MenuItem>
            <MenuItem value="malawi">Malawi</MenuItem>
            <MenuItem value="mali">Mali</MenuItem>
            <MenuItem value="mauritania">Mauritania</MenuItem>
            <MenuItem value="mauritius">Mauritius</MenuItem>
            <MenuItem value="mayotte">Mayotte</MenuItem>
            <MenuItem value="morocco">Morocco</MenuItem>
            <MenuItem value="mozambique">Mozambique</MenuItem>
            <MenuItem value="namibia">Namibia</MenuItem>
            <MenuItem value="niger">Niger</MenuItem>
            <MenuItem value="nigeria">Nigeria</MenuItem>
            <MenuItem value="rwanda">Rwanda</MenuItem>
            <MenuItem value="reunion">Réunion</MenuItem>
            <MenuItem value="saint-helena">Saint Helena</MenuItem>
            <MenuItem value="senegal">Senegal</MenuItem>
            <MenuItem value="seychelles">Seychelles</MenuItem>
            <MenuItem value="sierra-leone">Sierra Leone</MenuItem>
            <MenuItem value="somalia">Somalia</MenuItem>
            <MenuItem value="south-africa">South Africa</MenuItem>
            <MenuItem value="sudan">Sudan</MenuItem>
            <MenuItem value="south-sudan">Sudan</MenuItem>
            <MenuItem value="swaziland">Swaziland</MenuItem>
            <MenuItem value="Sao-tome-príncipe">São Tomé and Príncipe</MenuItem>
            <MenuItem value="tanzania">Tanzania</MenuItem>
            <MenuItem value="togo">Togo</MenuItem>
            <MenuItem value="tunisia">Tunisia</MenuItem>
            <MenuItem value="uganda">Uganda</MenuItem>
            <MenuItem value="western-sahara">Western Sahara</MenuItem>
            <MenuItem value="zambia">Zambia</MenuItem>
            <MenuItem value="zimbabwe">Zimbabwe</MenuItem>
          </Select>
        </FormControl> */}

        <CustomInput
          labelText="Password"
          id="password"
          helperText="Password must be at least 6 characters"
          error={passVerification}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: passVisibility ? "text" : "password",
            value: pass,
            name: "pass",
            onChange: handleChange,
            endAdornment: (
              <InputAdornment position="end">
                <MdVisibility
                  className={classes.visible}
                  onClick={() => setPassVisibility(!passVisibility)}
                  color={passVisibility ? "#03d170" : "#d7d7d7"}
                />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          labelText="Confirm Password"
          id="confirmpass"
          formControlProps={{
            fullWidth: true,
          }}
          error={!(pass === conPass)}
          inputProps={{
            type: conPassVisibility ? "text" : "password",
            value: conPass,
            onChange: (e) => setConPass(e.target.value),
            onBlur: () => handlePassVerification(conPass),
            endAdornment: (
              <InputAdornment position="end">
                <MdVisibility
                  className={classes.visible}
                  onClick={() => setConPassVisibility((s) => !s)}
                  color={conPassVisibility ? "#03d170" : "#d7d7d7"}
                />
              </InputAdornment>
            ),
          }}
        />
        {/* privileged */}
        {/* <FormControl component="fieldset">
          <FormLabel component="legend">
            Would you consider yourself a less privileged
          </FormLabel>
          <RadioGroup
            aria-label="Would you consider yourself a less privileged"
            name="privilege"
            value={privilege}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl> */}
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button simple color="primary" size="lg" onClick={onPrevClick}>
          Prev
        </Button>
        <Button simple color="primary" size="lg" onClick={onNextClick}>
          Next
        </Button>
      </CardFooter>
    </>
  )
}

export default RegisterPage2
