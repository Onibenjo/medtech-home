// import DashboardHome from "components/Dashboard/Home";
import dynamic from "next/dynamic"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const DashboardHome = dynamic(() => import("components/Dashboard/Home"), {
  ssr: false,
})
// import {parseCookies} from 'nookies';

const DashboardPage = () => {
  return <DashboardHome />
}
DashboardPage.getLayout = getSiteLayout

// DashboardPage.getInitialProps = async (appContext) => {
//   // export async function getServerSideProps(appContext){
//     // const appProps = await App.getInitialProps(appContext);
//     // only run on server-side, user should be auth'd if on client-side
//     if (typeof window === 'undefined') {
//       const {user} = parseCookies(appContext)
//       // if a token was found, try to do SSA
//       console.log({user})
//       if (user) {
//         try {
//           const headers = {
//             'Content-Type': 'application/json',
//              'Authorization': JSON.stringify({ token: user })
//           };
//           const result = await fetch({url:'/api/validate',  headers });
//           console.log(result)
//           return { ...result, ...appProps};
//         } catch (e) {
//           // let exceptions fail silently
//           // could be invalid token, just let client-side deal with that
//           console.log(e)
//         }
//       }
//     }
//     return {user:''};
//   }

export default DashboardPage
