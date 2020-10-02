/* eslint-disable react/destructuring-assignment */
import React from "react"
// import "./index.scss"

const Notification = (props) => {
  const [isShown, setIsShown] = React.useState(false)
  const [isLeaving, setIsLeaving] = React.useState(false)

  let timeoutId = null

  React.useEffect(() => {
    setIsShown(true)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [props.isShown, props.timeout, timeoutId])

  const closeNotification = () => {
    setIsLeaving(true)
    timeoutId = setTimeout(() => {
      setIsLeaving(false)
      setIsShown(false)
    }, 250)
  }

  return (
    isShown && (
      <>
        <div
          className={`alert ${props.type}${isLeaving ? " leaving" : ""}`}
          role="alert"
        >
          <button
            className="close"
            onClick={closeNotification}
            type="button"
            aria-label="Close"
          />
          {props.message}
        </div>
        <style jsx>
          {`
            @keyframes leave {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }

            .alert {
              padding: 0.75rem 0.5rem;
              margin-bottom: 0.5rem;
              text-align: left;
              padding-right: 40px;
              border-radius: 4px;
              font-size: 16px;
              position: relative;
            }

            .alert.warning {
              color: #856404;
              background-color: #fff3cd;
              border-color: #ffeeba;
            }

            .alert.error {
              color: #721c24;
              background-color: #f8d7da;
              border-color: #f5c6cb;
            }

            .alert.leaving {
              animation: leave 0.5s forwards;
            }

            .alert .close {
              position: absolute;
              top: 0;
              right: 0;
              padding: 0 0.75rem;
              color: #333;
              border: 0;
              height: 100%;
              cursor: pointer;
              background: none;
              font-weight: 600;
              font-size: 16px;
            }

            .alert .close:after {
              content: "x";
            }
          `}
        </style>
      </>
    )
  )
}

export default Notification
// EXAMPLE
// <Notification type="info" message="This is info" />
