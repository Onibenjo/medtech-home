// import Recommendation from "components/Recommendation/Recommendation"
import Recommend from "components/Recommendation/Recommend"
import { getLayout as getSiteLayout } from "components/Dashboard/Patient"

const RecommendationPage = () => {
  return <Recommend />
}

RecommendationPage.getLayout = getSiteLayout
export default RecommendationPage
