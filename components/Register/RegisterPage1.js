import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import InputAdornment from "@material-ui/core/InputAdornment"
import { MdVisibility } from "react-icons/md"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import countries2 from "constants/countries2"
import countryToFlag from "constants/countryToFlag"
import FormControl from "@material-ui/core/FormControl"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import { useSnackbar } from "notistack"
import styles from "../../styles/RegisterStyle"
import Button from "../CustomButtons/Button"
import CustomInput from "../CustomInput/CustomInput.js"
import CardBody from "../Card/CardBody.js"
import CardFooter from "../Card/CardFooter.js"
import Link from "../ActiveLink/Link2"

const RegisterPage1 = ({
  firstName,
  lastName,
  email,
  gender,
  onClick,
  handleChange,
  setAutoComplete,
  step,
  country,
  pass,
  passVerification,
  handlePassVerification,
}) => {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [passVisibility, setPassVisibility] = useState(false)
  const [conPassVisibility, setConPassVisibility] = useState(false)
  const [conPass, setConPass] = useState("")
  const [passCheck, setPassCheck] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const checkPasswords = () => {
    setPassCheck(conPass === pass)
  }

  const readyToGo = () => {
    if (
      passCheck &&
      firstName &&
      lastName &&
      email &&
      gender &&
      country &&
      passVerification
    )
      onClick()
    else
      enqueueSnackbar("All fields required", {
        variant: "error",
      })
  }

  if (step !== 1) return null

  return (
    <div>
      <CardBody>
        <CustomInput
          labelText="First Name"
          id="first"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: firstName,
            name: "firstName",
            onChange: handleChange,
          }}
        />
        <CustomInput
          labelText="Last Name"
          id="last"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            value: lastName,
            name: "lastName",
            onChange: handleChange,
          }}
        />
        <CustomInput
          labelText="E-mail"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "email",
            value: email,
            name: "email",
            onChange: handleChange,
          }}
        />
        {/* Gender */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
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
        <Autocomplete
          id="country"
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
        <CustomInput
          labelText="Password"
          id="password"
          helperText="Password must be at least 6 characters"
          error={!passVerification}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: passVisibility ? "text" : "password",
            value: pass,
            name: "pass",
            onChange: handleChange,
            onBlur: handlePassVerification,
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
          error={passCheck === false}
          helperText={passCheck === false && "Passwords do not match"}
          // error={conPass.length && !(pass === conPass)}
          inputProps={{
            type: conPassVisibility ? "text" : "password",
            value: conPass,
            onChange: (e) => setConPass(e.target.value),
            onBlur: () => checkPasswords(),
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
      </CardBody>
      <CardFooter
        className={classes.cardFooter}
        style={{ flexDirection: "column" }}
      >
        <Button simple color="primary" size="md" onClick={readyToGo}>
          Next
        </Button>
        <div style={{ marginTop: "20px" }}>
          Already have an account?
          <Link href="/login">
            <a style={{ color: "purple", cursor: "pointer" }}>Login</a>
          </Link>
        </div>
      </CardFooter>
    </div>
  )
}

export default RegisterPage1
