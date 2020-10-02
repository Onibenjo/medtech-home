import React, { useState } from "react"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Button from "@material-ui/core/Button"
import DoctorReferral from "./DoctorReferral"
import { useDocument } from "hooks/useDocument"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"


const DoctorNote = (specialty) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const patientId = router.query.room
    ? router.query.room.toString().split("-")[0]
    : ""
  const docId = router.query.room
    ? router.query.room.toString().split("-")[1]
    : ""

  const {
    data: patientNote,
    loading: noteloading,
    set: setNote,
  } = useDocument(`doctors/${docId}/notes/${patientId}`, { listen: true })
  const [doctorNote, setDoctorNote] = useState(patientNote)
  const handleClickSave = async (e) => {
    e.preventDefault()
    await setNote({ note: doctorNote }, { merge: true })
    enqueueSnackbar("Note saved", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    })
  }
  return (
    <div className="note-field">
      <TextareaAutosize
        rowsMax={5}
        rows={4}
        style={{
          backgroundColor: "#01dc6b",
          fontSize: 18,
          border: "2px solid #fff",
          width: 260,
        }}
        aria-label="maximum height"
        placeholder="Note"
        value={doctorNote}
        onChange={(e) => setDoctorNote(e.target.value)}
      />
      <DoctorReferral/>
      <Button onClick={handleClickSave} color="primary" size="small">
        Save
      </Button>
      <style global jsx>{`
        .note-field {
          position: absolute;
          bottom: 32px;
          left: 32px;
          z-index: 222;
          display: flex;
          flex-direction: column !important;
          justify-content: flex-end;
          align-items: flex-end;
        }
      `}</style>
    </div>
  )
}

export default DoctorNote
