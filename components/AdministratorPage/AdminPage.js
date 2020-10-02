import React, { useState } from "react"
import { useSnackbar } from "notistack"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import { Button } from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { MdClose } from "react-icons/md"
import Slide from "@material-ui/core/Slide"
import { useCollection } from "hooks/useCollection"
import { useDocument } from "hooks/useDocument"
import TableLoader from "components/Loader/TableLoader"
import { db } from "utils/lib/firebase"
import fetchWithToken from "utils/lib/fetch"
import useHeight from "hooks/useHeight/useHeight"
// import IFrame from "components/IFrame"

import Grid from "@material-ui/core/Grid"
// import { GiDoctorFace } from "react-icons/gi"
import { FaUserInjured, FaUserMd } from "react-icons/fa"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  table: {
    minWidth: 700,
  },
  container: {
    marginTop: 24,
  },
  agrContainer: {
    margin: "1rem 0",
  },
  agrCard: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& p": {
      fontSize: ".8rem",
      margin: 0,
      paddingTop: ".2rem",
    },
    "& svg": {
      // color: theme.palette.secondary.dark,
      color: theme.palette.primary.dark,
    },
    "& p:last-child": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      // color: theme.palette.secondary.dark,
      color: theme.palette.primary.dark,
    },
  },
}))

const types = [".png", ".jpeg", ".jpg", ".gif", "svg+xml"]

