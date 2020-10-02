import React from "react"

import { makeStyles } from "@material-ui/core/styles"
// import mockup from "./images/mockup.png?webp"
import Image from "components/Image"
import android from "./images/gstorebtn.png"
import apple from "./images/appstorebtn.png"
import styles from "../../styles/DownloadSectionStyle"

const useStyles = makeStyles(styles)

function DownloadSection() {
  const classes = useStyles()
  return (
    <>
      <section className={classes.download_section}>
        <div>
          <h2 className={classes.download_section_h1}>Coming Soon</h2>
        </div>
        <div className={classes.download_section_btn}>
          <Image
            height="30%"
            width="40%"
            src={android}
            alt="android playstore"
          />
          {/* <br /> */}
          <Image height="30%" width="40%" src={apple} alt="apple store" />
          {/* <br /> */}
          {/* <button className={classes.download_windows}>
            <FaWindows color="#55acef" size="1.2em" />
            <div className={classes.download_windows_text}>
              <span className={classes.download_windows_text_small}>
                Download for
              </span>
              Windows
            </div>
          </button> */}
        </div>
      </section>
    </>
  )
}

export default DownloadSection
