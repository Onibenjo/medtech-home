/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint @typescript-eslint/no-unused-vars

import "firebase/auth"

import React, { createContext, useContext, useEffect, useState } from "react"

import Loader2 from "components/Loader/Lego"
import dynamic from "next/dynamic"
import firebase from "firebase/app"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { initFirebase } from "./auth/initFirebase"

// import Loader from "components/Loader"

// import cookie from "js-cookie"

// import Loading from "components/Loader/Lego"
// import nookies from "nookies"

initFirebase()
// let firebase
// initFirebase2()
//   .then(fb => firebase=fb)
//   .catch(console.error);
interface LoginProps {
  redirectTo: string
}
const LoginPage = dynamic<LoginProps>(() => import("components/Login/index"), {
  loading: () => <p>Loading...</p>,
})

type BaseUser = {
  type?: string
  uid?: string
  displayName?: string
  email?: string
  photoURL?: string
  xa?: string
  balance?: number
  id?: string
  exists?: boolean
  hasPendingWrites?: boolean
  state?: string
  createdAt?: boolean
  firstName?: string
  country?: string
  thumbnail?: string
  gender?: string
  imageUrl?: string
  lastName?: string
  role?: string
  workingHours?: any
}

type InitialStateType = {
  user: BaseUser | any
  isAuthenticated: boolean
  loading: boolean
  initializing: boolean
  error?: string | null
  setError?: React.Dispatch<React.SetStateAction<string | null>>
  setUser?: (user: BaseUser) => void
  toggleLoading?: (value: boolean) => void
}

// const authContext = createContext<InitialStateType | null>(null)
const authContext = createContext<InitialStateType>({
  initializing: true,
  user: null,
  isAuthenticated: false,
  loading: true,
})

function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuth = () => {
  const context: InitialStateType | null = useContext(authContext)
  // if (!context) return {}
  // if (context === null) return {}
  return context
}

// Provider hook that creates auth object and handles state
// function useProvideAuth() {
// const useProvideAuth: React.FC = ({ children }) => {
const useProvideAuth = () => {
  const [state, dispatch] = React.useReducer(user_reducer, {
    initializing: true,
    isLoading: true,
    user: null,
    error: "",
  })
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState<string | null>(null)
  // const [state, setState] = useState({
  //   initializing: true,
  //   isLoading: true,
  //   user: null,
  //   // token: null
  // })
  // const setUser = (newUser) => setState(old => ({ ...old, user: {...old.user, ...newUser }}))

  const setUser = React.useCallback(
    (user) =>
      dispatch({
        type: actionTypes.updateUser,
        payload: {
          user,
        },
      }),
    []
  )
  const toggleLoading = (value) =>
    dispatch({
      type: actionTypes.toggleLoading,
      payload: {
        value,
      },
    })

  useEffect(() => {
    let mounted = true
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user && mounted) {
          const { uid, displayName, email, photoURL } = user
          // const userData = {
          //   id: uid,
          //   email,
          // }
          // cookie.set("auth", userData, {
          //   expires: 1,
          //   secure: true,
          // })
          // dispatch({
          //   type: actionTypes.setUser,
          //   payload: {
          //     user
          //   }
          // });
          const tokenResult = await user.getIdTokenResult(false)
          const role = tokenResult.claims.patient
            ? "patient"
            : tokenResult.claims.doctor
            ? "doctor"
            : tokenResult.claims.admin
            ? "admin"
            : null
          dispatch({
            type: actionTypes.setUser,
            payload: {
              user: {
                type: role,
                uid,
                displayName,
                email,
                photoURL,
                admin: !!tokenResult.claims.admin,
              },
            },
          })
        } else {
          dispatch({
            type: actionTypes.setUser,
            payload: {
              user: null,
            },
          })
        }
      } catch (e) {
        console.log("There was an error loading details", e)
        if (e.code === "auth/network-request-failed") {
          setError("You appear to be offline")
        }
      } finally {
        dispatch({
          type: actionTypes.toggleLoading,
          payload: {
            value: false,
          },
        })
      }
    })

    // Cleanup subscription on unmount
    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  // Return the user object and auth methods
  const authCtx = {
    user: state.user,
    isAuthenticated: !!state.user,
    loading: state.isLoading,
    initializing: state.initializing,
    error,
    setError,
    setUser,
    toggleLoading,
  }
  return authCtx
  // return state.isLoading ? (
  //   <Loader2 title="Loading" loading={state.initializing} />
  // ) : (
  //   <authContext.Provider value={authCtx}>{children}</authContext.Provider>
  //   )
  // return <authContext.Provider value={authCtx}>{children}</authContext.Provider>
}

// const useUser = () => {
//   const [user, setUser] = useState()
//   const router = useRouter()

//   const logout = async () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         // Sign-out successful.
//         cookie.remove("auth")
//         router.push("/auth")
//       })
//       .catch((e) => {
//         console.error(e)
//       })
//   }

//   useEffect(() => {
//     const cookieAuth = cookie.get("auth")
//     if (!cookieAuth) {
//       router.push("/")
//       return
//     }
//     setUser(JSON.parse(cookieAuth))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return { user, logout }
// }

export const actionTypes = {
  setUser: "SET_USER",
  toggleLoading: "TOGGLE_LOADING",
  setError: "SET_ERROR",
  updateUser: "UPDATE_USER",
}

export const user_reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setUser:
      return {
        user: action.payload.user,
        initializing: false,
        isLoading: true,
        error: "",
      }
    case actionTypes.updateUser:
      return {
        user: { ...state.user, ...action.payload.user },
        initializing: false,
        isLoading: false,
        error: "",
      }
    case actionTypes.toggleLoading:
      return {
        ...state,
        isLoading: action.payload.value,
      }
    case actionTypes.setError:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      throw new Error(`No case for type ${action.type} found.`)
  }
}

function ProtectRoute({ children }) {
  const { isAuthenticated, loading, initializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (initializing) return
    // if (!isAuthenticated) router.replace(router.route, "/login", { shallow: true })
    if (!isAuthenticated && !initializing)
      router.replace(router.route, "/login", { shallow: true })
    // }, [isAuthenticated])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing, isAuthenticated])

  if (loading)
    return <Loader2 title="Loading" loading={initializing || loading} />
  if (!isAuthenticated && !initializing)
    return <LoginPage redirectTo={router.pathname} />
  return children
  // return (<Component />)
  // }
}

export {
  // useUser,
  ProvideAuth,
  useAuth,
  authContext,
  ProtectRoute,
}
