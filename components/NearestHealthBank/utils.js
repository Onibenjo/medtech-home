export function calcDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  }
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  return Math.round(dist * 100) / 100
}
// directionService.route(directionRequest, (result, status) => {
//           if (status !== "OK") {
//             return;
//           }
//           const travellingRoute = result.routes[0].legs[0]; // { duration: { text: 1mins, value: 600 } }
//           const travellingTimeInMinutes = travellingRoute.duration.value / 60;
//           if (travellingTimeInMinutes < timeLimit) {
//             const distanceText = travellingRoute.distance.text; // 6.4km
//             const timeText = travellingRoute.duration.text; // 11 mins
//             filteredResults.push({
//               name,
//               rating,
//               address,
//               openNow,
//               photoUrl,
//               distanceText,
//               timeText,
//             });
//           }
//           // Finally, Add results to state
// setState({ ...state, searchResults: filteredResults });
