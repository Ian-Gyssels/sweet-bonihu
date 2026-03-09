import React from 'react';

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
}

const ToolbarButton = ({
                           onClick,
                           isActive = false,
                           children,
                           title,
                       }: ToolbarButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`tiptap-toolbar-btn ${isActive ? 'is-active' : ''}`}
    >
        {children}
    </button>
);

export default ToolbarButton;
