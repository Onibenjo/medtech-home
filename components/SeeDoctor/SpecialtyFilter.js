import React, { useState, useEffect } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import CustomInput from "../CustomInput/CustomInput"
import specialties from "../Register/specialties"

const SpecialtyFilter = ({
  openSpecialty,
  handleSpecialtyClose,
  specialty,
  handleResetClose,
  classes,
  handleSelectChange,
  setOpenSpecialty,
  specifiedSpecialty,
  setSpecifiedSpecialty,
  handleOthers,
  doctors,
}) => {
  const [filteredSpecialty, setFilteredSpecialty] = useState([])
  useEffect(() => {
    if (doctors.length > 0) {
      const getSpecialties = doctors.map((doc) => doc.specialty)
      setFilteredSpecialty(getSpecialties)
    }
  }, [doctors])

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnColor}
        onClick={() => setOpenSpecialty(true)}
      >
        Specialty
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openSpecialty}
        onClose={handleSpecialtyClose}
      >
        <DialogTitle>Select Specialty</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-dialog-select-label">Specialty</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={specialty}
                onChange={handleSelectChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {specialties
                  .filter((spec) => filteredSpecialty.includes(spec))
                  .sort((a, b) => (a < b ? -1 : 1))
                  .filter((item) => item !== "Others")
                  .map((spec, i) => (
                    <MenuItem key={i} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                <MenuItem value="Others">
                  <em>Others</em>
                </MenuItem>
              </Select>
              {specialty === "Others" && (
                <div>
                  <CustomInput
                    labelText="Please Specify"
                    id="specifiedSpecialty"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: specifiedSpecialty,
                      onChange: (e) => setSpecifiedSpecialty(e.target.value),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    // className={classes.btnColor}
                    onClick={handleOthers}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
        Ok
        </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SpecialtyFilter
