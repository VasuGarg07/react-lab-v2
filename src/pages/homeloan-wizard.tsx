
import { useState } from "react";
import { Grid, Sheet, useColorScheme } from "@mui/joy";
import { DefaultValue, LoanData } from "@/components/HomeloanWizard/helpers";
import InputControls from "@/components/HomeloanWizard/InputControls";
import ResultChart from "@/components/HomeloanWizard/ResultChart";


const Homeloan = () => {
    const [data, setData] = useState<LoanData>(DefaultValue);
    const isDarkMode = useColorScheme().mode === 'dark';

    return (
        <Sheet
            sx={{
                width: 1,
                minHeight: 'calc(100vh - 53px)',
                p: { md: 3, xs: 2 },
                background: isDarkMode
                    ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
                    : 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 50%, #edf2f7 100%)',
            }}>
            <Grid container spacing={3} alignItems="center">
                <Grid xs={12} sm={6} md={8} sx={{ p: { md: 3, xs: 2 } }}>
                    <InputControls data={data} setData={setData} />
                </Grid>
                <Grid xs={12} sm={6} md={4} sx={{ p: { md: 3, xs: 2 } }}>
                    <ResultChart data={data} />
                </Grid>
            </Grid>
        </Sheet>
    )
}

export default Homeloan;