const AdminPage = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedDoctor, setSelectedDoctor] = useState([])
  const [selectedDoctorPrivate, setSelectedDoctorPrivate] = useState("")
  const { data: doctors, loading, error } = useCollection("doctors", {
    listen: true,
  })
  const { data: aggregate, loading: agrLoading } = useDocument(
    "aggregation/aggregate"
  )
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  // const [color, setColor] = React.useState("")
  const [open3, setOpen3] = React.useState(false)

  const minHeight = useHeight()

  const handleClickOpen = async (id) => {
    setOpen(true)
    const selectDoctor = doctors.filter((doc) => doc.uid === id)
    setSelectedDoctor(selectDoctor)
    const doctorPrivateCollection = await db
      .collection("doctors")
      .doc(id)
      .collection("private")
      .doc("details")
      .get()
    const res = doctorPrivateCollection.data()
    setSelectedDoctorPrivate(res)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpen2 = () => {
    setOpen2(true)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }
  const handleClickOpen3 = () => {
    setOpen3(true)
  }
  const handleClose3 = () => {
    setOpen3(false)
  }
  const getStatus = (status) => {
    switch (status) {
      case true:
        return "Verified"
      case false:
        return "Rejected"
      default:
        return "pending"
    }
  }
  const onDelete = async (id) => {
    const sure = window.confirm("Are you sure you want to delete")
    try {
      if (sure) {
        // await db.collection("doctors").doc(id).delete()
        const data = await fetchWithToken("/admin/delete", {
          body: { id },
        })
        enqueueSnackbar(data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
        alert("deletion was successful")
        getStatus()
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  }
  const onApprove = async (id) => {
    const sure = window.confirm("Are you sure you want to approve")
    try {
      if (sure) {
        await db.collection("doctors").doc(id).update({ verified: true })
        const data = await fetchWithToken("/user/doctor-verify", {
          body: { id, verified: true },
        })
        enqueueSnackbar(data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
        alert("Approval was successful")
        getStatus()
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  }
  const onReject = async (id) => {
    const sure = window.confirm("Are you sure you want to reject")
    try {
      if (sure) {
        await db.collection("doctors").doc(id).update({ verified: false })
        const data = await fetchWithToken("/user/doctor-verify", {
          body: { id, verified: false },
        })

        enqueueSnackbar(data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
        alert("Rejection was successful")
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  }

  const isPdf = (file) => {
    return file && file.split(".").pop().startsWith("pdf")
  }
  const isImage = (url) => {
    return url && types.some((v) => url.includes(v))
  }

  if (error)
    return (
      <div>
        There was an error fetching doctors.{" "}
        <button onClick={() => window.location.reload()} type="button">
          Reload
        </button>
      </div>
    )

  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Grid container spacing={4} className={classes.agrContainer}>
          <Grid item xs={11} sm={6} md={4}>
            <Paper className={classes.agrCard} variant="outlined">
              <FaUserMd size="50" />
              <p>Doctors</p>
              <p>{agrLoading ? "Loading..." : aggregate.doctors}</p>
            </Paper>
          </Grid>
          <Grid item xs={11} sm={6} md={4}>
            <Paper className={classes.agrCard} variant="outlined">
              <FaUserInjured size="50" />
              <p>Patients</p>
              <p>{agrLoading ? "Loading..." : aggregate.patients}</p>
            </Paper>
          </Grid>
        </Grid>
        {loading ? (
          <TableLoader />
        ) : (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell>FIRST NAME</StyledTableCell>
                <StyledTableCell align="right">LAST NAME</StyledTableCell>
                <StyledTableCell align="right">Doctor ID</StyledTableCell>
                <StyledTableCell align="right">STATUS</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <StyledTableRow key={doctor.id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      style={{ height: 36, borderRadius: "50%" }}
                      alt={doctor.firstName}
                      src={doctor.imageUrl}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {doctor.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {doctor.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{doctor.uid}</StyledTableCell>
                  <StyledTableCell align="right">
                    {getStatus(doctor.verified)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => handleClickOpen(doctor.id)}
                      value="result"
                      style={{
                        marginLeft: "20%",
                        backgroundColor: "#01DC6B",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <MdClose />
              </IconButton>
              <Button
                color="inherit"
                onClick={() => onApprove(selectedDoctor[0].uid)}
                style={{ marginLeft: "auto" }}
              >
                Approve
              </Button>
              <Button
                onClick={() => onReject(selectedDoctor[0].uid)}
                color="inherit"
              >
                Reject
              </Button>
              <Button
                onClick={() => onDelete(selectedDoctor[0].uid)}
                color="inherit"
              >
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 32, padding: "0 32px" }}>
            <Button
              variant="outlined"
              style={{ marginRight: 16 }}
              color="primary"
              onClick={handleClickOpen2}
            >
              ID CARD
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen3}
            >
              CERTIFICATE
            </Button>
          </div>
          <Dialog
            onClose={handleClose2}
            fullWidth
            aria-labelledby="customized-dialog-title"
            open={open2}
            maxWidth="md"
          >
            {/* <IFrame
              allowFullScreen
              // sandbox="allow-same-origin allow-scripts allow-forms"
              title="PortletIFrameWidget"
              src="https://firebasestorage.googleapis.com/v0/b/medtech-f46d7.appspot.com/o/Jaiz%20Bank%20Challenge%20-%20Medtech%20Africa(1).pdf?alt=media&token=965c6778-bf67-46f5-af92-dc98fc100238"
              // height="600px"
              width="100%"
              style={{ minHeight }}
            /> */}
            {selectedDoctorPrivate && isPdf(selectedDoctorPrivate.idCard) ? (
              <iframe
                // sandbox="allow-same-origin allow-scripts allow-forms"
                title="PortletIFrameWidget"
                src={selectedDoctorPrivate.idCard}
                // height="600px"
                width="100%"
                style={{ minHeight }}
              />
            ) : isImage(selectedDoctorPrivate.idCard) ? (
              <img
                src={selectedDoctorPrivate && selectedDoctorPrivate.idCard}
                alt="idCard pic"
                height="100%"
                width="100%"
              />
            ) : (
              <iframe
                // sandbox="allow-same-origin allow-scripts allow-forms"
                title="PortletIFrameWidget"
                src={selectedDoctorPrivate && selectedDoctorPrivate.idCard}
                // height="600px"
                width="100%"
                style={{ minHeight }}
              />
            )}
          </Dialog>

          <Dialog
            onClose={handleClose3}
            aria-labelledby="customized-dialog-title"
            open={open3}
            fullWidth
            maxWidth="md"
          >
            {selectedDoctorPrivate &&
            isImage(selectedDoctorPrivate.certificate) ? (
              <img
                src={selectedDoctorPrivate && selectedDoctorPrivate.certificate}
                alt="certificate pic"
                height="100%"
                width="100%"
              />
            ) : (
              <iframe
                // sandbox="allow-same-origin allow-scripts allow-forms"
                title="PortletIFrameWidget"
                src={selectedDoctorPrivate && selectedDoctorPrivate.certificate}
                // height="600px"
                width="100%"
                style={{ minHeight }}
              />
            )}
          </Dialog>

          <List style={{ padding: "16px 18px" }}>
            <ListItem>
              <Typography variant="h5" component="h5">
                Doctor Details
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Name"
                secondary={
                  selectedDoctor.length > 0 &&
                  `${selectedDoctor[0].firstName} ${selectedDoctor[0].lastName}`
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={
                  selectedDoctor.length > 0 && `${selectedDoctor[0].email}`
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Country"
                secondary={
                  selectedDoctor.length > 0 && selectedDoctor[0].country
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="State"
                secondary={selectedDoctor.length > 0 && selectedDoctor[0].city}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Gender"
                secondary={selectedDoctor.length > 0 && selectedDoctor[0].sex}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Date of Birth"
                secondary={selectedDoctorPrivate && selectedDoctorPrivate.dob}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Specialty"
                secondary={
                  selectedDoctor.length > 0 && selectedDoctor[0].specialty
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Graduation School & Year"
                secondary={
                  selectedDoctorPrivate &&
                  `${selectedDoctorPrivate.gradSch}, ${selectedDoctorPrivate.gradYear}`
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Medical License No."
                secondary={
                  selectedDoctorPrivate && selectedDoctorPrivate.license
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Work Experience"
                secondary={
                  selectedDoctorPrivate && selectedDoctorPrivate.experience
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Service Type"
                secondary={
                  selectedDoctorPrivate && selectedDoctorPrivate.service
                }
              />
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    </div>
  )
}
export default AdminPage
