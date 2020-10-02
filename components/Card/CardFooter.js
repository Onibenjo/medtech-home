import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// @material-ui/icons

// core components
import styles from "../../assets/jss/nextjs-material-kit/components/cardFooterStyle.js"

const useStyles = makeStyles(styles)

export default function CardFooter(props) {
  const classes = useStyles()
  const { className, children, ...rest } = props
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined,
  })
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  )
}
