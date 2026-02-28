import MDEditor from '@uiw/react-md-editor';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
    content: string;
}

/**
 * Converts Markdown to HTML for rendering blog post content.
 * Links open in a new tab automatically.
 */
const markdownToHtml = (md: string): string => {
    if (!md) return '';

    let html = md
        // Code blocks (fenced)
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        // Headings
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Images (before links)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
        // Links – open in new tab
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Bold & italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Blockquote
        .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr />');

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

    // Wrap remaining loose text in <p> tags
    html = html
        .split('\n\n')
        .map(block => {
            const trimmed = block.trim();
            if (!trimmed) return '';
            if (/^<(h[1-6]|ul|ol|blockquote|img|p|div|pre|hr)/.test(trimmed)) return trimmed;
            return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
        })
        .join('');

    return html;
};

const MarkdownRenderer = ({content}: MarkdownRendererProps) => {
    return (
        <div data-color-mode="light" className="markdown-renderer">
            <MDEditor.Markdown
                source={content}
                components={{
                    a: ({href, children, ...props}) => (
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

const PURIFY_CONFIG = {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'a', 'img', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'hr'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'target', 'rel', 'loading', 'class', 'width', 'height', 'style'],
};

export default MarkdownRenderer;

export const MarkdownRendererV2 = ({content}: MarkdownRendererProps) => {
    const clean = DOMPurify.sanitize(markdownToHtml(content), PURIFY_CONFIG);
    return (
        <div
            className="markdown-renderer prose-content"
            dangerouslySetInnerHTML={{__html: markdownToHtml(clean)}}
        />
    );
};