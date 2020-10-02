import React from "react"
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import classNames from "classnames"
// core components
import buttonStyle from "../../assets/jss/nextjs-material-kit/components/buttonStyle.js"

const makeComponentStyles = makeStyles((theme) => ({
  ...buttonStyle,
  primary: {
    ...buttonStyle.primary,
    background: theme.palette.primary.dark,
  },
  secondary: {
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}))

const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props

  const classes = makeComponentStyles()

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  })
  return (
    <Button {...rest} ref={ref} classes={{ root: btnClasses }}>
      {children}
    </Button>
  )
})

export default RegularButton
