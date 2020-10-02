import { useState, useEffect } from "react"

/**
 * @param {String} imgUrl image url you want to load lazily
 * @param {String} placeholderUrl image url which will be used to display as placeholder before desired image loaded
 * @param {Object} lazyTarget ref of lazy image element
 * @param {Object} intersectionObserverOptions Intersection observer options
 * @param {String} fallbackUrl fallback image Url when the imgUrl is broken
 */
const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
export default function useLazyImg(
  imgUrl,
  placeholderUrl = placeHolder,
  lazyTarget,
  intersectionObserverOptions = {
    threshold: 0.01,
    rootMargin: "75%",
  },
  fallbackUrl = placeHolder
) {
  const [imgSrc, setImgSrc] = useState(placeholderUrl)
  const [errSrc, setErrSrc] = useState<null | string>(null)
  // const onError = () => setErrSrc(fallbackUrl || placeholderUrl)

  const onLoad = (event) => {
    event.target.classList.add("loaded")
  }

  const onError = (event) => {
    event.target.classList.add("has-error")
    setErrSrc(fallbackUrl || placeholderUrl)
  }

  // load image
  useEffect(() => {
    const refNode = lazyTarget.current
    let lazyImageObserver
    if (
      "IntersectionObserver" in window &&
      lazyTarget &&
      lazyTarget.current instanceof Element
    ) {
      // reload image when prop - imgUrl changedi
      if (imgUrl !== imgSrc) {
        lazyImageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
              // change state
              setErrSrc(null)
              setImgSrc(imgUrl)
              // don't need to observe anymore
              lazyImageObserver.unobserve(entry.target)
            }
          })
        }, intersectionObserverOptions)
        // start to observe element
        lazyImageObserver.observe(lazyTarget.current)
      }
    } else {
      // baseline: load image after componentDidMount
      setImgSrc(imgUrl)
    }
    return () => {
      // on component cleanup, we remove the listner
      if (lazyImageObserver && lazyImageObserver.unobserve) {
        lazyImageObserver.unobserve(refNode)
        lazyImageObserver.disconnect()
      }
    }
  }, [imgUrl, imgSrc, lazyTarget, intersectionObserverOptions])

  return { imgSrc: errSrc || imgSrc, onError, onLoad }
}

// function LazyImage({ imgUrl, placeholderUrl, fallbackUrl }) {
//   const { imgSrc, onError } = useLazyImg(
//     imgUrl,
//     placeholderUrl,
//     null,
//     null,
//     fallbackUrl
//   );
//   return <img src={imgSrc} onError={onError} />;
// }
// Load image when the element you specified is visible

// function LazyImage({ imgUrl, placeholderUrl, fallbackUrl }) {
//   const imgElement = useRef(null);
//   const { imgSrc, onError } = useLazyImg(
//     imgUrl,
//     placeholderUrl,
//     imgElement,
//     null,
//     fallbackUrl
//   );
//   return <img src={imgSrc} ref={imgElement} onError={onError} />;
// }
