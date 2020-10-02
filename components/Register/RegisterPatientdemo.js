import { useState } from "react"
// import { useRouter } from "next/router"
// import dynamic from "next/dynamic"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Slide from "@material-ui/core/Slide"
import Card from "components/Card/Card.js"
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import RegisterPage1 from "components/Register/RegisterPage1"
import RegisterPage2 from "components/Register/RegisterPage2"
import RegisterPage3 from "components/Register/RegisterPage3"
// import { useAuth } from "utils/use-auth"
// import { signup } from "utils/lib/firebase"
import {
  ColorlibConnector,
  ColorlibStepIcon,
  getSteps,
} from "components/Stepper"
import { FaUserCheck, FaUser } from "react-icons/fa"
import styles from "styles/RegisterStyle"
// import Loader from "components/Loader/index2"
import { fetchApi } from "utils/lib/fetch"
import { useSnackbar } from "notistack"
import CardBody from "components/Card/CardBody"
import Typography from "@material-ui/core/Typography"
import { format } from "date-fns"

const initialDetails = {
  firstName: "",
  lastName: "",
  // phoneNumber: "",
  email: "",
  // privilege: "Yes",
  gender: "other",
  // dob: "",
  // state: "",
  country: null,
  pass: "",
  role: "patient",
}

const useStyles = makeStyles(styles)

// const RegisterPage2 = dynamic(
//   () => import("components/Register/RegisterPage2"),
//   { loading: () => <Loader size={100} /> }
// )
// const RegisterPage3 = dynamic(
//   () => import("components/Register/RegisterPage3"),
//   { loading: () => <Loader size={100} /> }
// )

const Register = () => {
  // const { signup } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const steps = getSteps()
  // const router = useRouter()
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState(initialDetails)
  const [passVerification, setPassVerification] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const nextStep = () => {
    setStep((prev) => (prev >= 1 ? 2 : prev + 1))
  }
  const handlePassVerification = () => {
    if (details.pass.length > 5) {
      setPassVerification(false)
    } else {
      setPassVerification(true)
    }
  }

  const prevStep = () => {
    setStep((prev) => (prev <= 1 ? 1 : step - 1))
  }

  // const handleNextClick = () => {
  //   handlePassVerification()
  //   if (!passVerification) nextStep()
  // }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((s) => ({ ...s, [name]: value }))
  }
  const setAutoComplete = (stateVal, val) => {
    setDetails((s) => ({ ...s, [stateVal]: val }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // const { phoneNumber } = details
      if (
        details.firstName !== "" &&
        details.lastName !== "" &&
        details.email !== "" &&
        details.sex !== "" &&
        details.country &&
        details.pass !== ""
      ) {
        // await signup(details, { phoneNumber })
        const { label, phone } = details.country
        const dob = format(details.dob, "dd/MM/yyyy")
        await fetchApi("/user/register/patient", {
          body: {
            ...details,
            country: label,
            phone: phone + details.phone,
            dob,
          },
        })
        // await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/user/register/patient`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       // "Content-Type": "application/json;charset=utf-8",
        //     },
        //     body: JSON.stringify({
        //       ...details,
        //       country: label,
        //       phone: phone + details.phone,
        //       dob,
        //     }),
        //   }
        // )
        // .then((resp) => resp.json())
        setDetails(initialDetails)
        setSuccess(true)
        // await router.push("/login")
        enqueueSnackbar("Registered successfully", {
          variant: "success",
        })
        enqueueSnackbar(`Check your mail for activation`, {
          variant: "info",
        })
      } else {
        // eslint-disable-next-line no-alert
        enqueueSnackbar("fill in all fields", {
          variant: "error",
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      // eslint-disable-next-line no-alert
      enqueueSnackbar(err.message || "There was an error! Try again", {
        variant: "error",
      })
    }
  }
  if (loading)
    return (
      <Card>
        <CardBody className={classes.successMessage}>
          <Typography variant="h6" align="center" component="h6">
            Submitting...
          </Typography>
        </CardBody>
      </Card>
    )
  if (success)
    return (
      <Card>
        <CardBody className={classes.successMessage}>
          <Typography variant="h5" align="center" component="h5">
            Thank you for registering. Check your mail for further information.
          </Typography>
        </CardBody>
      </Card>
    )

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(vector5.svg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <div className={classes.container}>
        <GridContainer
          justify="center"
          className={classes.grid2}
          align="center"
        >
          <GridItem>
            <img src="/svg/verified_account.svg" alt="icon" width={60} />
            <p>Signing up is easy</p>
            <p>
              Create an account and gain access to the platform. Easiest and
              fastest way to communicate with your doctor.
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={7} lg={5}>
            <Card>
              <h1 style={{ padding: "1rem 0", textAlign: "center" }}>
                Register as a Patient
              </h1>

              <Stepper
                alternativeLabel
                activeStep={step - 1}
                connector={<ColorlibConnector />}
                className={classes.stepper}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={(e) =>
                        ColorlibStepIcon({
                          ...e,
                          icons: {
                            1: <FaUser />,
                            // 2: <FiMap />,
                            2: <FaUserCheck />,
                          },
                        })
                      }
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Slide
                  direction="right"
                  in={step === 1}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <RegisterPage1
                      onClick={nextStep}
                      handleChange={handleChange}
                      setAutoComplete={setAutoComplete}
                      passVerification={passVerification}
                      step={step}
                      handlePassVerification={handlePassVerification}
                      {...details}
                    />
                  </div>
                </Slide>

                {/* <Slide
                  direction="right"
                  in={step === 2}
                  mountOnEnter
                  // unmountOnExit
                  timeout={{ exit: 200 }}
                >
                  <div>
                    {step === 2 && (
                      <RegisterPage2
                        onPrevClick={prevStep}
                        onNextClick={handleNextClick}
                        handleChange={handleChange}
                        step={step}
                        passVerification={passVerification}
                        setAutoComplete={setAutoComplete}
                        handlePassVerification={handlePassVerification}
                        {...details}
                      />
                    )}
                  </div>
                </Slide> */}
                <Slide
                  direction="right"
                  in={step === 2}
                  mountOnEnter
                  unmountOnExit
                >
                  {/* {step === 3 && ( */}
                  <div>
                    <RegisterPage3
                      onEditClick={prevStep}
                      {...details}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                  {/* )} */}
                </Slide>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export default Register
