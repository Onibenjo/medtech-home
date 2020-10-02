import React from "react"
// import Router from "next/router";
import Layout from "../components/Layout/Layout"

export default function _error() {
  return (
    <Layout>
      <div>
        <img
          src="https://mixpanel.com/site_media/images/error_pages/error_cones.png"
          alt="error"
        />
        <h1>An error occured</h1>
        <h2>Well, this shouldn't have happened...</h2>
        <p>
          The team is working to fix the issue. In the meantime, try refreshing
          or check out our Status page, Community pages or Help Center.
        </p>
      </div>
      <style jsx>
        {`
          h1 {
            font-size: 1.4rem;
          }
          h2 {
            font-size: 1.2rem;
          }
          img {
            width: 30%;
          }
          div {
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            padding: 5rem 1rem;
            width: 90vw;
            justifycontent: center;
          }
        `}
      </style>
    </Layout>
  )
}
