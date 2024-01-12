import { AspectRatio, Card, CardContent, Chip, Typography } from "@mui/joy"
import { AppInfo } from "../shared/apps"
import { useNavigate } from "react-router-dom"

export const AppCard = ({ name, tag, path }: AppInfo) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        p: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        alignItems: 'center'
      }}
      onClick={() => navigate(path)}
    >
      <AspectRatio ratio={1} sx={{ width: 32 }}>
        <img
          src="/logo.png"
          loading="lazy"
          alt=""
        />
      </AspectRatio>

      <Typography level="title-lg" noWrap>
        {name}
      </Typography>

      <Chip
        // variant="outlined"
        color="success"
        size="sm"
        sx={{ pointerEvents: 'none' }}
        children={tag}
      />
    </Card>
  )
}