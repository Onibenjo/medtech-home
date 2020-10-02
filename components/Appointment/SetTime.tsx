import React, { useState, useEffect } from "react"
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers"
import { Grid, Button, TextField, makeStyles } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import hasEmptyValue from "utils/lib/hasEmptyValue"
import { format } from "date-fns"
import MenuItem from "@material-ui/core/MenuItem"
import { useAuth } from "utils/use-auth"
import { useDocument } from "hooks/useDocument"
import { MdSave, MdAdd } from "react-icons/md"

interface Hours {
  day: string
  start: Date | number | string
  end: Date | number | string
}

const useStyles = makeStyles((theme) => ({
  listContainer: { margin: "0 auto", fontSize: ".9rem" },
  removeBtn: { color: theme.palette.error.main },
  hours: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    gridGap: "0.5rem",
    alignItems: "baseline",
    // "& > h4": {
    //   textAlign: "right",
    // },
  },
}))

const defaultDate = new Date().toISOString()

const SetTime = () => {
  const { user, setUser } = useAuth()
  const [workingHours, setWorkingHours] = useState<Hours[]>([])
  const [hour, setHour] = useState<Hours>({
    day: "",
    start: defaultDate,
    end: defaultDate,
  })
  const classes = useStyles()
  const { update } = useDocument(`doctors/${user.uid}`, { skip: true })

  useEffect(() => setWorkingHours(user.workingHours || []), [user.workingHours])

  const removeDay = (id) => {
    const filteredHours = workingHours.filter(({ day }) => day !== id)
    setWorkingHours(filteredHours)
  }

  const handleEnd = (val: Date) => {
    setHour({ ...hour, end: val.toISOString() })
  }

  const handleStart = (val: Date) => {
    setHour({ ...hour, start: val.toISOString() })
  }

  const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value: day } = e.target
    setHour({ ...hour, day })
  }
  // function removeDuplicateObjects(array: any[]) {
  //   return [...new Set(array.map((s) => JSON.stringify(s)))].map((s) =>
  //     JSON.parse(s)
  //   )
  // }
  const addDate = () => {
    // setWorkingHours((prev) => [
    //   ...new Map([...prev, hour].map((item) => [item.day, item])).values(),
    // ])
    if (hour.start > hour.end) {
      alert("end must be greater then start")
      return
    }
    if (hasEmptyValue(hour)) return
    // setWorkingHours((prev) => [...prev, hour])
    setWorkingHours((prev) =>
      Object.values(
        [...prev, hour].reduce(
          (acc, cur) => Object.assign(acc, { [cur.day]: cur }),
          {}
        )
      )
    )
    setHour({ day: "", start: defaultDate, end: defaultDate })
  }
  const handleSubmit = async () => {
    if (!workingHours.length) return
    await update({ workingHours })
    // eslint-disable-next-line no-unused-expressions
    setUser && setUser({ workingHours })
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div className={classes.listContainer}>
        <h2>Add Business Hours</h2>
        <Grid container>
          {workingHours.map(({ day, start, end }) => (
            <div className={classes.hours} key={day}>
              <h4>{day}</h4>
              <p>{`${format(new Date(start), "p")} - ${format(
                new Date(end),
                "p"
              )}`}</p>
              <Button
                type="button"
                onClick={() => removeDay(day)}
                className={classes.removeBtn}
              >
                Remove
              </Button>
            </div>
          ))}
        </Grid>

        <div>
          <Grid container spacing={1} justify="center">
            <Grid item xs={4}>
              <TextField
                id="day"
                select
                label="Day"
                value={hour.day}
                onChange={handleDay}
                helperText="Please select your day"
              >
                {[
                  "",
                  "Monday",
                  "Tuesday",
                  "Wednessday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]
                  .filter((v) =>
                    workingHours.length
                      ? workingHours.find((x) => x.day !== v)
                      : true
                  )
                  .map((option, i) => (
                    <MenuItem key={option + i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TimePicker
                value={hour.start}
                onChange={handleStart}
                minutesStep={15}
                label="Start"
                // inputVariant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TimePicker
                showTodayButton
                todayLabel="now"
                value={hour.end}
                minutesStep={15}
                onChange={handleEnd}
                label="End"
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                color="secondary"
                type="button"
                onClick={addDate}
                variant="contained"
                startIcon={<MdAdd />}
              >
                add
              </Button>
            </Grid>
            <Button
              color="secondary"
              type="button"
              onClick={handleSubmit}
              variant="contained"
              startIcon={<MdSave />}
            >
              submit
            </Button>
          </Grid>
          {/* <Paper style={{ overflow: "hidden" }}>
                <Calendar {...pickerProps} />
              </Paper> */}
        </div>
      </div>
    </div>
  )
}

const SetTimePicker = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <SetTime />
  </MuiPickersUtilsProvider>
)
export default SetTimePicker

// space
// category
// chef
// pride
// echo
// wheel
// large
// clerk
// cotton
// urban
// flat
// juice
