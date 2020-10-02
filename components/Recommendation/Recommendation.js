import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FaNotesMedical } from "react-icons/fa"
import { GiMedicines } from "react-icons/gi"
import Typography from "@material-ui/core/Typography"
import { useCollection } from "hooks/useCollection"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import NavPills from "../NavPills/NavPills"
import TreatmentCard from "./TreatmentCard"
import SimpleTable from "./Table"
import { useAuth } from "../../utils/use-auth"

const useStyles = makeStyles(() => ({
  rotate: {
    animation: `$rotates 1s linear infinite`,
  },
  "@keyframes rotates": {
    "100%": {
      transform: " rotate(360deg)",
    },
  },
}))
const Recommendation = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const {
    data: recommendation,
    loading,
  } = useCollection(`patients/${user.uid}/recommendations`, { skip: false })

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <NavPills
            alignCenter
            color="primary"
            tabs={[
              // {
              //   tabButton: "Recommendation",
              //   tabIcon: FaNotesMedical,
              //   tabContent: (
              //     <Card>
              //       <CardContent>
              //         <GridContainer justify="center">
              //           <GridItem xs={12} sm={12} md={12}>
              //             think that’s a responsibility that I have, to push
              //             possibilities, to show people, this is the level that
              //             things could be at. So when you get something that has
              //             the name Kanye West on it, it’s supposed to be pushing
              //             the furthest possibilities. I will be the leader of a
              //             company that ends up being worth billions of dollars,
              //             because I got the answers. I understand culture. I am
              //             the nucleus.
              //           </GridItem>
              //         </GridContainer>
              //       </CardContent>
              //     </Card>
              //   ),
              // },

              {
                tabButton: "Recommendation",
                tabIcon: FaNotesMedical,
                tabContent: (
                  <GridContainer justify="center">
                    {loading ? (
                      <AiOutlineLoading3Quarters className={classes.rotate} />
                    ) : recommendation.length === 0 ? (
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        No recommendation yet
                      </Typography>
                    ) : (
                      recommendation.map((item, i) => (
                        <TreatmentCard
                          key={i}
                          doctorname={`Dr. ${item.doctorName}`}
                          treatment={item.recommendation}
                        />
                      ))
                    )}
                  </GridContainer>
                ),
              },
              {
                tabButton: "Prescription",
                tabIcon: GiMedicines,
                tabContent: (
                  <GridContainer justify="center">
                    <GridItem xs={12}>
                      <SimpleTable />
                    </GridItem>
                  </GridContainer>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default Recommendation