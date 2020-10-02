import { useState } from "react"
import GridContainer from "../../components/Grid/GridContainer"
import GridItem from "../../components/Grid/GridItem"
import Button from "../../components/CustomButtons/Button"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO"

const SmartMOT = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Layout>
      <SEO
        title="Our Product/SmartMOT| Medtech Africa"
        desc="Our product entails the smartMOT devices with shows your five(5) vital sign..."
        canonical="https://medtech.africa"
      />
      <GridContainer>
        <GridItem xs={12} md={6} />
        <GridItem xs={12} md={6}>
          <h2>Smart MOT</h2>
          <div>
            A smart medical of things (IOT) device that measure patients vitals
            and transmit wirelessly in real time to our cloud based App. Measure
            and Transmit your 5 vitals signs:
            <br />
            - Body Temperature
            <br />
            - Blood Pressure
            <br />
            - Respiratory rate
            <br />
            - Pulse
            <br />
            - Pain Level
            <br />
            Doctor get more informed choices based on your health response
            transmmited.
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Pre-order
          </Button>
        </GridItem>
      </GridContainer>
    </Layout>
  )
}

export default SmartMOT
