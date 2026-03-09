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
function deriveAlignFromContainerStyle(containerStyle: string | null | undefined): 'left' | 'center' | 'right' | null {
    if (!containerStyle) return null

    const s = containerStyle.toLowerCase().replace(/\s/g, '')

    // Package uses margin shorthand; browser may output with or without "px"
    if (s.includes('margin:0pxauto0px0px') || s.includes('margin:0auto00')) return 'left'
    if (s.includes('margin:0px0px0pxauto') || s.includes('margin:000auto')) return 'right'
    if (s.includes('margin:0pxauto') || s.includes('margin:0auto')) return 'center'

    // CustomImage uses margin-left/margin-right
    if (s.includes('margin-left:auto') && s.includes('margin-right:0')) return 'right'
    if (s.includes('margin-left:0') && s.includes('margin-right:auto')) return 'left'
    if (s.includes('margin-left:auto') && s.includes('margin-right:auto')) return 'center'

    return null
}

export const createTurndownService = () => {
    const td = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
    })

    td.addRule('imageWithAlign', {
        filter: 'img',
        replacement: (content, node) => {
            const img = node as HTMLImageElement
            const alt = img.getAttribute('alt') || ''
            const src = img.getAttribute('src') || ''
            const width = img.getAttribute('width') || img.style.width
            const height = img.getAttribute('height') || img.style.height
            const containerStyle = img.getAttribute('containerstyle') || ''
            const dataAlign = img.getAttribute('data-align')
            const alignFromContainer = deriveAlignFromContainerStyle(containerStyle)
            const alignFromData =
                dataAlign === 'left' || dataAlign === 'center' || dataAlign === 'right'
                    ? dataAlign
                    : null
            const align = alignFromContainer || alignFromData || 'left'

            const attrs: string[] = []
            attrs.push(`src="${src}"`)
            attrs.push(`alt="${alt}"`)
            if (width) attrs.push(`width="${width}"`)
            if (height) attrs.push(`height="${height}"`)
            attrs.push(`data-align="${align}"`)

            return `<img ${attrs.join(' ')} />`
        },
    })

    return td
}