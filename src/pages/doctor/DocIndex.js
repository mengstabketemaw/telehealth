import { useState } from "react"
import Location from "../../components/maps/MapUtils"
import NearByDoctors from "../../components/maps/NearByDoctors"
import SearchWrapper from "../../components/maps/SearchWrapper"
import WhereIsThisPatient from "../../components/maps/WhereIsThisPatient"

const users = [
  { name: "mamush", position: [9, 38] },
  { name: "mereed", position: [9.12, 38.44] },
  { name: "mamaru", position: [9.4, 38.2] },
  { name: "matiwos", position: [9.32, 38.9] },
]

const DocIndex = () => {
  const [position, setPosition] = useState()
  const setLocation = (lat, lng) => {
    setPosition({ lat, lng })
  }
  return (
    <>
      <p>
        Hello Doctor how r u{position?.lat}-{position?.lng}
      </p>
      {/* <Location setLocation={setLocation} /> */}
      {/* <SearchWrapper>
      <NearByDoctors />
    </SearchWrapper> */}
      <WhereIsThisPatient
        userInfo={{
          username: "matiwos@gmail.com",
          lat: 8.888,
          lng: 38.888,
          name: "Matiwos Shimels",
        }}
      />
    </>
  )
}
export default DocIndex
