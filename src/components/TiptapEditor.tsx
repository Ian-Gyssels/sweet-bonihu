import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TurndownService from 'turndown';
import {useCallback, useEffect, useRef, useState} from 'react';
import {mockUploadImage} from '@/lib/mockImageUpload';
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    ImagePlus,
    Link as LinkIcon,
    Loader2,
} from 'lucide-react';
import {ImageResize} from "tiptap-extension-resize-image";

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
    height?: number;
}

// Simple markdown-to-HTML converter for initial content loading
const markdownToHtml = (md: string): string => {
    if (!md) return '';
    let html = md
        // Headings
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Images (before links)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // Bold & italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Blockquote
        .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>');

    // Process unordered lists
    html = html.replace(/(?:^- .+$\n?)+/gm, (match) => {
        const items = match
            .split('\n')
            .filter(Boolean)
            .map(l => `<li>${l.replace(/^- /, '')}</li>`)
            .join('');
        return `<ul>${items}</ul>`;
    });

    // Process ordered lists
    html = html.replace(/(?:^\d+\. .+$\n?)+/gm, (match) => {
        const items = match
            .split('\n')
            .filter(Boolean)
            .map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`)
            .join('');
        return `<ol>${items}</ol>`;
    });

    // Wrap loose lines in <p> tags
    html = html
        .split('\n\n')
        .map(block => {
            const trimmed = block.trim();
            if (!trimmed) return '';
            if (/^<(h[1-6]|ul|ol|blockquote|img|p|div)/.test(trimmed)) return trimmed;
            return `<p>${trimmed}</p>`;
        })
        .join('');

    return html;
};

// Configure turndown for HTML-to-Markdown
const createTurndownService = () => {
    const td = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
    });

    // Custom image rule to ensure clean markdown
    td.addRule('image', {
        filter: 'img',
        replacement: (_content, node) => {
            const el = node as HTMLImageElement;
            const alt = el.getAttribute('alt') || '';
            const src = el.getAttribute('src') || '';
            return `![${alt}](${src})`;
        },
    });

    return td;
};

const TiptapEditor = ({value, onChange, height = 400}: TiptapEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const turndownRef = useRef(createTurndownService());
    const isInternalUpdate = useRef(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {levels: [1, 2, 3]},
            }),
            ImageResize,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Placeholder.configure({
                placeholder: 'Begin met schrijven of sleep een afbeelding hierheen...',
            }),
        ],
        content: markdownToHtml(value),
        onUpdate: ({editor}) => {
            isInternalUpdate.current = true;
            const html = editor.getHTML();
            const md = turndownRef.current.turndown(html);
            onChange(md);
        },
        editorProps: {
            handleDrop: (view, event) => {
                const files = event.dataTransfer?.files;
                if (files && files.length > 0) {
                    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
                    if (imageFiles.length > 0) {
                        event.preventDefault();
                        imageFiles.forEach(file => handleImageUpload(file));
                        return true;
                    }
                }
                return false;
            },
            handlePaste: (view, event) => {
                const files = event.clipboardData?.files;
                if (files && files.length > 0) {
                    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
                    if (imageFiles.length > 0) {
                        event.preventDefault();
                        imageFiles.forEach(file => handleImageUpload(file));
                        return true;
                    }
                }
                return false;
            },
        },
    });

    // Sync external value changes (e.g. loading a post)
    useEffect(() => {
        if (editor && !isInternalUpdate.current) {
            const currentMd = turndownRef.current.turndown(editor.getHTML());
            if (currentMd !== value) {
                editor.commands.setContent(markdownToHtml(value));
            }
        }
        isInternalUpdate.current = false;
    }, [value, editor]);

    const handleImageUpload = useCallback(async (file: File) => {
        if (!editor) return;
        setIsUploading(true);
        try {
            const url = await mockUploadImage(file);
            editor.chain().focus().insertContent(`<img src="${url}" alt="${file.name}" />`).run();
        } catch {
            console.error('Image upload failed');
        } finally {
            setIsUploading(false);
        }
    }, [editor]);

    const handleFileSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => handleImageUpload(file));
        }
        e.target.value = '';
    }, [handleImageUpload]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('URL:');
        if (url) {
            editor.chain().focus().setLink({href: url}).run();
        }
    }, [editor]);

    if (!editor) return null;

    const ToolbarButton = ({
                               onClick,
                               isActive = false,
                               children,
                               title,
                           }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`tiptap-toolbar-btn ${isActive ? 'is-active' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div
            className={`tiptap-wrapper ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={() => setIsDragOver(false)}
        >
            {/* Toolbar */}
            <div className="tiptap-toolbar">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}
                               isActive={editor.isActive('bold')} title="Bold">
                    <Bold className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}
                               isActive={editor.isActive('italic')} title="Italic">
                    <Italic className="w-4 h-4"/>
                </ToolbarButton>

                <div className="tiptap-toolbar-divider"/>

                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                               isActive={editor.isActive('heading', {level: 1})} title="Heading 1">
                    <Heading1 className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                               isActive={editor.isActive('heading', {level: 2})} title="Heading 2">
                    <Heading2 className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                               isActive={editor.isActive('heading', {level: 3})} title="Heading 3">
                    <Heading3 className="w-4 h-4"/>
                </ToolbarButton>

                <div className="tiptap-toolbar-divider"/>

                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}
                               isActive={editor.isActive('bulletList')} title="Bullet List">
                    <List className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}
                               isActive={editor.isActive('orderedList')} title="Numbered List">
                    <ListOrdered className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()}
                               isActive={editor.isActive('blockquote')} title="Blockquote">
                    <Quote className="w-4 h-4"/>
                </ToolbarButton>

                <div className="tiptap-toolbar-divider"/>

                <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Add Link">
                    <LinkIcon className="w-4 h-4"/>
                </ToolbarButton>
                <ToolbarButton onClick={handleFileSelect} title="Insert Image">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ImagePlus className="w-4 h-4"/>}
                </ToolbarButton>
            </div>

            {/* Editor content */}
            <div className="tiptap-content" style={{minHeight: height}}>
                <EditorContent editor={editor}/>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
            />

            {/* Upload overlay */}
            {isUploading && (
                <div className="tiptap-upload-overlay">
                    <Loader2 className="w-6 h-6 animate-spin text-primary"/>
                    <span className="text-sm text-muted-foreground ml-2">Afbeelding uploaden...</span>
                </div>
            )}
        </div>
    );
};

export default TiptapEditor;