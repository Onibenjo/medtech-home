import dynamic from "next/dynamic"
import { getLayout as getSiteLayout } from "components/Dashboard/Dashboard"

// import AdminPage from "components/AdministratorPage/AdminPage"

const AdminPage = dynamic(
  () => import("components/AdministratorPage/AdminPage"),
  { ssr: false }
)

const Admin = () => {
  return (
    <>
      <AdminPage />
    </>
  )
}
Admin.getLayout = getSiteLayout
export default Admin
