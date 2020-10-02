import React, { useState, useCallback } from "react"
import { useSnackbar } from "notistack"
import Typography from "@material-ui/core/Typography"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { makeStyles } from "@material-ui/core/styles"
import { useCollection } from "hooks/useCollection"
import firebase from "firebase/app"
// import Button from "../CustomButtons/Button"
import Button from "@material-ui/core/Button"
import StarRating from "../StarRating"

const useStyles = makeStyles({
  title: {},
  textArea: {
    width: "100%",
    marginTop: 12,
    marginBottom: 12,
  },
  p: {
    marginTop: 12,
  },
})

interface Props {
  doctorId: string
  patientId: string
  patientImage: string
  patientName: string
  onClose: Function
}
const Review = ({
  doctorId,
  patientId,
  patientImage,
  patientName,
  onClose,
}: Props) => {
  const [rating, setRating] = useState(0)
  const [reviewNote, setReviewNote] = useState("")
  const { add } = useCollection(`doctors/${doctorId}/reviews`, {
    skip: true,
  })
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await add({
        rating,
        reviewNote,
        patientId,
        patientImage,
        patientName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      enqueueSnackbar("Review Added!", {
        variant: "success",
      })
      onClose()
    } catch (_e) {
      enqueueSnackbar("There was an error", {
        variant: "error",
      })
    }
  }

  const setRatingCallback = useCallback((newRating) => {
    setRating(newRating)
  }, [])

  return (
    <div>
      <Typography component="p" variant="body1">
        How would you rate your session
      </Typography>
      <StarRating review rating={rating} setRating={setRatingCallback} />
      <form className="w-100 pt-3" id="form" onSubmit={handleSubmit}>
        <TextareaAutosize
          className={classes.textArea}
          aria-label="review"
          rowsMin={7}
          placeholder="Write a short note about the session"
          onChange={(e) => setReviewNote(e.target.value)}
          value={reviewNote}
        />
        <Button onClick={handleSubmit} color="primary" size="medium">
          Submit Review
        </Button>
      </form>
    </div>
  )
}

export default Review
