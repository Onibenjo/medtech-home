const initializePeople = ({ lat, lng }) => {
  const randomInRange = (num) => (width = 0.01) =>
    Math.random() * width * 2 + num - width

  const randomLat = randomInRange(lat)
  const randomLng = randomInRange(lng)

  const people = [
    "Stephanie",
    "John",
    "Steve",
    "Anna",
    "Margaret",
    "Felix",
    "Chris",
    "Jamie",
    "Rose",
    "Bob",
    "Vanessa",
    "9lad",
    "Bridget",
    "Sebastian",
    "Richard",
  ]

  return people.map((name) => ({
    name,
    id: uuid(),
    position: { lat: randomLat(0.0075), lng: randomLng(0.02) },
    online: false,
  }))
}

const referencePosition = { lat: 8.486912, lng: 4.6661632 }

const people = initializePeople(referencePosition)
export default people
