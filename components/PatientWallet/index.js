/* eslint-disable @typescript-eslint/camelcase */
import { useState } from "react"
import { useAuth } from "utils/use-auth"
import Typography from "@material-ui/core/Typography"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import { makeStyles } from "@material-ui/core/styles"
import usePaystackPayment from "hooks/usePaystack"
import { useCollection } from "hooks/useCollection"
import fetchWithToken from "utils/lib/fetch"
import { useSnackbar } from "notistack"
import formatMoney from "utils/lib/formatMoney"
import Button from "../CustomButtons/Button"
import TransactionTable from "./TransactionTable"
import TableLoader from "../Loader/TableLoader"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  balance: {
    color: theme.palette.primary.dark,
    display: "block",
    fontWeight: "600",
  },
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

const PatientWallet = ({ showTransaction = true }) => {
  const [amount, setAmount] = useState(0)
  const [confirming, setConfirming] = useState(false)
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  // const [wallet, walletLoading, walletError] = useDocumentSnap(
  //   `patients/${user.uid}/private/wallet`
  // )
  const { data: transactions, loading, error } = useCollection(
    `patients/${user.uid}/transactions`,
    {
      skip: !showTransaction,
      listen: true,
      limit: 5,
      orderBy: ["time", "desc"],
    }
  )

  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // "pk_test_010b733584fc70a3149ccfc23d443cc831a20721",
  const config = {
    key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
    email: user.email,
    amount: amount * 100,
    currency: "NGN",
    // ref: `${Math.floor(Math.random() * 1000000000 + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: "+2348012345678",
        },
        {
          display_name: "Name",
          variable_name: "name",
          value: user.displayName,
        },
      ],
    },
  }

  const initializePayment = usePaystackPayment(config)

  const onSuccess = async (res) => {
    try {
      setConfirming(true)
      const data = await fetchWithToken("/user/payment", {
        method: "POST",
        body: { reference: res.reference },
      })
      if (data.message === "success") {
        enqueueSnackbar("Transaction Successful", {
          variant: "success",
        })
        setConfirming(false)
      } else {
        throw data
      }
    } catch (e) {
      setConfirming(false)
      enqueueSnackbar("There was an error! Try again Later", {
        variant: "error",
      })
    }
    // fetch("/api/payment", {
    //   method: "POST",
    //   body: JSON.stringify({ amount, email: user.email }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => window.location.assign(data.url))
  }

  const handlePayment = () => {
    initializePayment(onSuccess)
    setOpen(false)
  }

  // if (loading) return <TableLoader />

  return (
    <>
      <div className={classes.container}>
        <Typography component="h6" variant="h6">
          Balance:{" "}
          {user.balance && (
            <span className={classes.balance}>
              N{formatMoney(user.balance)}
            </span>
          )}
          {/* {walletLoading ? (
            <span>...Loading</span>
          ) : !walletError && wallet ? (
            <span className={classes.balance}>
              N{formatMoney(wallet.balance)}
            </span>
          ) : (
            <span>Error loading balance</span>
          )} */}
        </Typography>
        <Button
          color="primary"
          size="sm"
          onClick={handleOpen}
          disabled={confirming}
        >
          Add Money
        </Button>
      </div>
      {showTransaction ? (
        loading || confirming ? (
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
        )
      ) : null}
      <div id="paystackEmbedContainer" />
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
            <h5 id="transition-modal-title">How much do you want to add?</h5>
            <div id="transition-modal-description">
              <FormControl className={classes.margin} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">N</InputAdornment>
                  }
                  labelWidth={40}
                />
                <Button
                  color="primary"
                  size="md"
                  onClick={handlePayment}
                  disabled={amount <= 10}
                >
                  Submit
                </Button>
              </FormControl>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default PatientWallet
