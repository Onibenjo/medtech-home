/* eslint-disable import/no-unresolved */
import React from "react"

// import hippa from "../images/hippa.png?webp";
import { makeStyles } from "@material-ui/core/styles"
import data from "../images/data.png?webp"
import data2 from "../images/data.png"
import hybrid from "../images/hybrid.png?webp"

const useStyle = makeStyles((theme) => ({
  title: {
    ...theme.typography.h4,
  },
}))

export default function Certified() {
  const classes = useStyle()
  return (
    <div className="certified">
      <h2 className={classes.title}>Verified And Trusted</h2>
      <ul>
        {/* <li style={{ margin: "5px" }}>
            <img src={hippa} alt="lock" />
            <span> HIPAA Compliance </span>
          </li> */}

        <li>
          {/* <img src={data} alt="Data Secured" /> */}
          <picture>
            <source srcSet={data} />
            <source srcSet={data2} type="image/png" />
            <img src={data2} alt="data" />
          </picture>
          <span> Data Secured </span>
        </li>
        <li>
          <img src={hybrid} alt="security" />
          <span> Hybrid Cloud Based </span>
        </li>
      </ul>
      <style jsx>
        {`
          .certified {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            list-style: none;
            text-align: center;
            padding: 4rem 0;
            background: #ffffff;
            box-shadow: 0 2px 4px #ccc;
            font-size: 2rem;
            min-height: 50vh;
            // clip-path: polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%);
            // border-bottom: 4px solid green;
            background-color: #fff;
          }
          .certified .title {
          }
          .certified ul {
            font-size: 0.85em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: -2rem;
          }
          .certified ul li {
            list-style: none;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-align: left;
            margin: 5px;
          }
          .certified ul li img {
            width: 25px;
            height: 25px;
            margin-right: 3px;
          }
        `}
      </style>
    </div>
  )
}
