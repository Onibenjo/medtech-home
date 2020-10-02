import { useRouter } from "next/router"
import cx from "classnames"
import NextLink from "next/link"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Children, forwardRef } from "react"

const ActiveLink = ({
  children,
  href,
  prefetch,
  activeClassName,
  ...otherProps
}) =>
  // { router, children, href, prefetch, activeClassName, ...otherProps }: IProps,
  // ref: any
  {
    const router = useRouter()
    const child = Children.only(children)
    const className = cx(child.props.className, {
      [activeClassName]: router.pathname === href && activeClassName,
    })
    // when we just have a normal url we jsut use it
    if (typeof href === "string") {
      return (
        <NextLink
          href={href}
          {...otherProps}
          passHref
          prefetch={prefetch || false}
        >
          {/* // <a {...props} ref={ref} /> */}
          {React.cloneElement(child, { className })}
        </NextLink>
      )
    }
    if (typeof href === "undefined") {
      return null
    }

    return (
      <NextLink
        href={href.to}
        {...otherProps}
        as={href.as}
        passHref
        prefetch={prefetch || false}
      >
        {React.cloneElement(child, { className })}
      </NextLink>
    )
  }

export default ActiveLink
// export const ALink = withRouter(ActiveLink)
