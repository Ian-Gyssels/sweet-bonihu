import DOMPurify from 'dompurify';
import {markdownToHtml} from "@/lib/editorUtils.ts";

interface MarkdownRendererProps {
    content: string;
}

const PURIFY_CONFIG = {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'a', 'img', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'hr'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'target', 'rel', 'loading', 'class', 'width', 'height', 'style'],
};

/**
 * Converts Markdown to HTML for rendering blog post content.
 * Links open in a new tab automatically and content is sanitized.
 */
const MarkdownRenderer = ({content}: MarkdownRendererProps) => {
    const html = markdownToHtml(content);
    const clean = DOMPurify.sanitize(html, PURIFY_CONFIG);

    // After sanitization, ensure links open in a new tab
    const finalHtml = clean.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

    return (
        <div
            className="markdown-renderer prose-content"
            dangerouslySetInnerHTML={{__html: finalHtml}}
        />
    );
};

export default MarkdownRenderer;