import TurndownService from 'turndown';

// Simple markdown-to-HTML converter for initial content loading
export const markdownToHtml = (md: string): string => {
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
        .replace(/(\*\*\*|___)(.+?)\1/g, '<strong><em>$2</em></strong>')
        .replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
        .replace(/(\*|_)(.+?)\1/g, '<em>$2</em>')
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
export const createTurndownService = () => {
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
            const width = el.getAttribute('width') || el.style.width;
            const height = el.getAttribute('height') || el.style.height;

            if (width || height) {
                const attrs = [`src="${src}"`, `alt="${alt}"`];
                if (width) attrs.push(`width="${width}"`);
                if (height) attrs.push(`height="${height}"`);
                return `<img ${attrs.join(' ')} />`;
            }

            return `![${alt}](${src})`;
        },
    });

    return td;
};
