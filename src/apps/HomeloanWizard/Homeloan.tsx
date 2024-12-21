import { useState } from "react";
import { DefaultValue, LoanData } from "./helpers";
import { Grid, Sheet, useColorScheme } from "@mui/joy";
import SliderSelect from "./SliderSelect";
import Result from "./Result";


const Homeloan = () => {
  const { mode } = useColorScheme();
  const [data, setData] = useState<LoanData>(DefaultValue);

  return (
    <Sheet
      sx={{
        width: 1,
        minHeight: 'calc(100vh - 53px)',
        p: { md: 3, xs: 2 },
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
          : 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
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