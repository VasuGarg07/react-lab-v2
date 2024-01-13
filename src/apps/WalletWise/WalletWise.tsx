import { Box, Grid } from "@mui/joy"
import WalletProvider from "./Context"
import Transactions from "./Transactions"
import Form from "./Form"
import Total from "./Total"

const WalletWise = () => {
  return (
    <Box sx={{ p: 2 }}>
      <WalletProvider>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            <Total />
          </Grid>
          <Grid xs={12} sm={6} md={8}>
            <Transactions />
          </Grid>
        </Grid>
        <Form />
      </WalletProvider>
    </Box>
  )
}

export default WalletWise