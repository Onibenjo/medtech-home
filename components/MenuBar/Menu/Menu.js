import React, { useState, useRef, useCallback } from "react"
import IconButton from "@material-ui/core/IconButton"
import MenuContainer from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { MdMore } from "react-icons/md"
import AboutDialog from "../AboutDialog/AboutDialog"
import UserAvatar from "../UserAvatar/UserAvatar"

import { useAuth } from "../../../utils/use-auth"
import useVideoContext from "../../../hooks/useVideoContext/useVideoContext"

export default function Menu() {
  const { user, signout } = useAuth()
  const { room, localTracks } = useVideoContext()

  const [aboutOpen, setAboutOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const anchorRef = useRef(null)

  const handleSignOut = useCallback(() => {
    room.disconnect?.()
    localTracks.forEach((track) => track.stop())
    signout?.()
  }, [room.disconnect, localTracks, signout])

  return (
    <div ref={anchorRef}>
      <IconButton
        color="inherit"
        onClick={() => setMenuOpen((state) => !state)}
      >
        {user ? <UserAvatar user={user} /> : <MdMore />}
      </IconButton>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen((state) => !state)}
        anchorEl={anchorRef.current}
      >
        {user?.displayName && <MenuItem disabled>{user.displayName}</MenuItem>}
        <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
        {user && <MenuItem onClick={handleSignOut}>Logout</MenuItem>}
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false)
          setMenuOpen(false)
        }}
      />
    </div>
  )
}
