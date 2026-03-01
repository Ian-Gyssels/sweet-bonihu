import {describe, it, expect} from 'vitest';
import {markdownToHtml, createTurndownService} from '../lib/editorUtils';
import JSDOM from 'jsdom';

describe('markdownToHtml', () => {
    it('should return empty string for null/undefined/empty input', () => {
        expect(markdownToHtml('')).toBe('');
        // @ts-ignore
        expect(markdownToHtml(null)).toBe('');
    });

    it('should correctly render italics with underscores', () => {
        expect(markdownToHtml('_midsommer_')).toBe('<p><em>midsommer</em></p>');
    });

    it('should correctly render bold with underscores', () => {
        expect(markdownToHtml('__bold__')).toBe('<p><strong>bold</strong></p>');
    });

    it('should correctly render bold and italic with underscores', () => {
        expect(markdownToHtml('___bold italic___')).toBe('<p><strong><em>bold italic</em></strong></p>');
    });

    it('should correctly render italics with asterisks', () => {
        expect(markdownToHtml('*italic*')).toBe('<p><em>italic</em></p>');
    });

    it('should correctly render bold with asterisks', () => {
        expect(markdownToHtml('**bold**')).toBe('<p><strong>bold</strong></p>');
    });

    it('should correctly render bold and italic with asterisks', () => {
        expect(markdownToHtml('***bold italic***')).toBe('<p><strong><em>bold italic</em></strong></p>');
    });

    it('should correctly render headings', () => {
        expect(markdownToHtml('# Heading 1')).toBe('<h1>Heading 1</h1>');
        expect(markdownToHtml('## Heading 2')).toBe('<h2>Heading 2</h2>');
        expect(markdownToHtml('### Heading 3')).toBe('<h3>Heading 3</h3>');
    });

    it('should correctly render images', () => {
        expect(markdownToHtml('![alt text](https://example.com/image.png)')).toBe('<img src="https://example.com/image.png" alt="alt text" />');
    });

    it('should correctly render links', () => {
        expect(markdownToHtml('[Link text](https://example.com)')).toBe('<p><a href="https://example.com">Link text</a></p>');
    });

    it('should correctly render blockquotes', () => {
        expect(markdownToHtml('> This is a quote')).toBe('<blockquote><p>This is a quote</p></blockquote>');
    });

    it('should correctly render inline code', () => {
        expect(markdownToHtml('`const x = 1`')).toBe('<p><code>const x = 1</code></p>');
    });

    it('should correctly render unordered lists', () => {
        const md = '- Item 1\n- Item 2\n- Item 3';
        expect(markdownToHtml(md)).toBe('<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>');
    });

    it('should correctly render ordered lists', () => {
        const md = '1. First\n2. Second\n3. Third';
        expect(markdownToHtml(md)).toBe('<ol><li>First</li><li>Second</li><li>Third</li></ol>');
    });

    it('should wrap multiple blocks in paragraphs', () => {
        const md = 'Paragraph 1\n\nParagraph 2';
        expect(markdownToHtml(md)).toBe('<p>Paragraph 1</p><p>Paragraph 2</p>');
    });

    it('should handle complex mixed content', () => {
        const md = '# Title\n\nSome text with **bold**.\n\n- List item';
        const expected = '<h1>Title</h1><p>Some text with <strong>bold</strong>.</p><ul><li>List item</li></ul>';
        expect(markdownToHtml(md)).toBe(expected);
    });
});

describe('createTurndownService', () => {
    const turndown = createTurndownService();

    it('should convert basic HTML to Markdown', () => {
        expect(turndown.turndown('<h1>Title</h1>')).toBe('# Title');
        expect(turndown.turndown('<p>Text with <strong>bold</strong></p>')).toBe('Text with **bold**');
    });

    it('should use - as bullet list marker', () => {
        expect(turndown.turndown('<ul><li>Item</li></ul>')).toBe('-   Item');
    });

    it('should use atx style headings', () => {
        expect(turndown.turndown('<h2>Subtitle</h2>')).toBe('## Subtitle');
    });

    it('should handle images without dimensions', () => {
        expect(turndown.turndown('<img src="img.png" alt="alt" />')).toBe('![alt](img.png)');
    });

    it('should handle images with width/height attributes', () => {
        // We need a real DOM node for the image rule to work correctly as it casts to HTMLImageElement
        const dom = new JSDOM.JSDOM();
        const img = dom.window.document.createElement('img');
        img.setAttribute('src', 'img.png');
        img.setAttribute('alt', 'alt');
        img.setAttribute('width', '100');

        expect(turndown.turndown(img.outerHTML)).toBe('<img src="img.png" alt="alt" width="100" />');
    });

    it('should handle images with style dimensions', () => {
        const dom = new JSDOM.JSDOM();
        const img = dom.window.document.createElement('img');
        img.setAttribute('src', 'img.png');
        img.style.width = '200px';

        expect(turndown.turndown(img.outerHTML)).toBe('<img src="img.png" alt="" width="200px" />');
    });
});
