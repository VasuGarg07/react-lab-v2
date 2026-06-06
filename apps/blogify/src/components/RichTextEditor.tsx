import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold, Italic, Strikethrough, Code,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Undo, Redo,
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    disabled?: boolean;
}

const RichTextEditor = ({ value, onChange, disabled = false }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || '',
        editable: !disabled,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: { class: 'markdown min-h-[300px] focus:outline-none p-4' },
        },
    });

    if (!editor) return null;

    const ToolbarButton = ({
        onClick, active, disabled: btnDisabled, children, title,
    }: {
        onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={btnDisabled}
            title={title}
            className={`p-2 rounded-lg transition-colors ${active
                ? 'bg-navy text-white'
                : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-stone-300 rounded-lg overflow-hidden bg-white">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-stone-300 bg-stone-50">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code">
                    <Code className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-stone-300 mx-1" />

                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
                    <Heading3 className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-stone-300 mx-1" />

                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
                    <Quote className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-stone-300 mx-1" />

                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
                    <Redo className="w-4 h-4" />
                </ToolbarButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
