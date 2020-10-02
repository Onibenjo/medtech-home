/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react"

function Star({ marked, starId, review }) {
  return (
    <span
      star-id={starId}
      style={{ color: "#ff9933", cursor: review ? "pointer" : "none" }}
      role="button"
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  )
}

function StarRating({
  rating: receivedRating,
  review,
  setRating: setParentRating,
}) {
  const [rating, setRating] = React.useState(
    typeof receivedRating === "number" ? receivedRating : 0
  )
  const [selection, setSelection] = React.useState(0)
  const hoverOver = (event) => {
    if (!review) return
    let val = 0
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id")
    if (review) setSelection(val)
  }

  React.useEffect(() => {
    if (review) setParentRating(rating)
  }, [rating, review, setParentRating])

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={(event: React.MouseEvent) => {
        if (!review) return
        const num = Number(
          (event.target as HTMLDivElement).getAttribute("star-id")
        )
        setRating(num || rating)
      }}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          review={review}
          key={`star_${i + 1} `}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  )
}

export default StarRating
// EXAMPLES
// <StarRating rating={2} />
