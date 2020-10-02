import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles"
import { MdArrowBack } from "react-icons/md"
import Button from "@material-ui/core/Button"
import { db } from "utils/lib/firebase"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import Doctordetails from "./Doctordetails"
import DoctorFullProfile from "./DoctorFullProfile"

const useStyles = makeStyles({
  card: {
    padding: "0 16px",
    position: "relative",
  },
})
const DoctorDetails = ({ id }) => {
  const router = useRouter()
  const [doctor, setDoctor] = useState({})

  useEffect(() => {
    const fetchDoctor = async () => {
      if (id) {
        const doctordetails = await db.collection("doctors").doc(id).get()
        setDoctor(doctordetails.data())
      }
    }
    fetchDoctor()
  }, [id])
  const [fullProfile, setFullProfile] = useState(false)
  const classes = useStyles()
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.card}>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          style={{ marginBottom: 16 }}
          onClick={() => router.back()}
        >
          <MdArrowBack />
          See Doctors
        </Button>
        {!fullProfile ? (
          <Doctordetails
            doctor={doctor}
            setFullProfile={() => setFullProfile(!fullProfile)}
          />
        ) : (
          <DoctorFullProfile
            doctor={doctor}
            onClick={() => setFullProfile(!fullProfile)}
          />
        )}
      </div>
    </MuiPickersUtilsProvider>
  )
}
export default DoctorDetails
