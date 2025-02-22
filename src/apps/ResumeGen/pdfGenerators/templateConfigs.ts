// templateConfigs.ts

import { PDFGeneratorConfig, TemplateName } from '@/apps/ResumeGen/pdfGenerators/types';

export const templateConfigs: Record<TemplateName, PDFGeneratorConfig> = {
    purpleaccent: {
        colors: {
            primary: '#8E44AD',
            secondary: '#333333',
            text: '#333333',
            accent: '#8E44AD',
            background: '#FFFFFF',
            muted: '#666666'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 32,
                title: 18,
                sectionTitle: 16,
                normal: 11,
                small: 10
            }
        },
        spacing: {
            margin: 40,
            padding: 25,
            sectionGap: 20,
            lineHeight: 1.4,
            itemGap: 8
        },
        layout: {
            columns: 1,
            sectionStyle: 'icon',
            header: 'stacked',
            contactIcons: true
        }
    },

    sleek: {
        colors: {
            primary: '#000000',
            secondary: '#666666',
            text: '#333333',
            accent: '#000000',
            background: '#FFFFFF',
            divider: '#CCCCCC'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 28,
                title: 14,
                sectionTitle: 14,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 20,
            lineHeight: 1.5
        },
        layout: {
            columns: 2,
            columnRatio: [0.7, 0.3],
            sectionStyle: 'simple',
            header: 'centered',
            dividers: true
        }
    },

    twocolumn: {
        colors: {
            primary: '#333333',
            secondary: '#666666',
            text: '#333333',
            accent: '#333333',
            background: '#FFFFFF',
            divider: '#E5E5E5'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 24,
                title: 12,
                sectionTitle: 14,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 20,
            padding: 20,
            sectionGap: 15,
            lineHeight: 1.4
        },
        layout: {
            columns: 2,
            columnRatio: [0.3, 0.7],
            sectionStyle: 'underline',
            header: 'compact'
        }
    },

    blueprint: {
        colors: {
            primary: '#30566B',
            secondary: '#C5D1D9',
            text: '#333333',
            accent: '#30566B',
            background: '#FFFFFF',
            sectionBg: '#F1F5F9'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 24,
                title: 16,
                sectionTitle: 14,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 20,
            lineHeight: 1.6
        },
        layout: {
            columns: 2,
            columnRatio: [0.7, 0.3],
            sectionStyle: 'background',
            header: 'centered',
            contactIcons: true
        }
    },

    minimalist: {
        colors: {
            primary: '#333333',
            secondary: '#666666',
            text: '#333333',
            accent: '#333333',
            background: '#FFFFFF',
            divider: '#E5E5E5'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 28,
                title: 14,
                sectionTitle: 14,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 20,
            lineHeight: 1.5,
            itemGap: 8
        },
        layout: {
            columns: 1,
            sectionStyle: 'underline',
            header: 'compact',
            contactIcons: true,
            dividers: true
        }
    },

    professional: {
        colors: {
            primary: '#2F3E46',
            secondary: '#4682B4',
            text: '#333333',
            accent: '#4682B4',
            background: '#FFFFFF'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 24,
                title: 12,
                sectionTitle: 14,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 15,
            lineHeight: 1.4
        },
        layout: {
            columns: 1,
            sectionStyle: 'simple',
            header: 'centered',
            contactIcons: false
        }
    },

    modern: {
        colors: {
            primary: '#2c78d4',
            secondary: '#666666',
            text: '#333333',
            accent: '#2c78d4',
            background: '#FFFFFF',
            sidebar: '#f0f0f0'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 24,
                title: 14,
                sectionTitle: 16,
                normal: 10,
                small: 9
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 20,
            lineHeight: 1.5
        },
        layout: {
            columns: 2,
            columnRatio: [0.3, 0.7],
            sectionStyle: 'simple',
            header: 'compact',
            contactIcons: true,
            sidebarPosition: 'left'
        }
    },

    classic: {
        colors: {
            primary: '#1976d2',
            secondary: '#27272A',
            text: '#333333',
            accent: '#1976d2',
            background: '#FFFFFF'
        },
        fonts: {
            primary: 'helvetica',
            sizes: {
                name: 24,
                title: 14,
                sectionTitle: 14,
                normal: 11,
                small: 10
            }
        },
        spacing: {
            margin: 40,
            padding: 20,
            sectionGap: 15,
            lineHeight: 1.5
        },
        layout: {
            columns: 1,
            sectionStyle: 'underline',
            header: 'centered',
            contactIcons: true
        }
    }
};