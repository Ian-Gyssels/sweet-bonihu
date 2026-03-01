import {X} from 'lucide-react';

interface LinkInputBarProps {
    url: string;
    onChange: (val: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const LinkInputBar = ({
                          url,
                          onChange,
                          onConfirm,
                          onCancel
                      }: LinkInputBarProps) => (
    <div className="tiptap-link-input">
        <input
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirm();
                if (e.key === 'Escape') onCancel();
            }}
            autoFocus
        />
        <button type="button" onClick={onConfirm} className="tiptap-toolbar-btn is-active">
            OK
        </button>
        <button type="button" onClick={onCancel}
                className="tiptap-toolbar-btn">
            <X className="w-4 h-4"/>
        </button>
    </div>
);

export default LinkInputBar;
