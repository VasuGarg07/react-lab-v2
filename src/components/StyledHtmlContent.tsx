import React from 'react';
import { Box } from '@mui/joy';

interface StyledBlogContentProps {
    htmlContent: string;
}

const StyledHtmlContent: React.FC<StyledBlogContentProps> = ({ htmlContent }) => {
    return (
        <Box
            sx={{
                '& h1': {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '1rem 0',
                },
                '& h2': {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '1rem 0',

                },
                '& h3': {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: '0.75rem 0',

                },
                '& p': {
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: '0',
                },
                '& ul': {
                    listStyle: 'disc',
                    paddingLeft: '1.5rem',
                    margin: '0.75rem 0',
                },
                '& ul li': {
                    marginBottom: '0.5rem',
                },
                '& ol': {
                    listStyle: 'decimal',
                    paddingLeft: '1.5rem',
                    margin: '0.75rem 0',
                },
                '& ol li': {
                    marginBottom: '0.5rem',
                },
                '& strong': {
                    fontWeight: 'bold',
                },
                '& em': {
                    fontStyle: 'italic',
                },
                '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '1rem 0',
                },
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default StyledHtmlContent;
