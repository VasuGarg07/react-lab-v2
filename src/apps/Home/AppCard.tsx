import React from 'react';
import { Card, CardContent, CardOverflow, AspectRatio, Typography, Chip, Box, IconButton, useTheme } from '@mui/joy';
import { useNavigate } from 'react-router';
import { AppInfo } from '../../shared/apps';
import { ArrowRight, Info } from 'lucide-react';

export const AppCard: React.FC<AppInfo> = ({ name, tag, path, image, description, techStack }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isLightTheme = theme.palette.mode === 'light';

  return (
    <Card
      variant="outlined"
      onClick={() => navigate(path)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: 'md',
          transform: 'translateY(-4px)',
          '& .hover-overlay': {
            opacity: 1,
          },
        },
        '&:active': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="5/3">
          <img src={image} alt={name} style={{ objectFit: 'cover' }} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography level="title-lg" sx={{
            fontSize: "md",
            fontWeight: "bold",
            fontFamily: 'Overlock',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {name}
          </Typography>
          <IconButton
            variant="solid"
            color="primary"
            size="sm"
          >
            <ArrowRight size={18} />
          </IconButton>
        </Box>
        <Chip size="sm" variant="soft" color="success">
          {tag}
        </Chip>
      </CardContent>

      {/* Hover Overlay */}
      <Box
        className="hover-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          backdropFilter: 'blur(2px)'
        }}
      >
        <Info size={24} style={{ marginBottom: '8px' }} />
        <Typography level="body-sm" mb={1} textAlign="center">
          {description}
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
          {techStack.map((tech, index) => (
            <Chip
              key={index}
              size="sm"
              variant="soft"
              color={isLightTheme ? "danger" : "warning"}
            >
              {tech}
            </Chip>
          ))}
        </Box>
      </Box>
    </Card>
  );
};