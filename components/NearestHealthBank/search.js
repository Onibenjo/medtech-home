import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import { calcDistance } from "./utils"
import MapContainer from "./MapCon"
import PlaceCard from "./PlaceCard"

const Search = () => {
  const [state, setState] = useState({
    loadingData: false,
    errorMessage: "",
    coords: "",
    points: [],
    zoom: 14,
    activeItem: "",
    refreshMarker: false,
  })

  useEffect(() => {
    async function fetchData() {
      setState({ ...state, loadingData: true })
      const q = {
        query: "hospital",
        key: process.env.GOOGLE_MAP_API_KEY,
        location: "10.463172, 7.415974",
        radius: "3000",
        // type: ["pharmacy", "hospital"], // List of types: https://developers.google.com/places/supported_types,
        // rankBy: mapsApi.places.RankBy.DISTANCE,
      }

      const url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
      const fUrl = `https://cors-anywhere.herokuapp.com/${url}?query=${q.query}&key=${q.key}&location=${q.location}&radius=${q.radius}`
      // const res = await axios.get(fUrl, { crossdomain: true });
      const res = await fetch(fUrl).then((response) => response.json())
      console.log(res)

      const points = []
      res.results.map((point) => {
        const distance = calcDistance(
          10.463172,
          7.415974,
          point.geometry.location.lat,
          point.geometry.location.lng
        )
        const photoUrl = ""
        let openNow = false
        if (point.opening_hours) {
          openNow = point.opening_hours.open_now // e.g true/false
        }
        if (point.photos && point.photos.length > 0) {
          // photoUrl = point.photos[0].getUrl();
        }
        points.push({
          name: point.name,
          location: point.geometry.location,
          distance,
          rating: point.rating,
          address: point.formatted_address,
          openNow,
          photoUrl,
        })
      })

      setState((s) => ({ ...s, points, loadingData: false }))
    }
    fetchData()
  }, [])

  const handleItemClick = (e, { name }) =>
    setState({ ...state, activeItem: name })
  const renderMenu = (scroll) => {
    console.log(state)
    const items = state.points.map((point, id) => {
      return (
        <li key={id} name={point.name} onClick={handleItemClick}>
          <b>{point.name}</b>
          <br />
          <p>
            ({point.distance}
            miles away )
          </p>
        </li>
      )
    })

    return <ul className={scroll}>{items}</ul>
  }
  const refreshMarker = () =>
    setState({ ...state, refreshMarker: !state.refreshMarker })

  return (
    <div>
      <MapContainer
        activeItem={state.activeItem}
        refresh={refreshMarker}
        lat={10.463172}
        lng={7.415974}
        points={state.points}
      />
      {renderMenu("verticalScrollTable")}
      <Grid container spacing={4}>
        {state.points.map((result, key) => (
          <PlaceCard info={result} key={key} />
        ))}
      </Grid>
    </div>
  )
}

export default Search
