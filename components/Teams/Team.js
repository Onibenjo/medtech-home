import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import styles from "../../styles/TeamStyle"

const useStyles = makeStyles(styles)
const Team = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.team_container}>
        <div className={classes.team_member}>
          <div className={classes.emine} />
          <div className={classes.team_name}>Emine Nural Ozturk</div>
          <div className={classes.team_details}>Medicine</div>
        </div>
        <div className={classes.team_member}>
          <div className={classes.nelson} />
          <div className={classes.team_name}>Nelson Igbiriki</div>
          <div className={classes.team_details}>CEO</div>
        </div>
        <div className={classes.team_member}>
          <div className={classes.zainab} />
          <div className={classes.team_name}>Zainab Onibon</div>
          <div className={classes.team_details}>COO</div>
        </div>
        <div className={classes.team_member}>
          <div className={classes.benjamin} />
          <div className={classes.team_name}>Oni Benjamin</div>
          <div className={classes.team_details}>CTO</div>
        </div>
      </div>
    </div>
  )
}
export default Team
