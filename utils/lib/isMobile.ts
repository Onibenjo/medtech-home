const isMobile = (() => {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.userAgent !== "string"
  ) {
    return false
  }
  return /Mobile/.test(navigator.userAgent)
})()

export function ensureMediaPermissions() {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) =>
      devices.every((device) => !(device.deviceId && device.label))
    )
    .then((shouldAskForMediaPermissions) => {
      if (shouldAskForMediaPermissions) {
        return navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((mediaStream) =>
            mediaStream.getTracks().forEach((track) => track.stop())
          )
      }
    })
}

export default isMobile
