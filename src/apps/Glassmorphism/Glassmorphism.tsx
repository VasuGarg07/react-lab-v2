import Background from '/demo-bg.webp';
import Preview from "@/apps/Glassmorphism/Preview"
import Control from "@/apps/Glassmorphism/Control"
import { useState } from "react"
import { BgCenteredBox } from '@/components/BgCenteredBox'

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