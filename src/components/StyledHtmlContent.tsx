import React from 'react';

interface StyledBlogContentProps {
    htmlContent: string;
}

const StyledHtmlContent: React.FC<StyledBlogContentProps> = ({ htmlContent }) => {
    return (
        <div
            className="styled-content prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default StyledHtmlContent;