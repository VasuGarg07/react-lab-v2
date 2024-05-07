import { useState } from "react";
import { DefaultValue, LoanData } from "./helpers";
import { Grid, Sheet } from "@mui/joy";
import SliderSelect from "./SliderSelect";
import Result from "./Result";


const Homeloan = () => {
  const [data, setData] = useState<LoanData>(DefaultValue);

  return (
    <Sheet
      sx={{
        width: 1,
        minHeight: 'calc(100vh - 53px)',
        p: { md: 3, xs: 2 },
        backgroundColor: 'transparent'
      }}>
      <Grid container spacing={3} alignItems="center">
        <Grid xs={12} sm={6} md={8} sx={{ p: { md: 3, xs: 2 } }}>
          <SliderSelect data={data} setData={setData} />
        </Grid>
        <Grid xs={12} sm={6} md={4} sx={{ p: { md: 3, xs: 2 } }}>
          <Result data={data} />
        </Grid>
      </Grid>
    </Sheet>
  )
}

export default Homeloan