import React from "react"
import { useRouter } from "next/router"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"

const JoinList = () => {
  const router = useRouter()
  return (
   
      <GridContainer>

      <GridItem md={8}>
      <Typography variant="body2" component="p">
        Can you afford to foot your medical bill? if no, join the queue
      </Typography>
      </GridItem>
      <GridItem md={4}>

      <Button
        onClick={() => router.push("/app/join-queue")}
        variant="contained"
        color="primary"
        size="medium"
        >
        Join Now
      </Button>
      </GridItem>
        </GridContainer>
  )
}
export default JoinList
