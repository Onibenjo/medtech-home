import React from "react"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import { Button } from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

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

function createData(sickness, patName, docName, date) {
  return { sickness, patName, docName, date }
}

const rows = [
  createData(
    "Urine-Ball Gaul",
    "Okoroba Victor",
    "Dr. Asah Victor",
    "20-02-2020"
  ),
  createData(
    "Blood Level Analysis",
    "Ayan Damilola",
    "Dr.Pruit Indora",
    "25-02-2020"
  ),
  createData("Malaria Type A", "Oni Doroma", "Dr. Pat Mbappe", "02-03-2020"),
  createData("Malaria Type C", "Mohammed Er", "Dr. Asah Osama", "12-03-2020"),
  createData(
    "Urine-Ball Gual",
    "Okoroba Victor",
    "Dr. Asah Victor",
    "20-03-2020"
  ),
]

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function PaitentUpload() {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>TEST (ANALYSIS)</StyledTableCell>
            <StyledTableCell align="right">Paitent Name</StyledTableCell>
            <StyledTableCell align="right">Doctor Name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Result</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.sickness}
              </StyledTableCell>
              <StyledTableCell align="right">{row.patName}</StyledTableCell>
              <StyledTableCell align="right">{row.docName}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  value="result"
                  style={{
                    marginLeft: "20%",
                    backgroundColor: "#01DC6B",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  View Result
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
