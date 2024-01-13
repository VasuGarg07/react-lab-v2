import { AspectRatio, Card, Chip, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { AppInfo } from "../shared/apps";

export const AppCard = ({ name, tag, path, image }: AppInfo) => {
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
      <AspectRatio ratio={5 / 3} sx={{ width: 1 }}>
        <img
          src={image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>

      <Typography level="title-lg" noWrap>
        {name}
      </Typography>

      <Chip
        color="success"
        size="sm"
        sx={{ pointerEvents: 'none' }}
        children={tag}
      />
    </Card>
  )
}