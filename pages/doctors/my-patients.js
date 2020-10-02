import Head from "next/head"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"
// import PatientList from "components/MyPatient/PatientList";
import dynamic from "next/dynamic"
// import { dynamic } from 'next/dynamic';

const PatientList = dynamic(() => import("components/MyPatient/PatientList"), {
  ssr: false,
})

const MyPatient = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <PatientList />
    </>
  )
}
MyPatient.getLayout = getSiteLayout
export default MyPatient
