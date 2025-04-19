export function showPreview(
    item: HTMLElement,
    draggingItem: HTMLElement | null,
    list: HTMLElement,
    previewClass = 'todo-preview',
    blurredClass = 'blurred',
    delay = 2000
): {
    timeout: ReturnType<typeof setTimeout>,
    cleanup: () => void
} {
    let previewReplica: HTMLElement | null = null;

    const timeout = setTimeout(() => {
        item.classList.add(blurredClass);
        item.style.display = 'none';

        if (draggingItem) {
            previewReplica = draggingItem.cloneNode(true) as HTMLElement;
            previewReplica.classList.add(previewClass);
            list.insertBefore(previewReplica, item);
        }
    }, delay);

    const cleanup = () => {
        item.classList.remove(blurredClass);
        item.style.display = '';

        if (previewReplica && list.contains(previewReplica)) {
            list.removeChild(previewReplica);
            previewReplica = null;
        }

        clearTimeout(timeout);
    };

    return { timeout, cleanup };
}