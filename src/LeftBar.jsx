import React, { useState, useEffect } from "react"
import Flag from "react-world-flags"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Grid from '@mui/material/Grid';

import "../src/css/left-bar.css"

const LeftBar = () => {
  // const [AqiValue, setAqiValue] = useState()
  const [stationData, setStationData] = useState(null)
  const [aqiBackgroundColor, setaqiBackgroundColor] = useState(null)

  useEffect(() => {
    fetch("https://api.waqi.info/feed/A254506/?token=a3bf1197881754e07fb1a334116289ffb6104296")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then(data => {
        setStationData(data.data)
        console.log("Data Received:", data.data.aqi)
      })
      .catch(error => console.error("Error Fetching Data:", error))
  }, [])



  return (
    <div className="heading-container">
      <IconButton>
        <Flag code="NP" height="32" fallback={<span>Nepal</span>} />
      </IconButton>
      <Typography fontWeight={"light"} sx={{ marginBottom: 2 }}>
        Check Air Pollution level around your city.
      </Typography>
      <Typography variant="h3">Choose Your City</Typography>
      <Box sx={{ minWidth: 120, marginTop: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="select-city">City</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="City">
            <MenuItem>Ten</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <AqiValue stationData={stationData} />
    </div>
  )
}

const AqiValue = ({ stationData }) => {

  const getAqiColorAndIndex = () => {
    const aqiValue = stationData?.aqi || 0; // Default to 0 if stationData is null
    let color, aqiIndex;
    
    if (aqiValue >= 0 && aqiValue <= 50) {
      color = "#267300"; // Good
      aqiIndex = "Good";
    } else if (aqiValue <= 100) {
      color = "#FFFFB5"; // Moderate
      aqiIndex = "Moderate";
    } else if (aqiValue <= 150) {
      color = "#f99049"; // Unhealthy for Sensitive Groups
      aqiIndex = "Unhealthy for Sensitive Groups";
    } else if (aqiValue <= 200) {
      color = "#f65e5f"; // Unhealthy
      aqiIndex = "Unhealthy";
    } else if (aqiValue <= 300) {
      color = "#a070b6"; // Very Unhealthy
      aqiIndex = "Very Unhealthy";
    } else {
      color = "#a06a7b"; // Hazardous
      aqiIndex = "Hazardous";
    }
  
    return { color, aqiIndex };
  };

  const { color, aqiIndex } = getAqiColorAndIndex();



  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: color, marginTop:4, padding:4 }}>
        {stationData && (
          <>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Typography>Location: {stationData.city.location}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{marginTop:4}}>
                <Typography variant="h3">{stationData.aqi}</Typography>
                <Typography>AQI Value</Typography>
                </Box>
              </Grid>
              <Grid>{aqiIndex}</Grid>
            </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default LeftBar