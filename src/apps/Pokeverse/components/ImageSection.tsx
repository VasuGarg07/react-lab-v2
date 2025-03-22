import React from 'react';

interface ImageSectionProps {
    backgroundImage: string;
    onButtonClick: () => void;
    buttonText: string;
    gradientColors?: {
        from: string;
        to: string;
    };
}

const ImageSection: React.FC<ImageSectionProps> = ({
    backgroundImage,
    onButtonClick,
    buttonText,
    gradientColors = { from: '#1976d2', to: '#1565c0' }
}) => {
    // Create CSS variables for the gradient colors to use in inline styles
    const buttonStyle = {
        '--gradient-from': gradientColors.from,
        '--gradient-to': gradientColors.to,
        '--shadow-color': `${gradientColors.from}66`,
        background: `linear-gradient(to left, var(--gradient-from), var(--gradient-to))`,
        boxShadow: '0 10px 20px var(--shadow-color)',
    } as React.CSSProperties;

    return (
        <div className="relative h-full w-full overflow-hidden group">
            {/* Background Image with grayscale effect that reverts on hover */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Soft overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50"></div>
            </div>

            {/* Button Container */}
            <div className="absolute inset-0 flex items-center justify-center">
                <button
                    onClick={onButtonClick}
                    className="
            relative 
            px-4 py-2 
            text-sm font-medium tracking-wide text-white uppercase
            rounded-md
            transition-all duration-300 ease-in-out
            group-hover:scale-110
            group-hover:px-6
            overflow-hidden
            hover:shadow-lg
          "
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        // Change gradient direction on hover
                        const target = e.currentTarget;
                        target.style.background = `linear-gradient(to right, var(--gradient-from), var(--gradient-to))`;
                        target.style.boxShadow = '0 15px 30px var(--shadow-color)';

                        // Trigger shine animation with JavaScript
                        const shine = target.querySelector('.shine-effect') as HTMLElement;
                        if (shine) {
                            shine.style.animation = 'shine 1.5s infinite';
                        }
                    }}
                    onMouseLeave={(e) => {
                        // Revert styles on mouse leave
                        const target = e.currentTarget;
                        target.style.background = `linear-gradient(to left, var(--gradient-from), var(--gradient-to))`;
                        target.style.boxShadow = '0 10px 20px var(--shadow-color)';

                        // Remove animation
                        const shine = target.querySelector('.shine-effect') as HTMLElement;
                        if (shine) {
                            shine.style.animation = 'none';
                        }
                    }}
                >
                    {/* Text wrapper for z-index positioning */}
                    <span className="relative z-10">{buttonText}</span>

                    {/* Top shine effect */}
                    <span
                        className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/20 to-transparent z-0"
                        aria-hidden="true"
                    />

                    {/* Diagonal shine effect */}
                    <span
                        className="shine-effect absolute top-0 -left-1/2 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] z-0"
                        aria-hidden="true"
                    />
                </button>
            </div>

            {/* Global styles for animations */}
            <style>
                {`
          @keyframes shine {
            0% { left: -50%; }
            100% { left: 150%; }
          }
        `}
            </style>
        </div>
    );
};

export default ImageSection;