import { Todo } from "../../types/todo";
import { showPreview } from "../../utils/showPreview";
import "./TodoList.css";

let dragStartTimeout: ReturnType<typeof setTimeout> | null = null;
let isDragging = false;
let dragStartOffsetX = 0;
let dragStartOffsetY = 0;
let originalItem: HTMLElement | null = null;
let originalItemPlaceholder: HTMLElement | null = null;

export function createTodoList(
    todos: Todo[], 
    onToggleComplete: (id: number) => void, 
    deleteTodo: (id:number) => void
): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    // 드래그 가이드 엘리먼트
    const guide = document.createElement('li');
    guide.classList.add('todo-guide');
    list.appendChild(guide);

    let draggingItem: HTMLLIElement | null = null;
    
    // 이동시킬 위치 머무를 경우 preview 생성
    let previewTimeout: ReturnType<typeof setTimeout> | null = null;
    let cleanupPreview: (() => void) | null = null;
    let hoverItem: HTMLElement | null = null;

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');
        todoListItem.classList.add('todo-item');
        todoListItem.setAttribute('data-id', todo.id.toString());
        todoListItem.dataset.timestamp = todo.timestamp.toString();

        const todoContent = document.createElement('div');
        todoContent.style.display = 'flex';
        todoContent.style.alignItems = 'center';
        todoContent.style.gap = '8px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isCompleted;
        checkbox.style.visibility = 'hidden';
        checkbox.style.position = 'absolute';
        
        const textNode = document.createTextNode(todo.text);
        const textSpan = document.createElement('span');
        textSpan.appendChild(textNode);
        if (todo.isCompleted) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.color = '#a4a4a4';
        }

        // 리스트 삭제
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.onclick = () => deleteTodo(todo.id);

        todoContent.appendChild(checkbox);
        todoContent.appendChild(textSpan);

        
        todoContent.addEventListener('click', (event) => {
            if (isDragging) return;
            if (!(event.target instanceof HTMLButtonElement)) {
                onToggleComplete(todo.id);
            };
        });

        checkbox.addEventListener('click', (event) => {
            event.stopPropagation();
            onToggleComplete(todo.id);
        })


        todoListItem.appendChild(todoContent);
        todoListItem.appendChild(deleteButton);

        todoListItem.addEventListener('mousedown', (event: MouseEvent) => {
            if (todo.isCompleted) return;
            
            dragStartTimeout = setTimeout(() => {
                originalItem = todoListItem;
                originalItemPlaceholder = originalItem.cloneNode(true) as HTMLElement;
                originalItemPlaceholder.classList.add("original-placeholder");
                originalItemPlaceholder.style.pointerEvents = "none";
                originalItemPlaceholder.querySelector("button")?.remove();
                list.insertBefore(originalItemPlaceholder, originalItem.nextSibling);

                isDragging = true;
                draggingItem = todoListItem;
                draggingItem.classList.add('dragging');
                
                const rect = draggingItem.getBoundingClientRect();
                const listRect = list.getBoundingClientRect();
                dragStartOffsetX = event.clientX - rect.left;
                dragStartOffsetY = event.clientY - rect.top;
                draggingItem.style.left = `${rect.left - listRect.left}px`;
                draggingItem.style.top = `${rect.top - listRect.top}px`;
            }, 500);
        });
        
        list.appendChild(todoListItem);
    });

    // 드래그앤드롭 마우스 이벤트
    function handleMouseMove(event: MouseEvent) {
        updateDraggingItemPosition(event);
    };

    function handleMouseUp(event: MouseEvent) {
        if (dragStartTimeout) {
            clearTimeout(dragStartTimeout);
            dragStartTimeout = null;
        }
        if (!isDragging) return;
        finalizeDrag(event);
    };

    function handleKeyDown(event: KeyboardEvent) {
        resetDraggingItem(event);
    };

    function updateDraggingItemPosition(e: MouseEvent) {
        if (!draggingItem || !isDragging) return;
        const listRect = list.getBoundingClientRect();
        const newTop = e.clientY - listRect.top - dragStartOffsetY;
        const newLeft = e.clientX - listRect.left - dragStartOffsetX;
        draggingItem.style.top = `${newTop}px`;
        draggingItem.style.left = `${newLeft}px`;

        const items = Array.from(list.children) as HTMLElement[];
        const draggingRect = draggingItem.getBoundingClientRect();

        let inserted = false;
        for (const item of items) {
            if (item === draggingItem || item === guide) continue;

            const itemRect = item.getBoundingClientRect();
            const draggingCenter = draggingRect.top + draggingRect.height / 2;
            const itemCenter = itemRect.top + itemRect.height / 2;

            if (draggingCenter < itemCenter) {
                list.insertBefore(guide, item);
                inserted = true;

                // preview
                if (hoverItem !== item) {
                    if (hoverItem) {
                        hoverItem.style.borderLeft = '';
                    }
                    hoverItem = item;

                    if(cleanupPreview) {
                        cleanupPreview();
                        cleanupPreview = null;
                    }
                    hoverItem.style.borderLeft = '5px solid #4bd51b';

                    const result = showPreview(item, draggingItem, list);
                    previewTimeout = result.timeout;
                    cleanupPreview = result.cleanup;
                }
                break;
            }
            if (!inserted) {
                list.appendChild(guide);

                if (hoverItem !== null) {
                    if (hoverItem) {
                        hoverItem.style.borderLeft = '';
                    }
                    if (cleanupPreview) {
                        cleanupPreview();
                        cleanupPreview = null;
                    }
                    hoverItem = null;
                }
            }
        }
    };

    function finalizeDrag(e: MouseEvent) {
        if (!draggingItem) return;
        if (dragStartTimeout) {
            clearTimeout(dragStartTimeout);
            dragStartTimeout = null;
        }
        draggingItem.classList.remove('dragging');
        const listRect = list.getBoundingClientRect();
        const isInsideList =
            e.clientX >= listRect.left &&
            e.clientX <= listRect.right &&
            e.clientY >= listRect.top &&
            e.clientY <= listRect.bottom;

        // 리스트 외부 드롭 시, 드래그 취소
        if (isInsideList) {
            if (hoverItem) {
                if (draggingItem.compareDocumentPosition(hoverItem) & Node.DOCUMENT_POSITION_PRECEDING) {
                    list.insertBefore(draggingItem, hoverItem);
                } else {
                    list.insertBefore(draggingItem, hoverItem.nextSibling);
                }
            }
        } else {
            if (originalItem && originalItem !== draggingItem) {
                list.insertBefore(draggingItem, originalItem.nextElementSibling);
            }
        };

        if (originalItemPlaceholder) {
            originalItemPlaceholder.remove();
            originalItemPlaceholder = null;
        }

        if (originalItem) {
            originalItem.style.visibility = "visible";
            originalItem = null;
        }

        draggingItem.style.zIndex = '';
        draggingItem.style.position = '';
        draggingItem.style.top = '';
        draggingItem.style.left = '';
        draggingItem.style.opacity = '';
        draggingItem = null;

        // 블러 preview 제거
        if (hoverItem) {
            hoverItem.style.borderLeft = '';
            hoverItem = null;
        }
        if (previewTimeout) clearTimeout(previewTimeout);
        if (cleanupPreview) {
            cleanupPreview();
            cleanupPreview = null;
        }
        isDragging = false;
    };

    // 드래그 도중 ESC 누를 경우, 드래그 취소
    function resetDraggingItem(event: KeyboardEvent) {
        if (event.key === "Escape" && draggingItem) {
            if (dragStartTimeout) {
                clearTimeout(dragStartTimeout);
                dragStartTimeout = null;
            }
            draggingItem.classList.remove('dragging');
            draggingItem.style.zIndex = '';
            draggingItem.style.position = '';
            draggingItem.style.top = '';
            draggingItem.style.left = '';
            draggingItem.style.opacity = '';
            draggingItem = null;

            if (hoverItem) {
                hoverItem.style.borderLeft = '';
                hoverItem = null;
            };

            if (originalItemPlaceholder) {
                originalItemPlaceholder.remove();
                originalItemPlaceholder = null;
            }

            if (previewTimeout) clearTimeout(previewTimeout);
            if (cleanupPreview) {
                cleanupPreview();
                cleanupPreview = null;
            };
            isDragging = false;
        };
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    return list;
}