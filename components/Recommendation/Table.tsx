import React, { useEffect, useState, useRef } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import IconButton from "@material-ui/core/IconButton"
import { MdPrint, MdMore } from "react-icons/md"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
// import PrintPrescription from "./Printout/Prescription"
import PrescriptionPrintout from "./Printout/Modal"

const useStyles = makeStyles((theme) => ({
  table: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 250,
    },
    root: {
      width: "100%",
    },
  },
  icon: {
    color: "#03d170",
  },
}))

const StyledTableCell = withStyles(() => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  body: {
    fontSize: 14,
    wordWrap: "break-word",
    paddingRight: 1,
    paddingLeft: 1,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const PrescriptionTable = () => {
  const { user } = useAuth()
  const classes = useStyles()
  const { data: prescriptions } = useCollection(
    `patients/${user.uid}/prescriptions`
  )
  const [selectedPrescription, setPrescription] = useState(null)
  const printRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  // const [refetchIndex, setRefetchIndex] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const printIframe = () => {
    const content = printRef.current
    // const content = document.getElementById("printpresc")
    const pri = frameRef.current?.contentWindow
    // const pri = document.getElementById("ifmcontentstoprint").contentWindow
    if (!pri) return
    pri.document.open()
    pri.document.write(content?.innerHTML as string)
    pri.document.close()
    pri.focus()
    pri.print()
  }
  // const refetch = () => setRefetchIndex((prev) => prev + 1)
  const printPrescription = (p) => {
    setPrescription(p)
    // print()
    setOpen(true)
    // refetch()
  }

  // useEffect(() => {
  //   if (selectedPrescription) {
  //     printIframe()
  //   }
  // }, [selectedPrescription, refetchIndex])

  // const print = () => {
  //   setOpen(true)
  // }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        window.print()
        // setOpen(false)
      }, 700)
      setTimeout(() => {
        // window.print()
        setOpen(false)
      }, 6000)
    }
  }, [open])

  return (
    <div>
      <Typography style={{ marginBottom: 16 }} component="p" variant="body1">
        {/* {doctorName ? `Prescribed by doctor ${doctorName}` : ""} */}
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
        }}
      >
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>DOCTOR NAME</StyledTableCell>
              <StyledTableCell align="center">DIAGNOSIS</StyledTableCell>
              <StyledTableCell align="center">DATE</StyledTableCell>
              <StyledTableCell align="center">PRESCIPTION</StyledTableCell>
              <StyledTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.map((prescription) => (
              <StyledTableRow key={prescription.id}>
                <StyledTableCell component="th" scope="row">
                  {prescription.doctorName}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {prescription.diagnosis}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {prescription.createdAt.toDate().toDateString()}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Drugs prescription={prescription} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    className={classes.icon}
                    color="secondary"
                    aria-label="print prescription"
                    onClick={() => printPrescription(prescription)}
                  >
                    <MdPrint />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {selectedPrescription && (
        <PrintPrescription
          prescription={selectedPrescription}
          frameRef={frameRef}
          printRef={printRef}
        />
      )} */}
      {selectedPrescription && (
        <PrescriptionPrintout open={open} prescription={selectedPrescription} />
      )}
    </div>
  )
}
export default PrescriptionTable

const Drugs = ({ prescription }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const classes = useStyles()
  return (
    <div>
      <IconButton
        className={classes.icon}
        aria-label="drug list"
        onClick={handleClickOpen}
      >
        <MdMore />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="drug prescription"
        aria-describedby="drug prescription"
      >
        <DialogTitle id="drug prescribe">Drug Prescription</DialogTitle>
        <DialogContent>
          <TableContainer
            component={Paper}
            style={{
              width: "100%",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>DRUG LIST</TableCell>
                  <TableCell align="left">PRESCIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescription.prescriptions.map((pre, i) => (
                  <TableRow key={i}>
                    <TableCell>{pre.drugName}</TableCell>
                    <TableCell>{pre.instructions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  )
}
