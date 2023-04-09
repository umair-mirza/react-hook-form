import { useState } from "react"
import Form from "./components/form/form"
import { Box } from "@mui/material"

function App() {
  return (
    <Box
      height="100vh"
      width="100%"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Form />
    </Box>
  )
}

export default App
