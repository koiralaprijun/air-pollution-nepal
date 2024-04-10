import React, { useEffect } from "react"
import Flag from "react-world-flags"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import "../src/css/left-bar.css"

const LeftBar = () => {
  useEffect(() => {
    fetch("https://api.waqi.info/feed/A254506/?token=a3bf1197881754e07fb1a334116289ffb6104296")
      .then(response => response.json())
      .then(data => console.log("Data Received:", data))
      .catch(error => console.error("Error Fetching Data:", error))
  })

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
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default LeftBar
