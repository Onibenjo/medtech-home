import { lighten, makeStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { MdDelete } from "react-icons/md"
import Paper from "@material-ui/core/Paper"
import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import clsx from "classnames"
import fetchApi from "utils/lib/fetchApi.js"
import usePaystackPayment from "hooks/usePaystack"
import { useSnackbar } from "notistack"
import CustomInput from "../CustomInput/CustomInput"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "ailment",
    numeric: false,
    disablePadding: false,
    label: "Ailment type",
  },
  {
    id: "consultation",
    numeric: false,
    disablePadding: false,
    label: "Consultation time",
  },
  { id: "costs", numeric: false, disablePadding: false, label: "Cost" },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}))

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { numSelected, handleSelectAllClick } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Patients
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleSelectAllClick}>
          <IconButton aria-label="delete">
            <MdDelete />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  buttonContainer: {
    margin: "18px 0",
  },
  amount: {
    display: "flex",
    alignItems: "center",
    marginRight: "18px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 32,
  },
  donateButton: {
    marginTop: 16,
    marginBottom: 16,
  },
}))

export default function EnhancedTable({
  rows,
  searchValue,
  applyFilteredLocation,
  applyFilteredAilment,
  rate,
}) {
  const classes = useStyles()
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("date")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [organization, setOrganization] = React.useState("")
  const [email, setEmail] = React.useState("")
  const { enqueueSnackbar } = useSnackbar()
  // const [confirming, setConfirming] = React.useState(false)

  React.useEffect(() => {
    const price = selected.map((item) => item.cost).reduce((a, b) => a + b, 0)
    setTotalPrice(price)
  }, [selected, totalPrice])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const config = {
    key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    email,
    amount: totalPrice * 100,
    currency: "NGN",
  }
  // console.log(config)

  const initializePayment = usePaystackPayment(config)

  const onSuccess = async (res) => {
    try {
      const data = await fetchApi("/donate", {
        body: {
          reference: res.reference,
          selected,
          email,
          organization,
          totalPrice,
        },
      })
      if (data.message === "success") {
        enqueueSnackbar("Transaction Successful", {
          variant: "success",
        })
      } else {
        throw data
      }
    } catch (e) {
      enqueueSnackbar("There was an error! Try again Later", {
        variant: "error",
      })
    }
  }

  const handlePayment = () => {
    // selected.forEach((pat) => console.log(pat.id, pat.cost))
    if (!email)
      enqueueSnackbar("Please fill the email field", {
        variant: "error",
      })
    else initializePayment(() => onSuccess())
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleSelectAllClick={handleSelectAllClick}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(
                  (patient) =>
                    (searchValue === "" ||
                      patient.name.toLowerCase().includes(searchValue)) &&
                    (applyFilteredLocation === "" ||
                      patient.location
                        .toLowerCase()
                        .includes(applyFilteredLocation.toLowerCase())) &&
                    (applyFilteredAilment === "" ||
                      patient.ailment
                        .toLowerCase()
                        .includes(applyFilteredAilment.toLowerCase()))
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.ailment}</TableCell>
                      <TableCell align="left">{row.consultation}</TableCell>
                      <TableCell align="left">{`N${row.cost} / $${Math.round(
                        row.cost / 350
                      )}`}</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Typography className={classes.amount}>
        Total amount to be paid
        <span
          style={{ fontWeight: "bold", fontSize: 22, marginLeft: 8 }}
        >{` N${totalPrice} / $${Math.ceil(totalPrice / rate)}`}</span>
      </Typography>

      {/* <Grid item md={4} sm={12} xs={12} align="center" className={classes.donateButton}> */}

      {/* </Grid> */}
      {selected.length > 0 && (
        <div className={classes.donateButton}>
          <Typography>Please Fill this details before proceeding</Typography>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                  variant: "standard",
                }}
                inputProps={{
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  type: "email",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <CustomInput
                labelText="Organization"
                id="organization"
                formControlProps={{
                  fullWidth: true,
                  variant: "standard",
                }}
                helperText="Optional"
                inputProps={{
                  value: organization,
                  onChange: (e) => setOrganization(e.target.value),
                  type: "text",
                }}
              />
              <Button
                color="primary"
                variant="contained"
                size="large"
                // disabled={confirming}
                onClick={handlePayment}
              >
                Donate
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}
