import { Sheet, Slider, Stack, Typography } from "@mui/joy";

interface Props {
  max: number,
  min: number,
  unit: string,
  label: string,
  amount: string | number,
  value: number,
  steps: number,
  onChange: (value: number) => void
}


const SliderComponent = ({ min, max, label, unit, onChange, amount, value, steps }: Props) => {

  const handleChange = (_: Event, value: number | number[]) => {
    if (typeof value == 'number') {
      onChange(value)
    }
  }

  const labelValue = (unit: string, num: number | string) => {
    return unit == 'Rs.'
      ? `${unit} ${num} M`
      : `${num} ${unit}`
  }

  return (
    <Sheet variant="plain"
      sx={{ my: 3, backgroundColor: 'transparent' }}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography level="body-lg">{label}</Typography>
        <Typography level="h4">{labelValue(unit, amount)}</Typography>
      </Stack>
      <Slider
        size="sm"
        onChange={handleChange}
        value={value} step={steps}
        min={min} max={max}
        sx={{ p: 1 }}
        color="warning"
      />
      <Stack direction='row' justifyContent='space-between'>
        <Typography level="body-sm"> {labelValue(unit, min)} </Typography>
        <Typography level="body-sm"> {labelValue(unit, max)}</Typography>
      </Stack>
    </Sheet>
  );
};

export default SliderComponent;