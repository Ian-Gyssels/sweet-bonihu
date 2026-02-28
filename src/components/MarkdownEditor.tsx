import MDEditor from '@uiw/react-md-editor';
import TiptapEditor from "@/components/TiptapEditor.tsx";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    height?: number;
}

const MarkdownEditor = ({value, onChange, height = 400}: MarkdownEditorProps) => {
    return (
        <div data-color-mode="light" className="markdown-editor-wrapper">
            <MDEditor
                value={value}
                onChange={onChange}
                height={height}
                preview="live"
                visibleDragbar={false}
            />
            <div className="mt-3">
                <TiptapEditor
                    value={value}
                    onChange={(md) => onChange(md)}
                    height={height}
                />
            </div>

        </div>
    );
};

export default MarkdownEditor;