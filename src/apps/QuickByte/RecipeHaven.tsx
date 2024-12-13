import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Input, Stack, Typography } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import { Book, Search, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card
    variant="outlined"
    sx={{
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      },
    }}
  >
    <CardContent>
      <Stack direction="column" spacing={1} alignItems="center" textAlign="center">
        {icon}
        <Typography level="h3" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.875rem' }}>{description}</Typography>
      </Stack>
    </CardContent>
  </Card>
);

const RecipeHaven: React.FC = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';

  const handleSearch = () => {
    if (term) {
      navigate(`/recipe-haven/search/${term}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 52px)',
        background: isDarkMode
          ? 'linear-gradient(to top, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
          : 'linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)',
        backgroundBlendMode: 'normal, color-burn',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(135deg, ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 25%, 
            transparent 25%,
            transparent 50%, 
            ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 50%,
            ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 75%,
            transparent 75%,
            transparent)
          `,
          backgroundSize: '60px 60px',
          opacity: isDarkMode ? 0.4 : 0.2,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        sx={{
          width: '100%',
          maxWidth: 1200,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          level="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 800,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Recipe Haven
        </Typography>

        <Typography
          level="title-lg"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Easy Eats, Big Treats!
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.body',
            borderRadius: 'lg',
            p: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Input
            size="md"
            placeholder="Search recipes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton variant='outlined' size="md" onClick={handleSearch}>
            <Search />
          </IconButton>
        </Stack>

        <DrawerMenu />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          sx={{ width: '100%' }}
          justifyContent={'center'}
        >
          <FeatureCard
            icon={<Utensils size={32} color={theme.palette.danger[500]} />}
            title="Easy Recipes"
            description="Find simple, delicious recipes for every skill level"
          />
          <FeatureCard
            icon={<Book size={32} color={theme.palette.danger[500]} />}
            title="Diverse Cuisine"
            description="Explore dishes from around the world"
          />
        </Stack>

      </Stack>
    </Box>
  );
};

export default RecipeHaven;