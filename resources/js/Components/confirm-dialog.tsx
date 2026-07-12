import { useEffect } from 'react';

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel,
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    useEffect(() => {
        if (!open) {
            return;
        }

        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onCancel();
            }
        }

        window.addEventListener('keydown', closeOnEscape);

        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [open, onCancel]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/55 px-5 py-6">
            <button
                type="button"
                aria-label={cancelLabel}
                className="absolute inset-0 cursor-default"
                onClick={onCancel}
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                className="relative w-full max-w-md border border-[#dad5cb] bg-[#f8f8f6] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            >
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]">
                    Petra Portal
                </span>
                <h2
                    id="confirm-dialog-title"
                    className="mt-3 font-heading text-3xl font-semibold uppercase leading-none tracking-[0.08em] text-neutral-950"
                >
                    {title}
                </h2>
                <p id="confirm-dialog-description" className="mt-4 text-base leading-7 text-neutral-600">
                    {description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="button-press focus-copper inline-flex h-11 items-center justify-center border border-neutral-400 px-5 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-white"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="button-press focus-copper inline-flex h-11 items-center justify-center bg-[#a56437] px-5 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </section>
        </div>
    );
}
