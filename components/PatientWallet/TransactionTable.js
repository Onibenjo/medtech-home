import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import parseISO from "date-fns/parseISO"
// import format from "date-fns/format"
// import toDate from "date-fns/toDate"
import formatRelative from "date-fns/formatRelative"
import formatMoney from "utils/lib/formatMoney"
import { useAuth } from "utils/use-auth"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
})

const parseDate = (date) => {
  // const MM = {
  //   Jan: "January",
  //   Feb: "February",
  //   Mar: "March",
  //   Apr: "April",
  //   May: "May",
  //   Jun: "June",
  //   Jul: "July",
  //   Aug: "August",
  //   Sep: "September",
  //   Oct: "October",
  //   Nov: "November",
  //   Dec: "December",
  // }

  // return String(new Date(date)).replace(
  //   /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
  //   function ($0, $1, $2, $3, $4, $5, $6) {
  //     return `${MM[$1]} ${$2}, ${$3} - ${$4 % 12}:${$5}${
  //       +$4 > 12 ? "PM" : "AM"
  //     } ${$6}`
  //   }
  // )
  return `${formatRelative(parseISO(date), new Date())}`
}

const TransactionTable = ({ transactions }) => {
  const classes = useStyles()
  const { user } = useAuth()
  const isDoctor = user.type === "doctor"

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction id</TableCell>
            <TableCell align="right">Amount</TableCell>
            {isDoctor && <TableCell align="right">Duration</TableCell>}
            <TableCell align="right">Transaction Method</TableCell>
            <TableCell align="right">Transaction Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <span
                  style={{
                    color: row.type === "withdraw" ? "red" : "green",
                  }}
                >
                  {row.type === "withdraw" ? "-" : "+"}
                  {formatMoney(row.amount)}
                </span>
              </TableCell>
              {isDoctor && <TableCell align="right">{row.duration}</TableCell>}
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{parseDate(row.time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TransactionTable
