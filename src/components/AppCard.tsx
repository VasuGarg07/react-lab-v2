import { AspectRatio, Card, Chip, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { AppInfo } from "../shared/apps";

export const AppCard = ({ name, tag, path, image }: AppInfo) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        p: 2,
        alignItems: 'center',
        '&:hover': {
          boxShadow: 'lg',
          cursor: 'pointer',
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s linear'
        }
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