import { useEffect, useCallback } from "react"

const useComponentDidMount = (onMountHandler) => {
  const onMountHandlerCallback = useCallback(() => onMountHandler, [
    onMountHandler,
  ])
  useEffect(() => {
    onMountHandlerCallback()
  }, [onMountHandlerCallback])
}

export default useComponentDidMount
