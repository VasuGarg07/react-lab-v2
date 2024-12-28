import { Box } from '@mui/joy';
import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Start writing...',
}) => {
    // Quill modules configuration
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false // Prevents unwanted HTML formatting from paste
        }
    }), []);

    // Quill formats configuration
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <Box
            sx={{
                '& .ql-container': {
                    borderBottomLeftRadius: 'md',
                    borderBottomRightRadius: 'md',
                    bgcolor: 'background.surface'
                },
                '& .ql-toolbar': {
                    borderTopLeftRadius: 'md',
                    borderTopRightRadius: 'md',
                    bgcolor: 'background.level1',
                    borderColor: 'divider'
                },
                '& .ql-editor': {
                    minHeight: '200px',
                    fontSize: 'md',
                    fontFamily: 'body',
                    color: 'text.primary',
                    bgcolor: 'background.surface',
                    '&.ql-blank::before': {
                        color: 'text.tertiary',
                        fontStyle: 'normal'
                    }
                },
                '& .ql-stroke': {
                    stroke: 'var(--joy-palette-text-primary)'
                },
                '& .ql-fill': {
                    fill: 'var(--joy-palette-text-primary)'
                },
                '& .ql-picker': {
                    color: 'text.primary'
                },
                '& .ql-picker-options': {
                    bgcolor: 'background.surface',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 'md',
                    boxShadow: 'md',
                    '& .ql-picker-item': {
                        color: 'text.primary'
                    }
                },
                // Active state styles
                '& .ql-toolbar button:hover, & .ql-toolbar button.ql-active': {
                    '.ql-stroke': {
                        stroke: 'var(--joy-palette-primary-500)'
                    },
                    '.ql-fill': {
                        fill: 'var(--joy-palette-primary-500)'
                    }
                },
                '& .ql-toolbar .ql-picker-label:hover, & .ql-toolbar .ql-picker-label.ql-active': {
                    color: 'primary.500'
                },
                // Link input styling
                '& .ql-toolbar .ql-tooltip': {
                    bgcolor: 'background.surface',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 'md',
                    boxShadow: 'md',
                    color: 'text.primary',
                    '& input': {
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 'sm',
                        color: 'text.primary',
                        p: '4px 8px'
                    }
                }
            }}
        >
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                theme="snow"
            />
        </Box>
    );
};

export default RichTextEditor;