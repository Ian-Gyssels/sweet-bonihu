import {Editor} from '@tiptap/react';
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
import ToolbarButton from './ToolbarButton';

interface EditorToolbarProps {
    editor: Editor;
    onAddLink: () => void;
    onFileSelect: () => void;
    isUploading: boolean;
}

const EditorToolbar = ({
                           editor,
                           onAddLink,
                           onFileSelect,
                           isUploading
                       }: EditorToolbarProps) => (
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

        <ToolbarButton onClick={onAddLink} isActive={editor.isActive('link')} title="Add Link">
            <LinkIcon className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={onFileSelect} title="Insert Image">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ImagePlus className="w-4 h-4"/>}
        </ToolbarButton>
    </div>
);

export default EditorToolbar;
