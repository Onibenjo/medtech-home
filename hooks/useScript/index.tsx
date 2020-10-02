/* eslint-disable consistent-return */
import { useState, useEffect } from "react"

export interface ScriptProps {
  src: HTMLScriptElement["src"]
  checkForExisting?: boolean
  [key: string]: any
}

type ErrorState = ErrorEvent | null

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined"

export default function useScript({
  src,
  checkForExisting = false,
  ...attributes
}: ScriptProps): [boolean, ErrorState] {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorState>(null)

  useEffect(() => {
    if (!isBrowser) return

    if (checkForExisting) {
      const existing = document.querySelectorAll(`script[src="${src}"]`)
      if (existing.length > 0) {
        setLoading(false)
        return
      }
    }

    const scriptEl = document.createElement("script")
    scriptEl.setAttribute("src", src)

    Object.keys(attributes).forEach((key) => {
      if (scriptEl[key] === undefined) {
        scriptEl.setAttribute(key, attributes[key])
      } else {
        scriptEl[key] = attributes[key]
      }
    })

    const handleLoad = () => {
      setLoading(false)
    }
    // eslint-disable-next-line no-shadow
    const handleError = (error: ErrorEvent) => {
      setError(error)
    }

    scriptEl.addEventListener("load", handleLoad)
    scriptEl.addEventListener("error", handleError)

    document.body.appendChild(scriptEl)

    return () => {
      scriptEl.removeEventListener("load", handleLoad)
      scriptEl.removeEventListener("error", handleError)
    }
    // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return [loading, error]
}

// Incase of u is assigned to this especially the paystack team if need be, ie fm, asah
//     const [loading, error] = useScript({ src: 'https://js.stripe.com/v3/' });

//     if (loading) return <h3>Loading Stripe API...</h3>;
//     if (error) return <h3>Failed to load Stripe API: {error.message}</h3>;
//   Use with callbacks
//   useScript({
//     src: 'https://js.stripe.com/v3/',
//     onload: () => console.log('Script loaded!')
//   })
//   Check for Existing
//   If you're in an environment where the script may have already been loaded, pass the checkForExisting flag to ensure the script is only placed on the page once by querying for script tags with the same src. Useful for SSR or SPAs with client-side routing.

//   const [loading, error] = useScript({
//     src: 'https://js.stripe.com/v3/',
//     checkForExisting: true
//   })
