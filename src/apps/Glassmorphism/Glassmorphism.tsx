import { Box } from "@mui/joy"
import Background from '../../assets/demo-bg.webp'
import Preview from "./Preview"
import Control from "./Control"
import { useState } from "react"

const Glassmorphism = () => {

  const [alpha, setAlpha] = useState(40);
  const [blur, setBlur] = useState(40);

  return (
    <Box
      className="flex-centered-column"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: { md: 4, xs: 2 },
        minHeight: 'calc(100vh - 53px)'
      }}>

      <Preview alpha={alpha} blur={blur} />
      <Control alpha={alpha} blur={blur}
        setBlur={setBlur}
        setAlpha={setAlpha} />
    </Box>
  )
}

export default Glassmorphism