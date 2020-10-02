import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core"

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    sidebarWidth: number
    sidebarMobileHeight: number
    dashboardDrawerBackground: string
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    sidebarWidth?: number
    sidebarMobileHeight?: number
    dashboardDrawerBackground?: string
  }
}

const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // main: "#00a8e1"
      // main: "#036bce"
      main: "#01dc6b",
      // main: "#5ABA4A",
    },
    secondary: {
      main: "rgba(53,89,209,1)",
      // main: "#00a8e1",
      // main: "#63C8F2",
    },
  },
  dashboardDrawerBackground: "#3F4C67",
  sidebarWidth: 240,
  sidebarMobileHeight: 90,
  typography: {
    fontFamily: [
      '"Quicksand"',
      '"Roboto"',
      '"Montserrat"',
      '"Poppins"',
      '"Lato"',
      '"Raleway"',
      '"Helvetica"',
      '"Arial"',
      "sans-serif",
    ].join(","),
  },
  mixins: {
    toolbar: {
      minHeight: 58,
    },
  },
})
const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // main: "#00a8e1"
      // main: "#036bce"
      main: "#01dc6b",
    },
    secondary: {
      main: "#00a8e1",
    },
  },
  dashboardDrawerBackground: "#3F4C67",
  sidebarWidth: 240,
  sidebarMobileHeight: 90,
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
})

const light2 = responsiveFontSizes(light)

const themeMap: { [key: string]: Theme } = {
  light: light2,
  dark,
}

export default function getThemeByName(theme: string): Theme {
  return themeMap[theme]
}
