import { makeStyles, withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Typography } from "@material-ui/core"
import format from "date-fns/format"

const useStyles = makeStyles(() => ({
  // /
  root: {
    "@media print": {
      position: "absolute",
    },
  },
  container: {
    "@media print": {
      height: "auto",
      color: "red",
    },
    color: "blue",
  },
  paper: {
    "@media print": {
      overflowY: "visible",
      boxShadow: "none",
      fontSize: 70,
    },
  },
  img: {
    textAlign: "center",
    margin: "0 auto",
    display: "block",
    // background: "red",
  },
}))
const StyledTableCell = withStyles(() => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  body: {
    fontSize: 14,
  },
  head: {
    fontSize: 17,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const PrescriptionPrintout = ({ open, prescription }) => {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        aria-labelledby="dialogIdsimple-dialog-title"
        open={open}
        fullScreen
        scroll="paper"
        id="dialogId"
        className={classes.root}
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          <img src="/logo.png" alt="me" width="100" className={classes.img} />
          Medtech Africa
        </DialogTitle>
        <Paper className={`${classes.container} ${classes.paper}`}>
          <Typography>Doctor: Dr. {prescription.doctorName}</Typography>
          <Typography>Doctor ID: {prescription.doctorId}</Typography>
          <Typography>Diagnosis: {prescription.diagnosis}</Typography>
          <Typography>
            Date:{" "}
            {format(prescription.createdAt.toDate(), "eee, MMM eo yyyy 'at' p")}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Drug name</StyledTableCell>
                <StyledTableCell>Strength</StyledTableCell>
                <StyledTableCell>Instructions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescription.prescriptions.map((n) => {
                return (
                  <StyledTableRow key={n}>
                    <StyledTableCell>{n.drugName}</StyledTableCell>

                    <StyledTableCell>{n.strength}</StyledTableCell>
                    <StyledTableCell>{n.instructions}</StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </Dialog>
    </div>
  )
}

export default PrescriptionPrintout
