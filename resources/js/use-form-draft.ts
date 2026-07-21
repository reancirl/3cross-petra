import { useEffect, useRef } from 'react';

/**
 * Keeps a public form's typed answers in localStorage so leaving the page does not throw
 * them away.
 *
 * The Equipment Submission form links out to the photo and documentation guides, and the
 * content doc is explicit that progress must survive that trip ("Save entered information
 * between steps so users do not lose their progress when opening the photo or documentation
 * guides"). Those links open in a new tab, so the form usually stays mounted — but a refresh,
 * a back-navigation, or a middle-click that replaces the tab would otherwise lose everything
 * the visitor typed.
 *
 * Only serialisable answers are stored. File objects cannot go into localStorage, so callers
 * list those fields in `omit`; selected files survive a guide visit (the form never unmounts)
 * but are intentionally dropped on a reload rather than silently half-restored.
 */
type UseFormDraftOptions<T> = {
    /** Fields to leave out of the saved draft — File[] fields, and anything sensitive. */
    omit?: (keyof T)[];
    /** Skip persistence entirely, e.g. once the form has been submitted successfully. */
    enabled?: boolean;
};

const WRITE_DELAY_MS = 400;

export function useFormDraft<T extends Record<string, unknown>>(
    key: string,
    data: T,
    setData: (values: Partial<T>) => void,
    { omit = [], enabled = true }: UseFormDraftOptions<T> = {},
) {
    // The restore pass writes to form state, which re-triggers the save effect. Without this
    // guard the first save would race the restore and could persist the empty initial form.
    const hasRestored = useRef(false);
    const omitted = useRef(omit);
    omitted.current = omit;

    function serialisable(values: T): Partial<T> {
        const draft: Record<string, unknown> = {};

        Object.entries(values).forEach(([field, value]) => {
            if (omitted.current.includes(field as keyof T)) {
                return;
            }

            // Belt and braces: never try to store a File, however the caller configured omit.
            if (value instanceof File || (Array.isArray(value) && value.some((item) => item instanceof File))) {
                return;
            }

            draft[field] = value;
        });

        return draft as Partial<T>;
    }

    // Restore once on mount. localStorage is untouched during SSR because effects do not run there.
    useEffect(() => {
        if (!enabled) {
            hasRestored.current = true;

            return;
        }

        try {
            const stored = window.localStorage.getItem(key);

            if (stored) {
                const parsed = JSON.parse(stored) as Record<string, unknown>;
                const restored: Record<string, unknown> = {};

                // Only copy fields the current form actually declares, so a stale draft written
                // by an older version of the form cannot inject unknown keys into form state.
                Object.keys(data).forEach((field) => {
                    if (field in parsed && !omitted.current.includes(field as keyof T)) {
                        restored[field] = parsed[field];
                    }
                });

                if (Object.keys(restored).length > 0) {
                    setData(restored as Partial<T>);
                }
            }
        } catch {
            // A malformed or unreadable draft (quota, privacy mode, hand-edited JSON) must never
            // block the form from rendering — drop it and start clean.
            clear();
        }

        hasRestored.current = true;
        // Runs once: `data` and `setData` change identity every keystroke.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Persist on change, debounced so typing does not write on every keystroke.
    useEffect(() => {
        if (!enabled || !hasRestored.current) {
            return;
        }

        const timer = window.setTimeout(() => {
            try {
                window.localStorage.setItem(key, JSON.stringify(serialisable(data)));
            } catch {
                // Storage full or blocked — the form still works, it just will not survive a reload.
            }
        }, WRITE_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [key, data, enabled]);

    function clear() {
        try {
            window.localStorage.removeItem(key);
        } catch {
            // Nothing to do — the draft simply outlives this submission.
        }
    }

    return { clear };
}
