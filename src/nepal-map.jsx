import React, { useEffect } from "react"
import mapboxgl from "mapbox-gl"
import LeftBar from "./LeftBar"
import "../src/css/nepal-map.css"

const NepalMap = () => {
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA"
    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/kprijun/cluac896500nw01p6699y7wt7",
      center: [85.34875986234948, 27.7177414212418], // Kathmandu City
      zoom: 12
    })

    return () => {
      mapInstance.remove()
    }
  }, [])

  return (
    <div id="nepal-map-container">
      <div className="left-bar-container">
        <LeftBar />
      </div>
      <div id="map-container" />
    </div>
  )
}

export default NepalMap
