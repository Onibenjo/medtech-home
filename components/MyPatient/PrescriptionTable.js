import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  mv: {
    marginTop: 16,
    marginBottom: 16,
  },
})

export default function PrescriptionTable(props) {
  const classes = useStyles()

  return (
    <TableContainer className={classes.mv} component={Paper}>
      <Table className={classes.table} aria-label="prescription table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Drug Name</TableCell>
            <TableCell align="right">Strength</TableCell>
            <TableCell align="right">Instruction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  )
}
