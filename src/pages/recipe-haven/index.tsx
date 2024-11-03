import DrawerMenu from '@/components/RecipeHaven/DrawerMenu';
import FeatureCard from '@/components/RecipeHaven/FeatureCard';
import Wrapper from '@/components/RecipeHaven/Wrapper';
import { IconButton, Input, Stack, Typography } from '@mui/joy';
import { useTheme } from '@mui/joy/styles';
import { Book, Search, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RecipeHaven: React.FC = () => {
    const [term, setTerm] = useState('');
    const router = useRouter();
    const theme = useTheme();

    const handleSearch = () => {
        if (term) {
            router.push(`/recipe-haven/search/${term}`);
        }
    };

    return (
        <Wrapper>
            <Stack
                spacing={4}
                alignItems="center"
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    position: 'relative',
                    zIndex: 1,
                    padding: { xs: 2, sm: 4, md: 6 },
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
        </Wrapper>
    );
};

export default RecipeHaven;