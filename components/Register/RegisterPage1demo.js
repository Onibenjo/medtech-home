import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import DateFnsUtils from "@date-io/date-fns" // choose your lib
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
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
  dob,
}) => {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

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
        {/* Date of brth */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* <CustomInput
            labelText="Date of Birth"
            id="dob"
            formControlProps={{
              fullWidth: true,
            }}
            labelProps={{
              shrink: true,
            }}
            inputProps={{
              type: "date",
              value: dob,
              name: "dob",
              onChange: handleChange,
            }}
          /> */}
          <DatePicker
            value={dob}
            maxDate={new Date()}
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
        </MuiPickersUtilsProvider>
      </CardBody>
      <CardFooter
        className={classes.cardFooter}
        style={{ flexDirection: "column" }}
      >
        <Button simple color="primary" size="md" onClick={onClick}>
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
