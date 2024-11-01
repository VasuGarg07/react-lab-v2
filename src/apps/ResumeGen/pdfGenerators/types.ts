export type TemplateName =
    | 'classic'
    | 'modern'
    | 'minimalist'
    | 'professional'
    | 'blueprint'
    | 'purpleaccent'
    | 'sleek'
    | 'twocolumn';

export type HeaderStyle =
    | 'centered'      // All content centered
    | 'split'         // Name on left, contact on right
    | 'compact'       // Horizontal layout with icons
    | 'stacked'       // Name stacked on top
    | 'minimal';      // Simple text based

export type SectionStyle =
    | 'underline'     // Underlined headers
    | 'background'    // Colored background
    | 'circle'        // Circle bullets
    | 'simple'        // No special decoration
    | 'leftBorder'    // Vertical border on left
    | 'icon';         // With section icons

export type TextAlignment = 'left' | 'right' | 'center' | 'justify';

export interface ColorScheme {
    primary: string;      // Main brand color
    secondary: string;    // Secondary/accent color
    text: string;        // Regular text
    accent: string;      // Highlights/links
    background: string;  // Page background
    divider?: string;    // Lines/borders
    sidebar?: string;    // Sidebar background
    sectionBg?: string;  // Section backgrounds
    muted?: string;      // Subdued text
}

export interface FontConfig {
    primary: string;
    sizes: {
        name: number;           // Main name size
        title: number;          // Job title size
        sectionTitle: number;   // Section headers
        normal: number;         // Body text
        small: number;          // Secondary text
        subsection?: number;    // Subsection headers
    };
    weights?: {
        normal?: number;
        bold?: number;
        light?: number;
    };
}

export interface SpacingConfig {
    margin: number;           // Page margins
    padding: number;          // Section padding
    sectionGap: number;       // Space between sections
    lineHeight: number;       // Text line height
    itemGap?: number;         // Space between list items
    paragraphGap?: number;    // Space between paragraphs
    indent?: number;          // List item indentation
}

export interface LayoutConfig {
    columns: 1 | 2;                      // Single or double column
    columnRatio?: [number, number];      // Width ratio for columns
    sectionStyle: SectionStyle;          // How sections are styled
    header: HeaderStyle;                 // Header layout style
    contactIcons?: boolean;              // Show icons in contact info
    dividers?: boolean;                  // Show section dividers
    sidebarPosition?: 'left' | 'right';  // For two-column layouts
    sectionOrder?: string[];            // Custom section ordering
    contentWidth?: string;              // Max width constraint
}

export interface SectionConfig {
    style?: SectionStyle;
    icon?: string;
    background?: string;
    padding?: number;
    spacing?: number;
    textAlign?: TextAlignment;
    showTitle?: boolean;
}

export interface PDFGeneratorConfig {
    colors: ColorScheme;
    fonts: FontConfig;
    spacing: SpacingConfig;
    layout: LayoutConfig;
    sections?: {
        [key: string]: SectionConfig;
    };
    customStyles?: {
        [key: string]: any;
    };
}
