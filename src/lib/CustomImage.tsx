import Image from 'tiptap-extension-resize-image'
import {mergeAttributes} from '@tiptap/core'


function alignToStyle(align: string | null | undefined): string {
    switch (align) {
        case 'left':
            return 'display: block; margin-left: 0; margin-right: auto;'
        case 'right':
            return 'display: block; margin-left: auto; margin-right: 0;'
        case 'center':
        default:
            return 'display: block; margin-left: auto; margin-right: auto;'
    }
}

export const CustomImage = Image.extend({
    name: 'image',

    addAttributes() {
        const parentAttrs = this.parent?.() ?? {}
        return {
            ...parentAttrs,
            'data-align': {
                default: 'left',
                parseHTML: (element) => element.getAttribute('data-align') || 'left',
                renderHTML: (attributes) => ({
                    'data-align': attributes['data-align'] || 'left',
                }),
            },
            style: {
                default: alignToStyle('left'),
                parseHTML: (element) => {
                    const existingStyle = element.getAttribute('style')
                    if (existingStyle) return existingStyle
                    const align = element.getAttribute('data-align')
                    return alignToStyle(align)
                },
                renderHTML: (attributes) => {
                    if (!attributes.style) return {}
                    return {style: attributes.style}
                },
            },
            wrapperStyle: {
                ...((parentAttrs as Record<string, unknown>).wrapperStyle as object | undefined) ?? {},
                parseHTML: (element: HTMLElement) => {
                    const align = element.getAttribute('data-align') || 'left'
                    const justifyContent =
                        align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
                    return `display: flex; justify-content: ${justifyContent};`
                },
            },
            containerStyle: {
                ...((parentAttrs as Record<string, unknown>).containerStyle as object | undefined) ?? {},
                renderHTML: (attributes: Record<string, unknown>) =>
                    attributes.containerStyle ? { containerstyle: attributes.containerStyle } : {},
            },
        }
    },

    renderHTML({HTMLAttributes}) {
        return ['img', mergeAttributes(HTMLAttributes)]
    },

})