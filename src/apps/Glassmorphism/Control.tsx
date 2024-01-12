import { Card, FormLabel, Grid, Sheet, Slider, Typography } from "@mui/joy";

interface Props {
  blur: number,
  alpha: number,
  setBlur: React.Dispatch<React.SetStateAction<number>>,
  setAlpha: React.Dispatch<React.SetStateAction<number>>,
}

const Control = (props: Props) => {

  const handleBlur = (_: Event, val: number | number[]) => {
    if (typeof val === 'number') {
      props.setBlur(val);
    }
  }

  const handleAlpha = (_: Event, val: number | number[]) => {
    if (typeof val === 'number') {
      props.setAlpha(val);
    }
  }

  return (
    <Card
      sx={{
        p: { md: 4, xs: 2 },
        mt: 2,
        flexDirection: 'row',
        width: 1,
        maxWidth: 640
      }}>

      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Controls */}
        <Grid xs={12} sm={6}>
          <Typography level="h4" gutterBottom>Settings</Typography>

          <FormLabel>Transparency</FormLabel>
          <Slider sx={{ mx: 1 }} size="sm"
            value={props.alpha} step={1} min={0} max={100}
            onChange={handleAlpha} />

          <FormLabel>Blur Value</FormLabel>
          <Slider sx={{ mx: 1 }} size="sm"
            value={props.blur} step={1} min={0} max={100}
            onChange={handleBlur} />

        </Grid>

        {/* Output */}
        <Grid xs={12} sm={6}>
          <Typography level="h4">Code</Typography>
          <Sheet variant="soft" color="neutral"
            sx={{
              p: 1,
              borderRadius: 'sm',
              fontFamily: 'monospace',
              fontSize: 12,
              mt: 1
            }}>
            boxShadow: 4px 8px 16px #00000045;
            <br />background: rgba(255, 255, 255, {props.alpha / 100});
            <br />backdrop-filter: blur({props.blur / 10}px);
            <br />padding: 24px;
            <br />border-radius: 16px;
          </Sheet>
        </Grid>
      </Grid>

    </Card>
  )
}

export default Control