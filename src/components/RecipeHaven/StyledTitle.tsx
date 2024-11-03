import { Typography } from '@mui/joy';
import Link from 'next/link';

interface StyledTitleProps {
    name: string;
}

const StyledTitle = ({ name }: StyledTitleProps) => {
    const words = name.split(' ');

    return (
        <Typography
            level='h2'
            fontFamily={'Kanit'}
            letterSpacing={1}
            textTransform="capitalize"
            textAlign={'center'}
            fontWeight={900}
        >
            {words.map((word, wordIndex) => {
                const firstChar = word.charAt(0);
                const restOfWord = word.slice(1);

                return (
                    <span key={wordIndex}>
                        <Link
                            href={`/recipe-haven/alphabet/${firstChar.toLowerCase()}`}
                            style={{
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Typography
                                component="span"
                                color="danger"
                                fontFamily={'Kanit'}
                                fontWeight={900}
                                textTransform="capitalize"
                            >
                                {firstChar}
                            </Typography>
                        </Link>
                        {restOfWord}
                        {wordIndex < words.length - 1 ? ' ' : ''}
                    </span>
                );
            })}
        </Typography>
    );
};

export default StyledTitle;