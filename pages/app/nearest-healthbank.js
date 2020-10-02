import Head from "next/head"
// import dynamic from "next/dynamic";
import NearestHealthBank from "components/NearestHealthBank/GoogleMap"

// const NearestHealthBank = dynamic(
//   // () => import("components/NearestHealthBank/GoogleMap"),
//   () => import("components/NearestHealthBank/search"),
//   {
//     ssr: false,
//     loading: () => <p>Loading.....</p>,
//   }
// );
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const NearestHealth = () => {
  return (
    <>
      <Head>
        <title>Nearest Health Bank | Medtech Africa</title>
      </Head>
      <NearestHealthBank />
    </>
  )
}

NearestHealth.getLayout = getSiteLayout
export default NearestHealth
