/* eslint-disable @typescript-eslint/no-explicit-any */
import useLazyImg from "hooks/useLazyImg"
import { useRef } from "react"

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
type Props = {
  src: any
  placeholderUrl?: any
  fallbackUrl?: any
  alt?: string
  props?: any
}
function LazyImage({ src, placeholderUrl, fallbackUrl, ...props }: Props) {
  const imgElement = useRef(null)
  const { imgSrc, onError, onLoad } = useLazyImg(
    src,
    placeholderUrl,
    imgElement,
    undefined,
    fallbackUrl
  )
  return (
    <>
      <img
        src={imgSrc}
        onError={onError}
        alt=""
        {...props}
        ref={imgElement}
        onLoad={onLoad}
      />
      <style jsx>
        {`
          @keyframes loaded {
            0% {
              opacity: 0.1;
            }
            100% {
              opacity: 1;
            }
          }
          img {
            filter: blur(3px);
            max-width: 100%;
          }
          img.loaded:not(.has-error) {
            animation: loaded 300ms ease-in-out;
            filter: blur(0) !important;
          }
          img.has-error {
            // fallback to placeholder image on error
            content: url(${placeHolder});
          }
        `}
      </style>
    </>
  )
}

export default LazyImage
