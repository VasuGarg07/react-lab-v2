import Background from '../../assets/demo-bg.webp'
import Preview from "./Preview"
import Control from "./Control"
import { useState } from "react"
import { BgCenteredBox } from '../../components/BgCenteredBox'

const Glassmorphism = () => {

  const [alpha, setAlpha] = useState(40);
  const [blur, setBlur] = useState(40);

  return (
    <BgCenteredBox bg={Background}>
      <Preview alpha={alpha} blur={blur} />
      <Control alpha={alpha} blur={blur}
        setBlur={setBlur}
        setAlpha={setAlpha} />
    </BgCenteredBox>
  )
}

export default Glassmorphism