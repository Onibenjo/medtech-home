import dynamic from "next/dynamic"

const VideoPage = dynamic(() => import("components/Room/room4"), { ssr: false })

const Room4 = () => {
  return <VideoPage />
}

export default Room4
