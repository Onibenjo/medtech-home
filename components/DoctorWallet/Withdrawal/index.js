import React, { useState } from "react"
// import { useState, useEffect, useCallback } from "react"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import { useAuth } from "utils/use-auth"
import formatMoney from "utils/lib/formatMoney"
import { useDocument } from "hooks/useDocument"
import { DialogContent } from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "components/CustomButtons/Button"

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
  float: {
    float: "right",
    marginRight: "20px",
  },
  balance: {
    marginLeft: "10px",
    color: "#03d170",
  },
}))

const DoctorWithdrawal = () => {
  const { user } = useAuth()
  const classes = useStyles()
  const [type, setType] = useState(true)
  const {
    data: wallet,
    loading: walletLoading,
    error: walletError,
  } = useDocument(`doctors/${user.uid}/private/wallet`)
  const [values, setValues] = useState({
    bankName: "",
    acctName: "",
    acctNumb: "",
    amount: "",
  })
  // useEffect(() => {
  //   const Bank = async () => {
  //     fetchWithToken("/get-banks").then((data) => {
  //       // console.log(data)
  //     })
  //   }
  //   Bank()
  // }, [])

  const handleChange = (event) => {
    const { id, value } = event.target
    setValues({ ...values, [id]: value })
  }

  const { bankName, acctName, acctNumb, amount } = values

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  // const [age, setAge] = React.useState('');

  const handleOpen = () => {
    setOpen(true)
  }
  const handleOpen3 = () => {
    setOpen1(true)
  }

  const handleType = () => {
    setType(false)
  }

  // const handleClose = () => {
  //   setOpen(false)
  // }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose2 = () => {
    setOpen(false)
  }
  const handleClose3 = () => {
    setOpen1(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // if (
    //   values.acctName !== "" &&
    //   values.acctNumb !== "" &&
    //   values.bankName !== ""
    // ) {
    //   // doctorsRef
    //   //   .doc(user.uid)
    //   //   .collection("private")
    //   //   .doc("bank_accounts")
    //   //   .set({
    //   //     accounts: [
    //   //       {
    //   //         accountName: values.acctName,
    //   //         accountNumber: values.acctNumb,
    //   //         bankName: values.bankName,
    //   //       },
    //   //     ],
    //   //   })
    //   //   .then(() => {
    //   //     enqueueSnackbar("Account details add successfully", {
    //   //       variant: "success",
    //   //     })
    //   //   })
    // } else {
    //   enqueueSnackbar(`Please fill all field`, {
    //     variant: "info",
    //   })
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Make a withdrawal
        </Button>
        {type ? (
          <Dialog
            onClose={handleClose2}
            aria-labelledby="customized-dialog-title"
            open={open}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            <Typography
              component="h6"
              variant="h6"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              Wallet Balance is
              {walletLoading ? (
                <span>...Loading</span>
              ) : !walletError ? (
                <span className={classes.balance}>
                  N{formatMoney(wallet.balance)}
                </span>
              ) : (
                <span>Error loading balance</span>
              )}
            </Typography>

            <DialogContent>
              {wallet.balance > 1000 && (
                <Button color="primary" size="sm" onClick={handleOpen}>
                  Withdraw
                </Button>
              )}
              {/* <FormControl className={classes.margin} variant="outlined"> */}
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="amount"
                value={amount}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">N</InputAdornment>
                }
                labelWidth={40}
              />

              <Button
                color="blue"
                size="xs"
                onClick={handleType}
                style={{
                  height: "30px",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                Add Account
              </Button>
              <TextField
                id="acctName"
                value={acctName}
                label="Acct Name"
                variant="outlined"
              />

              <TextField
                id="acctNumb"
                value={acctNumb}
                label="Acct number"
                variant="outlined"
              />

              <Select
                id="bankName"
                value={bankName}
                label="Bank Name"
                open={open1}
                onChange={handleChange}
                onOpen={handleOpen3}
                onClose={handleClose3}
                variant="outlined"
              >
                <MenuItem value="bank">{}</MenuItem>
              </Select>

              <Button
                color="primary"
                size="sm"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Withdraw
              </Button>
              {/* </FormControl> */}
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog
            onClose={handleClose2}
            aria-labelledby="customized-dialog-title"
            open={open}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            <Typography
              component="h6"
              variant="h6"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              Wallet Balance is
              {walletLoading ? (
                <span>...Loading</span>
              ) : !walletError ? (
                <span className={classes.balance}>
                  N{formatMoney(wallet.balance)}
                </span>
              ) : (
                <span>Error loading balance</span>
              )}
            </Typography>

            <DialogContent>
              {wallet > 1000 && (
                <Button color="primary" size="sm" onClick={handleOpen}>
                  Add
                </Button>
              )}
              {/* <FormControl className={classes.margin} variant="outlined"> */}
              <TextField
                id="acctName"
                value={acctName}
                label="Acct Name"
                variant="outlined"
              />

              <TextField
                id="acctNumb"
                value={acctNumb}
                label="Acct number"
                variant="outlined"
              />

              <TextField
                id="bankName"
                value={bankName}
                label="Bank Name"
                variant="outlined"
              />
              <Button
                color="primary"
                size="sm"
                type="submit"
                onClick={() => setType(true)}
                style={{
                  height: "50px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Add Account
              </Button>
              {/* </FormControl> */}
            </DialogContent>
          </Dialog>
        )}
      </form>
    </>
  )
}

export default DoctorWithdrawal
