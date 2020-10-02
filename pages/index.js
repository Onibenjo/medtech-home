// import { useEffect } from "react"
import Testimonial from "components/testimonial"
import Layout from "../components/Layout/Layout"
import DownloadSection from "../components/Downloadsection/DownloadSection"
import Header from "../components/Header/Header"
import Feature from "../components/Feature/Features"
import OurPartners from "../components/OurPartner/OurPartners"
import Certified from "../components/Certified"
// import SmartMot from "../components/SmartMot"
// import NewsLetter from "../components/NewsLetter"
// import DonateSection from "../components/DonateSection"
import SEO from "../components/SEO"

// function lazyLoadImages(selector = "img") {
//   function createObserver() {
//     const elements = document.querySelectorAll(selector)
//     const observer = new window.IntersectionObserver(
//       (entries, observerChild) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && entry.target.getAttribute("data-src")) {
//             entry.target.src = entry.target.getAttribute("data-src")
//             entry.target.removeAttribute("data-src")
//             observerChild.unobserve(entry.target)
//           }
//         })
//       },
//       {}
//     )

//     Array.prototype.map.call(elements, function (item) {
//       observer.observe(item)
//     })
//   }

//   if (!("IntersectionObserver" in window)) {
//     const polyfill = document.createElement("script")
//     polyfill.src =
//       "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"
//     document.head.appendChild(polyfill)

//     polyfill.onload = () => {
//       createObserver()
//     }
//     return
//   }

//   createObserver()
// }

const Home = () => {
  // useEffect(() => {
  //   lazyLoadImages("img")

  //   return () => {
  //     lazyLoadImages()
  //   }
  // }, [])
  return (
    <>
      <SEO
        title="Medtech Africa | Africa's first PayGo Telemedicine App."
        desc="An online marketplace for medical care on demand. Consult a doctor on your schedule. Pay for the exact consultation time (PayGo Telemedicine)"
        canonical="https://medtech.africa"
        // chatbot
      />
      <Layout>
        <Header />
        <Feature />
        {/* <DonateSection /> */}
        <DownloadSection />
        <OurPartners />
        <Testimonial />
        <Certified />
        {/* <NewsLetter /> */}
        {/* <SmartMot /> */}
      </Layout>
    </>
  )
}

export default Home
