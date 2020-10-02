import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const Filter = ({
  classes,
  country,
  filteredCountry,
  doctorOnline,
  handleFilterChange,
  handleFilter,
  countries,
  setFilteredCountry,
}) => (
  <div>
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={country}
              onChange={handleFilterChange("country")}
              value="country"
            />
          }
          label="Country"
        />
        {country ? (
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="filtercountry">Country</InputLabel>
            <Select
              labelId="filtercountry"
              id="demo-dialog-select"
              value={filteredCountry}
              onChange={(e) => {
                setFilteredCountry(e.target.value)
              }}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries
                .sort((a, b) => (a < b ? -1 : 1))
                .map((countryVal, i) => (
                  <MenuItem key={i} value={countryVal}>
                    {countryVal}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : null}

        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              checked={doctorOnline}
              onChange={handleFilterChange("doctorOnline")}
              value="doctorOnline"
            />
          }
          label="Doctor Online"
        />
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnColor}
        onClick={handleFilter}
      >
        Filter
      </Button>
    </FormControl>
  </div>
)

export default Filter
