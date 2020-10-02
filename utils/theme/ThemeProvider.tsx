/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import { MuiThemeProvider } from "@material-ui/core"
import getThemeByName from "../../theme"

export const ThemeContext = React.createContext((themeName: string): void => {})

const ThemeProvider: React.FC = ({ children }) => {
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState("light")

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName)

  return (
    <ThemeContext.Provider value={_setThemeName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
