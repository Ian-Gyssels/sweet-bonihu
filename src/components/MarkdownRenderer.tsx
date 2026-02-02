import MDEditor from '@uiw/react-md-editor';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <div data-color-mode="light" className="markdown-renderer">
    <MDEditor.Markdown
        source={content}
    components={{
        a: ({ href, children, ...props }) => (
            <a
                href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
    >
        {children}
        </a>
    ),
    }}
    />
    </div>
);
};

export default MarkdownRenderer;