import React from "react"
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { createStyles, withStyles, Theme } from "@material-ui/core/styles"

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 7,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress)

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        {/* <LinearProgress variant="determinate" {...props} /> */}
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export default LinearProgressWithLabel
