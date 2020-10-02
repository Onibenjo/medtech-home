import { useState } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import { useAuth } from "utils/use-auth"
import { useCollection } from "hooks/useCollection"
import { useDocument } from "hooks/useDocument"
import formatMoney from "utils/lib/formatMoney"
import Button from "../CustomButtons/Button"
import TransactionTable from "../PatientWallet/TransactionTable"
import TableLoader from "../Loader/TableLoader"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid rgba(0,0,0,0.2)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const DoctorWallet = () => {
  const { user } = useAuth()
  const {
    data: wallet,
    loading: walletLoading,
    error: walletError,
  } = useDocument(`doctors/${user.uid}/private/wallet`, { listen: true })
  const { data: transactions, loading, error } = useCollection(
    `doctors/${user.uid}/transactions`,
    {
      listen: true,
      limit: 5,
    }
  )

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    amount: "",
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Typography component="h6" variant="h6">
          Balance:{" "}
          {walletLoading || walletError ? (
            <span>...Loading</span>
          ) : (
            <span className={classes.balance}>
              N{formatMoney(wallet.balance)}
            </span>
          )}
        </Typography>

        <div>
          {/* {wallet.balance > 1000 && (
            <Button color="primary" size="sm" onClick={handleOpen}>
              Withdraw
            </Button>
          )} */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Enter the amount</h2>
                <div id="transition-modal-description">
                  <FormControl className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={values.amount}
                      onChange={() => handleChange("amount")}
                      startAdornment={
                        <InputAdornment position="start">N</InputAdornment>
                      }
                      labelWidth={40}
                    />
                    <Button color="primary" size="sm">
                      Submit
                    </Button>
                  </FormControl>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
      {loading ? (
        <TableLoader />
      ) : error ? (
        <div>
          <span>There was an error...</span>
          <Button
            color="secondary"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      ) : transactions.length === 0 ? (
        <Typography variant="body1" component="p" align="center">
          No Transactions
        </Typography>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </>
  )
}

export default DoctorWallet
