import TiptapEditor from "@/components/TiptapEditor.tsx";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    height?: number;
}

const MarkdownEditor = ({value, onChange, height = 400}: MarkdownEditorProps) => {
    return (
        <div className="mt-3">
            <TiptapEditor
                value={value}
                onChange={(md) => onChange(md)}
                height={height}
            />
        </div>
    );
};

export default MarkdownEditor;