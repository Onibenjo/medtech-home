import { useState, useEffect } from "react"
import FadeIn from "react-fade-in"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import fetchWithToken from "utils/lib/fetch"
import FormControl from "@material-ui/core/FormControl"
import { useAuth } from "utils/use-auth"
import { useSnackbar } from "notistack"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "components/CustomButtons/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import firebase from "firebase/app"
// import { useCollection } from "hooks/useCollection"
import { useDocument } from "hooks/useDocument"

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
    width: "100%",
  },
  float: {
    float: "right",
    marginRight: "20px",
  },
  balance: {
    marginLeft: "10px",
    color: "#03d170",
  },
  number: {
    marginTop: 16,
  },
}))

const WithdrawalContent = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const classes = useStyles()
  const [values, setValues] = useState({
    bankName: "",
    acctName: "",
    acctNumb: "",
  })
  const [banks, setBanks] = useState([])
  const [next, setNext] = useState(false)
  // const { set } = useCollection(`doctors/${user.uid}/private`, {
  //   skip: true,
  // })
  const { set } = useDocument(`doctors/${user.uid}/private/bank_accounts`, {
    skip: true,
  })

  useEffect(() => {
    const fetchBanks = async () => {
      if (user.country && user.country.includes("igeria")) {
        const data = await fetchWithToken("/get-banks")
        setBanks(data.data)
      }
    }
    fetchBanks()
  }, [user.country])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleResolveAccount = async () => {
    if (!values.acctNumb) {
      enqueueSnackbar("Please fill the necessary fields", {
        variant: "info",
      })

      return
    }
    setNext(true)
    const selectedbank = banks.filter((bank) => bank.name === values.bankName)
    const { code } = selectedbank[0]
    // selected bbank should be the bank object selected byy the user
    // the user selects a bank name, then we get the selected bank details from
    // the list of banks
    // because the code wont be in the select field
    // only the bank name
    // to get the bank details fro the bank nae, we use filter
    // i did not test it tho
    // then u can use the selectedbank.whatever to resolve the account
    // return
    try {
      const data = await fetchWithToken("/resolve-account", {
        body: {
          bank_code: code,
          account_number: values.acctNumb,
        },
      })
      setValues({ ...values, acctName: data.data.account_name })
    } catch (err) {
      enqueueSnackbar("Invalid account information", {
        variant: "error",
      })
      setNext(false)
    }
    // setNameLoaded()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      values.acctName !== "" &&
      values.acctNumb !== "" &&
      values.bankName !== ""
    ) {
      await set(
        {
          accounts: firebase.firestore.FieldValue.arrayUnion({
            accountName: values.acctName,
            accountNumber: values.acctNumb,
            bankName: values.bankName,
          }),
        },
        { merge: true }
      )
      enqueueSnackbar("Your account details have been added successfully", {
        variant: "success",
      })
      setValues({
        bankName: "",
        acctName: "",
        acctNumb: "",
      })
      setNext(false)
    } else {
      enqueueSnackbar("Please input correct account details", {
        variant: "error",
      })
    }
  }
  const { bankName, acctName, acctNumb } = values
  return (
    <>
      <form onSubmit={handleSubmit}>
        {user.country === "Nigeria" ? (
          <>
            <Typography
              component="h6"
              variant="h6"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              Add Account
            </Typography>
            <FadeIn>
              <TextField
                select
                id="select-bank-name"
                helperText="Please select your bank"
                name="bankName"
                value={bankName}
                fullWidth
                onChange={handleChange}
              >
                {banks.map((bank) => (
                  <MenuItem value={bank.name} key={bank.slug}>
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>

              {bankName && (
                <FadeIn>
                  <TextField
                    id="acctNumb"
                    name="acctNumb"
                    fullWidth
                    value={acctNumb}
                    label="Account number"
                    variant="outlined"
                    onChange={handleChange}
                    className={classes.number}
                  />
                </FadeIn>
              )}
              {next ? (
                acctName ? (
                  <FadeIn>
                    <TextField
                      id="acctName"
                      value={acctName}
                      fullWidth
                      label="Account Name"
                      className={classes.number}
                      variant="outlined"
                      onChange={handleChange}
                      disabled
                    />
                  </FadeIn>
                ) : (
                  <CircularProgress size={18} style={{ marginTop: 16 }} />
                )
              ) : null}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {!acctName ? (
                  <FadeIn>
                    <Button
                      color="secondary"
                      size="md"
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        justifyContent: "right",
                      }}
                      onClick={handleResolveAccount}
                    >
                      Next
                    </Button>
                  </FadeIn>
                ) : (
                  <Button
                    color="secondary"
                    onClick={handleSubmit}
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </FadeIn>
            {/* </FormControl> */}
          </>
        ) : (
          <FadeIn>
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
              Bank Details
            </Typography>

            <FormControl className={classes.margin} variant="outlined">
              <TextField
                id="bankName"
                name="bankName"
                value={bankName}
                label="Bank Name"
                variant="outlined"
                fullWidth
                className={classes.number}
                onChange={handleChange}
              />
              <TextField
                id="acctNumb"
                value={acctNumb}
                name="acctNumb"
                label="Account number"
                variant="outlined"
                fullWidth
                className={classes.number}
                onChange={handleChange}
              />
              <TextField
                id="acctName"
                name="acctName"
                value={acctName}
                label="Account Name"
                variant="outlined"
                fullWidth
                className={classes.number}
                onChange={handleChange}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="secondary"
                  onClick={handleSubmit}
                  style={{
                    marginTop: "16px",
                  }}
                >
                  Save
                </Button>
              </div>
            </FormControl>
          </FadeIn>
        )}
      </form>
    </>
  )
}

export default WithdrawalContent
