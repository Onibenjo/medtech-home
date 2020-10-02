import { useState, useEffect, useMemo } from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
// @material-ui/icons
import { MdLock, MdLockOpen } from "react-icons/md"
// core components
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"
import Card from "components/Card/Card"
import CardBody from "components/Card/CardBody"
import CardFooter from "components/Card/CardFooter"
import Button from "components/CustomButtons/Button"
import CustomInput from "components/CustomInput/CustomInput"
import styles from "assets/jss/nextjs-material-kit/pages/loginPage"
import { fetchApi } from "utils/lib/fetch"
import Link from "@material-ui/core/Link"

const useStyles = makeStyles(styles)

const SetPassword = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [conPassword, setConPassword] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [expired, setExpired] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // classes
  const classes = useStyles()
  const { token } = router.query

  const decode = useMemo(
    () =>
      typeof window !== "undefined" &&
      token &&
      decodeURIComponent(
        window
          .atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      ),
    [token]
  )

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (password && conPassword && password === conPassword) {
        const res = await fetchApi("/user/doctor/set-password", {
          body: { password, token },
        })
        enqueueSnackbar(res.message, {
          variant: "success",
        })
        router.push("/login")
      } else if (!password || !conPassword) {
        enqueueSnackbar("Please fill in all fields", {
          variant: "warning",
        })
      } else if (password !== conPassword) {
        enqueueSnackbar("Passwords do not match", {
          variant: "error",
        })
      }
    } catch (err) {
      enqueueSnackbar("An error occured! Try again", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // if (!email && !exp) {
    if (!token) {
      setError(true)
      return
      //   router.push("/404")
    }
    setError(false)
    const decoded = JSON.parse(decode)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      setExpired(true)
    }
  }, [decode, token])

  const handleClickShowPassword = (callback) => {
    callback((p) => !p)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  if (expired) {
    return (
      <Grid container justify="center">
        <GridItem xs={10} sm={3} md={4} />
        <GridItem xs={10} sm={7} md={4}>
          <Card>
            <CardBody>
              <h3 style={{ textAlign: "center" }}>
                This link has expired, kindly contact us at
              </h3>
              <Link href="mailto:support@medtech.africa">
                support@medtech.africa
              </Link>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    )
  }

  if (error)
    return (
      <Grid container justify="center">
        <GridItem xs={10} sm={3} md={4} />
        <GridItem xs={10} sm={7} md={4}>
          <Card>
            <CardBody>
              <h3 style={{ textAlign: "center" }}>
                This link is invalid. Kindly contact us at
              </h3>
              <Link href="mailto:support@medtech.africa">
                support@medtech.africa
              </Link>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    )

  return (
    <div
      className={classes.pageHeader}
      style={{
        minHeight: "100vh",
      }}
    >
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={3} md={4} />
          <GridItem xs={10} sm={7} md={4}>
            <Card>
              <form className={classes.form} onSubmit={handleSubmit}>
                <CardBody>
                  <h3 style={{ textAlign: "center" }}>
                    Thank you for registering!
                  </h3>
                  <h4 style={{ textAlign: "center" }}>
                    Kindly set a password!
                  </h4>
                  <CustomInput
                    labelText="Password..."
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      type: showPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleClickShowPassword(setShowPassword)
                            }
                            aria-label="toggle password visibility"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                          >
                            {!showPassword ? (
                              <MdLock className={classes.inputIconsColor} />
                            ) : (
                              <MdLockOpen className={classes.inputIconsColor} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Confirm Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: conPassword,
                      onChange: (e) => setConPassword(e.target.value),
                      type: showConfirmPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleClickShowPassword(setShowConfirmPassword)
                            }
                            aria-label="toggle password visibility"
                            onMouseDown={handleMouseDownPassword}
                          >
                            {!showConfirmPassword ? (
                              <MdLock className={classes.inputIconsColor} />
                            ) : (
                              <MdLockOpen className={classes.inputIconsColor} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                    }}
                  />
                </CardBody>
                <CardFooter
                  className={classes.cardFooter}
                  style={{ flexDirection: "column" }}
                >
                  <Button
                    block
                    type="submit"
                    color="primary"
                    size="lg"
                    // fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className={classes.rotate} />
                    ) : (
                      "SET PASSWORD"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export default SetPassword
