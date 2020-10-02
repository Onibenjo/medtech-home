import React from "react"
import { IoLogoFacebook } from "react-icons/io"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { makeStyles } from "@material-ui/core/styles"
import Link from "../ActiveLink/Link"
import styles from "../../styles/FooterIconsStyle"

const iconProps = {
  color: "rgba(255,255,255,1)",
  size: 25,
}

const useStyles = makeStyles(styles)
const FooterIcons = () => {
  const classes = useStyles()
  return (
    <>
      <ul className={classes.iconsUl}>
        <li className={classes.iconsLi}>
          <Link href="https://facebook.com/medtechafrica" alt="facebook">
            <IoLogoFacebook {...iconProps} />
          </Link>
        </li>
        <li className={classes.iconsLi}>
          <Link href="https://twitter.com/medtech_africa" alt="twitter">
            <FaTwitter {...iconProps} />
          </Link>
        </li>
        <li className={classes.iconsLi}>
          <Link href="https://instagram.com/medtech_africa" alt="instagram">
            <FaInstagram {...iconProps} />
          </Link>
        </li>
        <li className={classes.iconsLi}>
          <Link
            href="https://www.linkedin.com/company/18945246/admin/"
            alt="linkedin"
          >
            <FaLinkedin {...iconProps} />
          </Link>
        </li>
      </ul>
    </>
  )
}
export default FooterIcons
