// import { auth } from "utils/lib/firebase"
import firebase from "firebase/app"
import "firebase/auth"

// const auth = firebase.auth()

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5001/medtech-f46d7/europe-west1/api"
// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_URL
//     : "http://localhost:5001/medtech-f46d7/europe-west1/api"

const match = (url) => !url.startsWith("/api") && url.startsWith("/")

const fetchApi = (url, { body, ...params } = {}) => {
  const headers = { "content-type": "application/json" }
  const config = {
    method: body ? "POST" : "GET",
    ...params,
    headers: {
      ...headers,
      ...params.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  if (match(url))
    return fetch(baseUrl + url, config).then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      }
      return Promise.reject(data)
    })
  // else etch with a designated url
  return fetch(url, config).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return data
    }
    return Promise.reject(data)
  })
}

const fetchWithToken = async (url, { body, ...params } = {}) => {
  const token = await firebase.auth().currentUser.getIdToken()
  const headers = { "content-type": "application/json" }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? "POST" : "GET",
    ...params,
    headers: {
      ...headers,
      ...params.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  if (match(url))
    return window.fetch(baseUrl + url, config).then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      }
      return Promise.reject(data)
    })
  // else etch with a designated url
  return window.fetch(url, config).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return data
    }
    return Promise.reject(data)
  })
}

export { fetchApi, fetchWithToken as default }
