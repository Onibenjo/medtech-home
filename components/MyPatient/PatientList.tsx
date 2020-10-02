/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react"
import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { useRouter } from "next/router"
import {
  createStyles,
  makeStyles,
  Theme,
  } from "@material-ui/core/styles"
// import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { MdClose } from "react-icons/md"
import Slide from "@material-ui/core/Slide"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions"
// import patientsData from "../patientsData"
// import { useCollection } from "hooks/useCollection"
import { useCollection } from "hooks/useCollection"
import PatientView from "./PatientView"
import { useAuth } from "../../utils/use-auth"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      background: theme.palette.secondary.main,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    container: {
      padding: theme.spacing(2),
      overflowX: "hidden",
    },
    empty: {
      marginTop: 32,
    },
    rotate: {
      animation: `$rotates 1s linear infinite`,
    },
    "@keyframes rotates": {
      "100%": {
        transform: " rotate(360deg)",
      },
    },
  })
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PatientList = () => {
  const { user } = useAuth()
  const router = useRouter()
  const classes = useStyles()
  const {data: patientsData, loading} = useCollection(`doctors/${user.uid}/mypatients`)

  // const [patientsData, loading, error] = useCollection("patient")

  // closes the mmodal
  const handleClose = () => {
    router.push("/doctors/my-patients")
  }

  //  if (loading) return <Center>Loading...</Center>
  // if (error) return <Center>An error occured, please refresh the page</Center>
  // everything passesp
  return (
    <>
      {!loading ? (
        patientsData.length === 0 ? (
          <Typography
            variant="body1"
            className={classes.empty}
            align="center"
            component="p"
          >
            {" "}
            Patient List is empty
          </Typography>
        ) : (
          <MaterialTable
            title="Patients"
            columns={[
              {
                title: "PATIENT NAME",
                field: "patientName",
              },

              { title: "PATIENT ID", field: "id" },
              { title: "DIAGNOSIS", field: "diagnosis" },
            ]}
            data={patientsData}
            options={{
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                icon: "more",
                tooltip: "More",
                onClick: (event, { id }: any) => {
                  // Do save operation
                  // router.push('/doctors/patient/[pid]', `/doctors/patient/${id}`, {shallow:true});
                  router.push(
                    `/doctors/my-patients?pid=${id}`,
                    `/doctors/patient/${id}`,
                    { shallow: true }
                  )
                },
              },
            ]}
          />
        )
      ) : (
        <AiOutlineLoading3Quarters className={classes.rotate} />
      )}

      <Dialog
        fullScreen
        open={!!router.query.pid}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <MdClose />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Patient
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          <PatientView id={router.query.pid} />
        </main>
      </Dialog>
    </>
  )
}
export default PatientList
