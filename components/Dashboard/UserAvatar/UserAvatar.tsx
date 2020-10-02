import React from "react"
import Badge, { BadgeProps } from "@material-ui/core/Badge"
import Avatar from "@material-ui/core/Avatar"
// import makeStyles from "@material-ui/styles/makeStyles"
// import { createStyles, Theme } from "@material-ui/core/styles"
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles,
} from "@material-ui/core/styles"
// import { deepOrange } from '@material-ui/core/colors'
import { MdPerson } from "react-icons/md"

type Props = {
  online?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    red: {
      // color: "white",
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      // backgroundColor: "#F22F46",
      fontSize: "1rem",
      height: "2rem",
      width: "2rem",
      padding: 4,
    },
  })
)

const StyledBadge = withStyles(
  (theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: (props: Props) =>
          props.online ? "#44b700" : theme.palette.error.main,
        color: (props: Props) =>
          props.online ? "#44b700" : theme.palette.error.main,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          // animation: (props) => `1.2s ${props.online ? "infinite" : 1} ease-in-out`,
          animationName: "$ripple",
          animationDuration: "1.2s",
          animationTimingFunction: "ease-in-out",
          animationDelay: "0s",
          animationIterationCount: (props) => (props.online ? "infinite" : 2),
          animationDirection: "normal",
          animationFillMode: "none",
          animationPlayState: "running",
          // border: "1px solid currentColor",
          border: (props2) =>
            props2.online ? "1px solid currentColor" : "none",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
)(({ online, ...other }: Props & BadgeProps) => <Badge {...other} />)

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((text) => text[0])
    .join("")
    .toUpperCase()
}

export default function UserAvatar({ user, ...props }) {
  const { displayName, photoURL, thumbnail, imageUrl } = user && user
  const image = photoURL || thumbnail || imageUrl
  const classes = useStyles()

  if (user.online === undefined || user.online === null) {
    return image ? (
      <Avatar srcSet={image} src={image} alt={displayName} {...props} />
    ) : (
      <Avatar className={classes.red} {...props}>
        {displayName ? getInitials(displayName) : <MdPerson />}
      </Avatar>
    )
  }

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      online={!!user.online}
    >
      {image ? (
        <Avatar srcSet={image} src={image} alt={displayName} {...props} />
      ) : (
        <Avatar className={classes.red} {...props}>
          {displayName ? getInitials(displayName) : <MdPerson />}
        </Avatar>
      )}
    </StyledBadge>
  )
}
