/* eslint-disable no-param-reassign */
import React, { Dispatch, SetStateAction, MutableRefObject } from "react"
import { useAuth } from "utils/use-auth"
import { useDocument } from "hooks/useDocument"
import useParticipants from "hooks/useParticipants/useParticipants"
import useTwilioVideo from "hooks/useTwilioVideo/useTwilioVideo"
import firebase from "firebase/app"

// function convertNumToTime(number) {
//   // var sign = (number >= 0) ? 1 : -1;

//   const hour = Math.floor(number)
//   let decpart = number - hour
//   const min = 1 / 60
//   decpart = min * Math.round(decpart / min)
//   const minute = Math.floor(decpart * 60)
//   // var secondsdecpart = signminute - minute;
//   const second = 0
//   return { hour, minute, second }
// }

// const shorterTimeCalculator = (num) => {
//   const date = new Date(0)
//   date.setSeconds(num)
//   const timeString = date.toISOString().substr(11, 8)
//   // date.toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
//   // date.toString().split(" ")[4];
//   console.log(timeString)
// }
const secondsToTime = (sec) => {
  const secs = Math.round(sec)
  const hour = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  const minute = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const second = Math.ceil(divisorForSeconds)

  const obj = {
    hour,
    minute,
    second,
  }

  return obj
}

const basePrice = 120

type Time = {
  hours: number
  minutes: number
  seconds: number
}

interface Props {
  price?: number | boolean
  id?: string
  docId?: string
  setInitialAmount?: Dispatch<SetStateAction<number>>
  setStartingAmount: Dispatch<SetStateAction<number>>
  timeRef: MutableRefObject<{ hours: number; minutes: number; seconds: number }>
  initialTimeRef: MutableRefObject<{
    hours: number
    minutes: number
    seconds: number
  }>
  initialAmountRef: MutableRefObject<number>
  done: boolean
}

const CountDown = ({
  price = true,
  // setInitialAmount,
  initialAmountRef,
  docId,
  setStartingAmount,
  timeRef,
  initialTimeRef,
  done,
}: Props) => {
  const { user } = useAuth()
  const participants = useParticipants()
  const { leaveRoom } = useTwilioVideo()
  const {
    data,
    update,
    loading,
  } = useDocument(`patients/${user.uid}/private/wallet`, { skip: false })
  const { update: docUpdate } = useDocument(`doctors/${docId}/private/wallet`, {
    skip: true,
  })

  const [paused] = React.useState(false)
  const [over, setOver] = React.useState(false)
  const { hour, minute, second } = secondsToTime(0)
  // const [hours, setHours] = React.useState(0)
  // const [minutes, setMinutes] = React.useState(0)
  // const [seconds, setSeconds] = React.useState(0)
  const [time, setTime] = React.useState<Time>({
    hours: hour,
    minutes: minute,
    seconds: second,
  })
  React.useEffect(() => {
    // update({ balance: 2400 })
    if (data.balance <= 0) leaveRoom()
    setStartingAmount(data.balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.balance])

  React.useEffect(() => {
    if (data.balance) {
      // update({ balance: 60 })
      const priceToCalc = data.balance
      // setInitialAmount(priceToCalc)

      const priceTime = (priceToCalc / basePrice) * 60
      // const priceTime = priceToCalc / (60 * basePrice)

      const calcTime = secondsToTime(priceTime)

      setTime({
        hours: calcTime.hour,
        minutes: calcTime.minute,
        seconds: calcTime.second,
      })
      initialTimeRef.current = {
        hours: calcTime.hour,
        minutes: calcTime.minute,
        seconds: calcTime.second,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const tick = async () => {
    if (loading || data.balance <= 0 || paused || over || done) return
    initialAmountRef.current =
      (time.hours * 60 + time.minutes + time.seconds / 60) * basePrice
    // setInitialAmount(
    //   (time.hours * 60 + time.minutes + time.seconds / 60) * basePrice
    // )
    timeRef.current = time
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      // i removed this
      await update({ balance: 0 })
      docUpdate({
        balance: firebase.firestore.FieldValue.increment(
          (data.balance * 80) / 100
        ),
      })
      setOver(true)
      leaveRoom()
    } else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      })
    else if (time.seconds === 0) {
      // update({ balance: (time.hours * 60 + time.minutes) * basePrice })
      // update({balance: firebase.firestore.FieldValue.increment(((time.hours * 60) + time.minutes) * basePrice)})
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      })
    } else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      })
  }

  // const reset = () => {
  //   setTime({
  //     hours: Number(hour),
  //     minutes: Number(minute),
  //     seconds: Number(second),
  //   })
  //   setPaused(false)
  //   setOver(false)
  // }

  React.useEffect(() => {
    let timerID
    if (!loading && !over && data.balance > 0 && participants.length > 0) {
      timerID = setInterval(() => tick(), 1000)
      // setInitialAmount((time.hours * 60 + time.minutes + (time.seconds/60)) * basePrice)
    }
    return () => clearInterval(timerID)
  })
  if (loading) return <p>loading</p>
  return (
    <>
      {price && (
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          <p
            style={{
              margin: 0,
              // color: "#fff",
              zIndex: 3,
              position: "relative",
            }}
          >{`${time.hours
            .toString()
            .padStart(2, "0")}:${time.minutes
            .toString()
            .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
          <div>{over ? "Time's up!" : ""}</div>
          {/* <button onClick={() => setPaused(!paused)} type="button">
        {paused ? "Resume" : "Pause"}
      </button>
      <button onClick={() => reset()} type="button">
        Restart
      </button> */}
        </div>
      )}
    </>
  )
}

export default CountDown
// EXAMPLES
// <CountDown hours="1" minutes="45" />
