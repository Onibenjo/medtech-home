import { useState, useEffect } from "react"
// import passlogin from "passlogin"
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
// @material-ui/icons
import { MdEmail, MdLock, MdLockOpen } from "react-icons/md"
// core components
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { signin, signout, sendPasswordResetEmail } from "utils/lib/firebase"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useSnackbar } from "notistack"
import Loader from "components/Loader/Lego"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"
import CardFooter from "../Card/CardFooter"
import Button from "../CustomButtons/Button"
import CustomInput from "../CustomInput/CustomInput"
import styles from "../../assets/jss/nextjs-material-kit/pages/loginPage"
import { useAuth } from "../../utils/use-auth"
import Link from "../ActiveLink/Link"

const ProvideAuth = dynamic(
  () => import("../../utils/use-auth").then((mod) => mod.ProvideAuth),
  {
    ssr: false,
  }
)

const useStyles = makeStyles(styles)

const Login = ({ redirectTo }) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [email, setEmail] = useState("")
  const [resetemail, setResetemail] = useState("")
  // const [emailPass, setEmailPass] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rloading, setRLoading] = useState(false)
  const [reset, setReset] = useState(false)

  // classes
  const classes = useStyles()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (email && password) {
        await signin(email, password)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      })
      setLoading(false)
    }
  }
  const handleReset = async (e) => {
    try {
      e.preventDefault()
      setRLoading(true)
      if (resetemail) {
        const success = await sendPasswordResetEmail(resetemail)
        if (success) {
          enqueueSnackbar("Successful password reset", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
          setResetemail("")
        }
        setRLoading(false)
      } else {
        setRLoading(false)
      }
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
      setRLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      // const tokenResult = await auth.currentUser.getIdTokenResult(false)
      if (user.type === "patient") {
        if (redirectTo && redirectTo.startsWith("/app"))
          router.replace(redirectTo)
        router.replace("/app")
        return
      }
      if (user.type === "doctor") {
        if (redirectTo && redirectTo.startsWith("/doctors"))
          router.replace(redirectTo)
        router.replace("/doctors")
        return
      }
      if (user.type === "admin") {
        if (redirectTo && redirectTo.startsWith("/admin"))
          router.replace(redirectTo)
        router.replace("/admin")
        return
      }
      signout()
    }
    // if (user && !!user.emailVerified) router.push("/doctors/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTo, user])

  // const handlePass = async () => {
  //   if (process.browser) {
  //     const response = await passlogin(
  //       "2TMC0V6-8E14N62-HXYDVPX-HGR3034",
  //       emailPass
  //     )
  //     console.log({ response, emailPass })
  //   }
  // }

  // return user && !!user.emailVerified ? (
  return user ? (
    <Loader title="Redirecting.." loading={!!user} />
  ) : (
    // return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(/vector5.svg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        minHeight: "100vh",
      }}
    >
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={3} md={4} lg={8} />
          <GridItem xs={10} sm={8} md={6} lg={4}>
            <Card>
              <form className={classes.form} onSubmit={handleSubmit}>
                <CardBody>
                  <h3 style={{ textAlign: "center" }}>Welcome</h3>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdEmail className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="pass"
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
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label="toggle password visibility"
                            onMouseDown={() => setShowPassword((p) => !p)}
                          >
                            {!showPassword ? (
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
                    type="submit"
                    block
                    color="primary"
                    size="lg"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        LOG IN{" "}
                        <AiOutlineLoading3Quarters className={classes.rotate} />
                      </span>
                    ) : (
                      "LOG IN"
                    )}
                  </Button>
                  {/* <div style={{ marginTop: "20px" }}>
                    Have a{" "}
                    <img
                      width="29"
                      src="https://res.cloudinary.com/travooler/image/upload/v1592568384/logo_jwdtvz.png"
                      alt="pass_login"
                    />{" "}
                    account?
                  </div>
                  <CustomInput
                    labelText="Email..."
                    id="emailPass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: emailPass,
                      onChange: (e) => setEmailPass(e.target.value),
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdEmail className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                  {/* <Button
                    block
                    color="secondary"
                    size="lg"
                    fullWidth
                    onClick={handlePass}
                  >
                    <img
                      width="25"
                      style={{ marginRight: "9px" }}
                      src="https://res.cloudinary.com/travooler/image/upload/v1592569037/pass.jpg"
                      alt="pass_login"
                    />
                    Pass
                  </Button> */}
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <div>
                      Don't have an account?
                      <Link href="/register-as">Register</Link>
                    </div>
                    <Button
                      link
                      onClick={() => setReset(!reset)}
                      // style={{ color: "purple" }}
                    >
                      Forgot Password?
                    </Button>
                    {reset && (
                      <div>
                        <CustomInput
                          labelText="Email..."
                          id="email"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: resetemail,
                            onChange: (e) => setResetemail(e.target.value),
                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <MdEmail className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          type="submit"
                          block
                          color="primary"
                          size="lg"
                          fullWidth
                          onClick={handleReset}
                          disabled={loading}
                        >
                          {rloading ? (
                            <span>
                              loading...
                              <AiOutlineLoading3Quarters
                                className={classes.rotate}
                              />
                            </span>
                          ) : (
                            " Send reset link"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export const AuthWrapper = (Page) => {
  return () => {
    // const isServer = typeof window === "undefined"

    // if (isServer) {
    //   return (
    //     <SnackbarProvider>
    //       <Page />
    //     </SnackbarProvider>
    //   )
    // }
    return (
      <ProvideAuth>
        <Page />
      </ProvideAuth>
    )
  }
}

export default AuthWrapper(Login)
