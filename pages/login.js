// import { useRouter } from "next/router";
// import dynamic from "next/dynamic"
// import { ProvideAuth } from "utils/use-auth"
import SEO from "../components/SEO"
import Layout from "../components/Layout/Layout.js"
import Login from "../components/Login/index"
// const Login = dynamic(() => "components/Login/index", { ssr: false })

const LoginPage = () => {
  // const router = useRouter();
  // const { signin, error, user } = useAuth();

  // useEffect(() => {
  //   if (user && !!user.emailVerified) router.push("/doctors/dashboard");
  // }, [user]);

  return (
    // <ProvideAuth>
    <Layout>
      <SEO
        title="Login | Medtech Africa"
        desc="Log in to Medtech Africa and start enjoying quality healthcare. Use the email and password provided to you by Medtech Africa"
        canonical="https://medtech.africa"
      />
      <Login />
    </Layout>
    // </ProvideAuth>
  )
}

export default LoginPage
