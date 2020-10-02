import React from "react"
import { MdEdit } from "react-icons/md"
import IconButton from "@material-ui/core/IconButton"

const NoteButton = ({ addNote, setAddNote }) => {
  return (
    <div className="edit-icon">
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setAddNote(!addNote)}
        aria-label="close"
        style={{ backgroundColor: "#fff", marginLeft: 16 }}
      >
        <MdEdit style={{ color: "#3dbf28" }} />
      </IconButton>
      <style global jsx>{`
        .edit-icon {
          position: absolute;
          top: 32px;
          right: 32px;
          z-index: 222;
        }
      `}</style>
    </div>
  )
}

export default NoteButton
