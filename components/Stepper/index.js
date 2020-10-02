import { makeStyles, withStyles } from "@material-ui/core/styles"
import clsx from "classnames"
import StepConnector from "@material-ui/core/StepConnector"

const color = (theme) => theme.palette.primary.main

export const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      background: color(theme),
    },
  },
  completed: {
    "& $line": {
      background: color(theme),
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}))(StepConnector)

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    background: color(theme),
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    background: color(theme),
  },
}))

export function ColorlibStepIcon({ active, completed, icon, icons }) {
  const classes = useColorlibStepIconStyles()
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  )
}

export function getSteps() {
  return ["Profile", "Success"]
}
export function getStepsClinic() {
  return ["Profile", "Location", "Certification"]
}

function getStepContent(step) {
  switch (step) {
    case 1:
      return "Select campaign settings..."
    case 2:
      return "What is an ad group anyways?"
    default:
      return "Unknown step"
  }
}
