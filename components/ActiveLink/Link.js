/* eslint-disable jsx-a11y/anchor-has-content */
import { useRouter } from "next/router"
import MuiLink from "@material-ui/core/Link"
import cx from "classnames"
import NextLink from "next/link"
import React, { forwardRef } from "react"

export function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    color: router.pathname === href ? "red" : "black",
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

const NextComposed = forwardRef(function NextComposed(props, ref) {
  const { as, href, prefetch, ...other } = props

  return (
    <NextLink href={href} as={as} prefetch={prefetch || false}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

function Link(props) {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === "string" ? href : href.pathname
  const className = cx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    )
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  )
}

// Link.propTypes = {
//   activeClassName: PropTypes.string,
//   as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   className: PropTypes.string,
//   href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   naked: PropTypes.bool,
//   onClick: PropTypes.func,
//   prefetch: PropTypes.bool,
// }

export default forwardRef((props, ref) => <Link {...props} innerRef={ref} />)
