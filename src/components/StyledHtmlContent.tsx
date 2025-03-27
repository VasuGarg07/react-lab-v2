import React from 'react';

interface StyledBlogContentProps {
    htmlContent: string;
}

const StyledHtmlContent: React.FC<StyledBlogContentProps> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default StyledHtmlContent;