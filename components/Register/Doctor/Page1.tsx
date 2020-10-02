import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import { NativeSelect, FormHelperText } from "@material-ui/core"
import CustomInput from "components/CustomInput/CustomInput"
import CardBody from "components/Card/CardBody"
import Grid from "@material-ui/core/Grid"
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
    margin: "0 0 17px 0",
    width: "100%",
  },

  w90: {
    width: "90%",
  },
}))

const DocRegProfile = ({
  firstName,
  lastName,
  email,
  gender,
  handleChange,
  step,
  title,
}) => {
  const classes = useStyles()

  if (step !== 1) return null

  return (
    <FadeIn>
      <CardBody>
        <Grid container spacing={4}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
        <CustomInput
          labelText="Email Address"
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
        <FormControl className={classes.formControl}>
          <NativeSelect
            // className={classes.mt2}
            value={title}
            name="title"
            onChange={handleChange}
            id="title"
            inputProps={{ "aria-label": "patients" }}
          >
            <option value="01" disabled>
              Title
            </option>
            <option value="Dr">Dr</option>
            <option value="Mr">Mr</option>
            <option value="Prof">Prof</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </NativeSelect>
          <FormHelperText>Estimated Patients Seen Annually</FormHelperText>
        </FormControl>

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
      </CardBody>
    </FadeIn>
  )
}

export default DocRegProfile
