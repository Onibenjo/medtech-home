import { useEffect } from "react"
import Typography from "@material-ui/core/Typography"
// import Team from "../components/Teams/Team"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/Layout/Layout"
import image from "../images/banner.webp"
import SEO from "../components/SEO"
import styles from "../styles/AboutUs"

const usestyles = makeStyles(styles)
function lazyLoadImages(selector = "img") {
  function createObserver() {
    const elements = document.querySelectorAll(selector)
    const observer = new window.IntersectionObserver(
      (entries, observerChild) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.getAttribute("data-src")) {
            entry.target.src = entry.target.getAttribute("data-src")
            entry.target.removeAttribute("data-src")
            observerChild.unobserve(entry.target)
          }
        })
      },
      {}
    )

    Array.prototype.map.call(elements, function (item) {
      observer.observe(item)
    })
  }

  if (!("IntersectionObserver" in window)) {
    const polyfill = document.createElement("script")
    polyfill.src =
      "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"
    document.head.appendChild(polyfill)

    polyfill.onload = () => {
      createObserver()
    }
    return
  }

  createObserver()
}

const About = () => {
  const classes = usestyles()
  useEffect(() => {
    lazyLoadImages("img")

    return () => {
      lazyLoadImages()
    }
  }, [])
  return (
    <>
      <SEO
        title="About Us | Medtech Africa"
        desc="We at medtech believe in equity of healthcare for people living in both urban cities and remote rural areas of Africa to have access to affordable healthcare"
        canonical="https://medtech.africa/about"
      />
      <Layout>
        <div className={classes.root}>
          <div>
            <img
              className={classes.image}
              data-src={image}
              style={{
                width: "100%",
                minHeight: "20vh",
              }}
              alt="Medical professionals meeting"
            />
          </div>
          <main
            style={{
              marginLeft: "6%",
              marginRight: "6%",
              textAlign: "center",
            }}
          >
            <div>
              <Typography variant="body1" gutterBottom component="p">
                Medtech Africa is an innovative medical technology company
                providing good and affordable Medical Services for underserved
                Africans.
              </Typography>
              <Typography variant="body1" gutterBottom component="p">
                We help Sick persons talk to the best doctors in the world
                through an affordable PayGo Telemedicine system and wearable
                Medical IoT device for real time monitoring of personal health
                conditions.
              </Typography>
              <Typography variant="body1" gutterBottom component="p">
                We are developing great products to help underserved Africans
                get improved and affordable world class Medical care.
              </Typography>
              <Typography variant="body1" gutterBottom component="p">
                Medtech Africa is Africa's first PayGo Telemedicine system for
                online, on-demand and scheduled consultation from board
                certified physicians across the world.
              </Typography>
            </div>
            <Typography
              variant="h4"
              gutterBottom
              component="h3"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                // marginRight: "60%",
              }}
            >
              Our Vision
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              component="p"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              To lead a digitalised Medical care world where healthcare is
              accessible at just a click.
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              component="h3"
              style={{
                display: "flex",
                justifyContent: "center",
                // marginRight: "60%",
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              To become the leading digital Healthcare Technology provider in
              Africa bringing new innovations to help solve medical issues.
            </Typography>
          </main>
          {/* <Team /> */}
        </div>
        <style jsx>{`
          .container {
            padding: 2rem 0;
          }
        `}</style>
      </Layout>
    </>
  )
}
export default About
