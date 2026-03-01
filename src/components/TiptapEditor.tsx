import {Editor, useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useImageUpload} from '@/hooks/useImageUpload';
import {Loader2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import ImageResize from "tiptap-extension-resize-image";
import {createTurndownService, markdownToHtml} from "@/lib/editorUtils.ts";
import EditorToolbar from './tiptap-editor/EditorToolbar';
import LinkInputBar from './tiptap-editor/LinkInputBar';

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
    height?: number;
}

const TiptapEditor = ({value, onChange, height = 400}: TiptapEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {uploadImage, isUploading} = useImageUpload();
    const {toast} = useToast();
    const [isDragOver, setIsDragOver] = useState(false);
    const [linkInput, setLinkInput] = useState<{ show: boolean; url: string }>({show: false, url: ''});
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
            handleDrop: (_view, event) => {
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
            handlePaste: (_view, event) => {
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

    useEffect(() => {
        if (editor && !isInternalUpdate.current) {
            const html = editor.getHTML();
            const currentMd = turndownRef.current.turndown(html);
            if (currentMd !== value) {
                editor.commands.setContent(markdownToHtml(value));
            }
        }
        isInternalUpdate.current = false;
    }, [value, editor]);

    const handleImageUpload = useCallback(async (file: File) => {
        if (!editor) return;
        try {
            const url = await uploadImage(file);
            editor.chain().focus().insertContent(`<img src="${url}" alt="${file.name}" />`).run();
        } catch {
            toast({
                title: 'Fout bij uploaden',
                description: 'something went wrong while uploading your image',
                variant: 'destructive',
            });
        }
    }, [editor, uploadImage, toast]);

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
        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
        }
        setLinkInput({show: true, url: ''});
    }, [editor]);

    const confirmLink = useCallback(() => {
        if (!editor || !linkInput.url) {
            setLinkInput({show: false, url: ''});
            return;
        }
        editor.chain().focus().setLink({href: linkInput.url}).run();
        setLinkInput({show: false, url: ''});
    }, [editor, linkInput.url]);

    if (!editor) return null;

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
            <EditorToolbar
                editor={editor}
                onAddLink={addLink}
                onFileSelect={handleFileSelect}
                isUploading={isUploading}
            />

            {/* Link input bar */}
            {linkInput.show && (
                <LinkInputBar
                    url={linkInput.url}
                    onChange={(url) => setLinkInput(prev => ({...prev, url}))}
                    onConfirm={confirmLink}
                    onCancel={() => setLinkInput({show: false, url: ''})}
                />
            )}

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