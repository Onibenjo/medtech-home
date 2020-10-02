import React from "react"
import Image from "../Image"

const Partner = ({ className, logo, alt, ...rest }) => {
  return (
    <>
      <div className={className}>
        {/* <picture>
          <source srcSet={`${logo}?webp`} type="image/webp" />
          <source srcSet={`${logo}`} type="image/jpg" />
          <img style={{ width: "7rem" }} src={logo} alt="" />
        </picture> */}
        <Image src={logo} alt={alt} {...rest} />
      </div>
    </>
  )
}

export default Partner
