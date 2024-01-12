import { Sheet, Typography } from "@mui/joy";

interface Props {
  blur: number,
  alpha: number,
}

const Preview = (props: Props) => {
  return (
    <Sheet
      className="flex-centered-column text-center"
      sx={{
        width: 1,
        maxWidth: 360,
        borderRadius: 'md',
        p: { md: 3, xs: 2 },
        backgroundColor: `rgba( 255, 255, 255, ${props.alpha / 100} )`,
        backdropFilter: `blur(${props.blur / 10}px)`,
        boxShadow: '4px 8px 16px #00000045'
      }}>
      <img src="/logo.png" alt="" style={{ width: '40px', objectFit: 'contain' }} />
      <Typography level="h4" sx={{ color: '#222' }}>Glassmorphism</Typography>
      <Typography sx={{ color: '#222' }} level="body-sm">
        Glassmorphism is a UI design trend featuring frosted glass-like elements with blurred transparency, soft lighting, and subtle gradients.
      </Typography>
    </Sheet>
  )
}

export default Preview