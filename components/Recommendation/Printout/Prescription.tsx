import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  content2: {
    fontSize: 90,
  },
}))

const PrintPrescription = ({ prescription, frameRef, printRef }) => {
  const classes = useStyles()
  return (
    <>
      <iframe
        id="ifmcontentstoprint"
        style={{ height: 0, width: 0, position: "absolute" }}
        ref={frameRef}
        title="Prescription"
      />
      <div id="printpresc" style={{ display: "none" }} ref={printRef}>
        <table>
          <thead>
            <tr>
              <td>
                <div className="header-space" style={{ height: 100 }}>
                  &nbsp;
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content" style={{ color: "red" }}>
                  {prescription.diagnosis}
                </div>
                <div className={classes.content2}>{prescription.id}</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="footer-space" style={{ height: 100 }}>
                  &nbsp;
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div
          className="header"
          style={{
            position: "fixed",
            top: 0,
            textAlign: "center",
            height: 100,
          }}
        >
          <img src="/logo.png" alt="medtech africa" width={60} />
          <p>Medtech Africa</p>
        </div>
        <div className="footer">...</div>
        {/* // CSS */}
        <style jsx global>{`
          .header,
          .header-space,
          .footer,
          .footer-space {
            height: 100px;
          }
          .content2 {
            font-size: 50px;
          }
          .header {
            position: fixed;
            top: 0;
            text-align: center;
          }
          .footer {
            position: fixed;
            bottom: 0;
          }
        `}</style>
      </div>
      {/* <button onClick={() => printIframe()} type="button">
        Print
      </button> */}
    </>
  )
}

export default PrintPrescription
