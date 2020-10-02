import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import CustomInput from "../CustomInput/CustomInput"

const Filter = ({
  classes,
  ailment,
  handleFilterChange,
  handleFilter,
  location,
  locationValue,
  setLocationValue,
  setAilmentValue,
}) => (
  <div>
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={emergency}
              onChange={handleFilterChange("emergency")}
              value="emergency"
            />
          }
          label="Emergency Care"
        /> */}
        <FormControlLabel
          className={classes.formControl}
          control={
            <Checkbox
              checked={ailment}
              onChange={handleFilterChange("ailment")}
              value="ailment"
            />
          }
          label="Ailment type"
        />
        {ailment ? (
          <CustomInput
            labelText="e.g (malaria)"
            id="ailment"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: locationValue,
              onChange: (e) => setAilmentValue(e),
            }}
          />
        ) : null}
        <FormControlLabel
          className={classes.formControl}
          control={
            <Checkbox
              checked={location}
              onChange={handleFilterChange("location")}
              value="location"
            />
          }
          label="Location"
        />
        {location ? (
          <CustomInput
            labelText="Location"
            id="location"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "text",
              value: locationValue,
              onChange: (e) => setLocationValue(e),
            }}
          />
        ) : null}
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnColor}
        onClick={handleFilter}
      >
        Search
      </Button>
    </FormControl>
  </div>
)

export default Filter
