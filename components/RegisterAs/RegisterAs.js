import Link from "next/link"
import { Grid } from "@material-ui/core"
import GridItem from "../Grid/GridItem"

const gridOptions = {
  xs: 11,
  sm: 10,
  md: 8,
  lg: 3,
}

const RegisterAs = () => {
  return (
    <section>
      <div className="register-container">
        <div className="register-client flex">
          <Grid container className="cards">
            <GridItem className="gridcenter" {...gridOptions}>
              <h3 className="large-text">
                Register as a Patient{" "}
                <Link href="/register" passHref>
                  <a>
                    <button className="btn" type="button">
                      Click here
                    </button>
                  </a>
                </Link>
              </h3>
            </GridItem>
            <GridItem className="gridcenter" {...gridOptions}>
              <h3 className="large-text">
                Register as a Medical Professional{" "}
                <Link href="/sign-up" passHref>
                  <a>
                    <button className="btn" type="button">
                      Click here
                    </button>
                  </a>
                </Link>
              </h3>
            </GridItem>
          </Grid>
        </div>
        {/* <div className="register-doc flex">
          <h3 className="large-text">Register as a Medical Professional</h3>
          <Link href="/doctors/register" passHref>
            <div className="btn">
              <a>Click here</a>
            </div>
          </Link>
        </div> */}
      </div>
      <style jsx global>
        {`
          .register-container {
            width: 100%;
            height: 90vh;
            display: grid;
            grid-template-columns: 1fr;
          }
          .register-client {
            background: url(client-injection.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.7);
            background-blend-mode: overlay;
            padding: 1rem 2rem;
          }
          .flex {
            display: flex;
            align-items: center;
          }

          .btn{
            background-color: #03d170;
            padding: 10px 16px;
            border: none;
            vertical-align: baseline;
            cursor: pointer;
            border-radius: 5px;
          }
          .large-text {
            color: #fff;
            font-weight: bold;
            font-family: "Poppins", sans-serif;
            text-align: center;
            transition: 0.4s ease-in;
            
          }
          .cards{
            display: grid
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-gap: 5rem;
          }
          @media (min-width: 700px ) {
            .cards { grid-template-columns: repeat(2, 1fr); }
          }
          
          .register-doc {
            background: url(register-doc.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.4);
            background-blend-mode: overlay;
          }
          @media screen and (max-width: 600px) {
            .register-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </section>
  )
}
export default RegisterAs
