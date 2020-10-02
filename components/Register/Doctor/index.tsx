import { useState } from "react"
import dynamic from "next/dynamic"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Card from "components/Card/Card.js"
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import Info from "components/Register/Doctor/Page1"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import {
  ColorlibConnector,
  ColorlibStepIcon,
  getStepsClinic as getSteps,
} from "components/Stepper"
import { FaUser, FaLocationArrow } from "react-icons/fa"
import { BsFillAwardFill } from "react-icons/bs"
import styles from "styles/RegisterStyle"
import Loader from "components/Loader/index2"
import fetchApi from "utils/lib/fetchApi"
import { useSnackbar } from "notistack"
import CardBody from "components/Card/CardBody"
import Typography from "@material-ui/core/Typography"
import FadeIn from "react-reveal/Fade"
// import FadeIn from "react-fade-in"
import Link from "next/link"
import Button from "@material-ui/core/Button"
import CardFooter from "components/Card/CardFooter"
import format from "date-fns/format"

const initialDetails = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "other",
  country: null,
  dob: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12 * 16),
  title: "",
  phoneNumber: "",
  city: "",
  gradSch: "",
  gradYear: null,
  license: "",
  experience: "",
  certificate: "",
  idCard: "",
  specialty: "",
  specifiedSpecialty: "",
  service: "volunteer",
  role: "doctor",
}

const gridOptions = {
  xs: 11,
  sm: 10,
  md: 4,
  lg: 3,
}

const useStyles = makeStyles(() => createStyles(styles))

const ClinicInfo = dynamic(() => import("components/Register/Doctor/Page2"), {
  loading: () => <Loader size={100} />,
})
const Credentials = dynamic(() => import("components/Register/Doctor/Page3"), {
  loading: () => <Loader size={100} />,
})

const RegisterDoc = () => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const steps = getSteps()
  // const router = useRouter()
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState(initialDetails)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState({})
  const [phoneCode, setPhoneCode] = useState("")

  const nextStep = () => {
    setStep((prev) => (prev >= 3 ? 3 : prev + 1))
  }

  const prevStep = () => {
    setStep((prev) => (prev <= 1 ? 1 : step - 1))
  }

  const handleChange = (event) => {
    const { name, id, value } = event.target
    setDetails((s) => ({ ...s, [name || id]: value }))
  }
  const setAutoComplete = (stateVal, val) => {
    setDetails((s) => ({ ...s, [stateVal]: val }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (
        !Object.keys(details)
          .filter((u) => !u.includes("pecialt"))
          .map((i) => details[i])
          .filter((b) => Boolean(!b)).length
      ) {
        // const { label } = details.country
        const specialty =
          details.specialty === "Others"
            ? details.specifiedSpecialty
            : details.specialty
        const dob = format(details.dob, "dd/MM/yyyy")
        await fetchApi("/user/register/doctor", {
          body: {
            ...details,
            specialty,
            phoneNumber: `+${phoneCode}${details.phoneNumber}`,
            pass: details.email,
            // @ts-ignore
            country: details.country?.label,
            dob,
          },
        })

        enqueueSnackbar("Submitted successfully", {
          variant: "success",
        })
        setSuccess(true)
      } else {
        // eslint-disable-next-line no-alert
        enqueueSnackbar("fill in all fields", {
          variant: "error",
        })
      }
    } catch (err) {
      enqueueSnackbar(err.message || "There was an error! Try again", {
        variant: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={7} lg={5}>
          <Card>
            <CardBody className={classes.successMessage}>
              <Typography variant="h6" align="center" component="h6">
                Submitting...
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  if (success)
    return (
      <GridContainer justify="center">
        <GridItem>
          <img src="/svg/verified_account.svg" alt="icon" width={60} />
          <p>Signing up is easy</p>
        </GridItem>
        <GridItem xs={12} sm={10} md={7} lg={5}>
          <Card>
            <CardBody className={classes.successMessage}>
              <Typography variant="h5" align="center" component="h5">
                Thank you for registering. Check your mail for further
                information.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(/vector5.svg)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container} style={{ overflow: "hidden" }}>
          <GridContainer
            justify="center"
            className={classes.grid}
            align="center"
          >
            <GridItem {...gridOptions}>
              {/* <MdAttachMoney size={30} title="Money" /> */}
              <img src="/svg/cash_in_hand.svg" alt="icon" width={75} />
              <p className={classes.gridHeader}>Earn anywhere, anytime</p>
              <p>
                Consult with patients when you want and earn up to $10 per hour
              </p>
              {/* // <p>Consult with patients when you want.</p> */}
            </GridItem>
            <GridItem {...gridOptions}>
              {/* <MdSchedule size={30} title="Schedule" /> */}
              <img src="/svg/schedule.svg" alt="icon" width={60} />
              <p className={classes.gridHeader}>Set your own schesule</p>
              <p>
                Only consult when it works for you. You control your time. Own
                your virtual clinic.
              </p>
            </GridItem>
            <GridItem {...gridOptions}>
              {/* <MdFileUpload size={30} title="Upload" /> */}
              <img src="/svg/verified_account.svg" alt="icon" width={60} />
              <p className={classes.gridHeader}>Signing up is easy</p>
              <p>
                Create an account and gain access to the platform. Upload your
                medical credentials for verification by our trusted doctor
                review team.
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={7} lg={5}>
              <Card>
                <div className={classes.cardHeader}>
                  <h1>Register</h1>
                  <h2 style={{ fontSize: "1rem" }}>
                    as a volunteer or paid doctor
                  </h2>
                </div>
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
                              1: <FaUser size={23} />,
                              2: <BsFillAwardFill size={23} />,
                              3: <FaLocationArrow size={23} />,
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
                  {/* {step === 1 && ( */}
                  {/* <FadeIn when={step === 1}> */}
                  <Info handleChange={handleChange} step={step} {...details} />
                  {/* </FadeIn>
                  <FadeIn when={step === 2}> */}
                  <ClinicInfo
                    handleChange={handleChange}
                    setAutoComplete={setAutoComplete}
                    step={step}
                    phoneCode={phoneCode}
                    setPhoneCode={setPhoneCode}
                    {...details}
                  />
                  {/* </FadeIn>
                  <FadeIn when={step === 3}> */}
                  <Credentials
                    handleChange={handleChange}
                    setAutoComplete={setAutoComplete}
                    step={step}
                    {...details}
                    error={error}
                    setError={setError}
                    setDetails={setDetails}
                    handleSubmit={handleSubmit}
                  />
                  {/* </FadeIn> */}
                  <CardFooter
                    className={classes.cardFooter}
                    style={{ flexDirection: "column" }}
                  >
                    <div className={classes.buttonContainer}>
                      <Button
                        color="primary"
                        size="medium"
                        onClick={prevStep}
                        disabled={step === 1}
                      >
                        Back
                      </Button>
                      <Button
                        color="secondary"
                        size="medium"
                        onClick={nextStep}
                        disabled={step === 3}
                      >
                        Next
                      </Button>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      Already have an account?
                      <Link href="/clinic/login">
                        <a style={{ color: "purple", cursor: "pointer" }}>
                          Login
                        </a>
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default RegisterDoc
