import { Todo } from "../types/todo";


export function createTodoList(todos: Todo[], onToggleComplete: (id: number) => void): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    list.style.listStyleType = 'none';
    list.style.padding = '0 15px';
    list.style.position = 'relative'; 
    
    // 드래그 가이드 엘리먼트
    const guide = document.createElement('li');
    guide.style.padding = '10px';
    guide.style.transition = 'all 0.1s ease-in-out';
    guide.style.display = 'none';
    list.appendChild(guide);

    let draggingItem: HTMLLIElement | null = null;
    
    // 이동시킬 위치 머무를 경우 preview 생성
    let previewTimeout: ReturnType<typeof setTimeout> | null = null;
    let hoverItem: HTMLElement | null = null;
    let previewReplica: HTMLElement | null = null;

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');
        todoListItem.dataset.timestamp = todo.timestamp.toString();

        const todoContent = document.createElement('div');
        todoContent.style.display = 'flex';
        todoContent.style.alignItems = 'center';
        todoContent.style.gap = '8px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isCompleted;

        const textNode = document.createTextNode(todo.text);
        const textSpan = document.createElement('span');
        textSpan.appendChild(textNode);
        if (todo.isCompleted) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.color = '#a4a4a4';
        }

        todoListItem.style.borderBottom = '1px solid #ddd';
        todoListItem.style.padding = '10px';
        todoListItem.style.fontWeight = '600';
        todoListItem.style.cursor = 'pointer';
        todoListItem.style.display = 'flex';
        todoListItem.style.justifyContent = 'space-between';

        textSpan.addEventListener('click', () => {
            onToggleComplete(todo.id);
        });

        checkbox.addEventListener('click', () => {
            onToggleComplete(todo.id);
        })

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';

        // 리스트 삭제
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.removeChild(todoListItem);
        })

        todoContent.appendChild(checkbox);
        todoContent.appendChild(textSpan);

        todoListItem.appendChild(todoContent);
        todoListItem.appendChild(deleteButton);

        todoListItem.addEventListener('mousedown', () => {
            if (!todo.isCompleted) {
                draggingItem = todoListItem;
                draggingItem.style.position = 'absolute';
                draggingItem.style.zIndex = '1000';

                const rect = draggingItem.getBoundingClientRect();
                const listRect = list.getBoundingClientRect();
                draggingItem.style.left = `${rect.left - listRect.left}px`;
                draggingItem.style.top = `${rect.top - listRect.top}px`; 
            }
        });
        
        list.appendChild(todoListItem);
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
        if (draggingItem) {
            const listRect = list.getBoundingClientRect();
            const newTop = e.clientY - listRect.top - draggingItem.offsetHeight / 2;
            draggingItem.style.top = `${newTop}px`;
    
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
                    guide.style.display = 'block';
                    inserted = true;

                    // preview
                    if (hoverItem !== item) {
                        if (hoverItem) {
                            hoverItem.style.borderLeft = '';
                            hoverItem.style.filter = '';
                            hoverItem.style.display = 'flex';
                        }
                        if (previewTimeout) clearTimeout(previewTimeout);
                        if (previewReplica) {
                            list.removeChild(previewReplica);
                            previewReplica = null;
                        }

                        hoverItem = item;
                        hoverItem.style.borderLeft = '5px solid #4bd51b';
                        previewTimeout = setTimeout(() => {
                            item.style.filter = 'blur(2px)';
                            item.style.display = 'none';
                            if (draggingItem) {
                                previewReplica = draggingItem.cloneNode(true) as HTMLLIElement;
                                previewReplica.style.opacity = '0.5';
                                previewReplica.style.pointerEvents = 'none';
                                previewReplica.style.position = 'static';
                                previewReplica.style.zIndex = '0';
                                previewReplica.style.borderLeft = '5px solid #4bd51b';
                                item.style.display = 'none';
                                list.insertBefore(previewReplica, item);
                            }
                        }, 2000);
                    }
                    break;
                }
                if (!inserted) {
                    list.appendChild(guide);
                    guide.style.display = 'block';

                    if (hoverItem !== null) {
                        if (hoverItem) {
                            hoverItem.style.borderLeft = '';
                            hoverItem.style.filter = '';
                            hoverItem.style.display = 'flex';
                        }
                        if (previewTimeout) clearTimeout(previewTimeout);
                        if (previewReplica) {
                            list.removeChild(previewReplica);
                            previewReplica = null;
                        }
                        hoverItem = null;
                    }
                }
            }
        }
    });

    document.addEventListener('mouseup', (e: MouseEvent) => {
        if (draggingItem) {
            const listRect = list.getBoundingClientRect();
            const isInsideList =
                e.clientX >= listRect.left &&
                e.clientX <= listRect.right &&
                e.clientY >= listRect.top &&
                e.clientY <= listRect.bottom;

            // 리스트 외부 드롭 시, 드래그 취소
            if (isInsideList && guide.parentElement === list) {
                list.insertBefore(draggingItem, guide);
            }

            draggingItem.style.zIndex = '';
            draggingItem.style.position = '';
            draggingItem.style.top = '';
            draggingItem.style.left = '';
            draggingItem = null;

            guide.style.display = 'none';

            // 블러 preview 제거
            if (hoverItem) {
                hoverItem.style.borderLeft = '';
                hoverItem.style.filter = '';
                hoverItem.style.display = 'flex';
            }
            if (previewTimeout) clearTimeout(previewTimeout);
            if (previewReplica) {
                list.removeChild(previewReplica);
                previewReplica = null;
            }
            hoverItem = null;
        }
    });

    // 드래그 도중 ESC 누를 경우, 드래그 취소
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === "Escape" && draggingItem) {
            draggingItem.style.zIndex = '';
            draggingItem.style.position = '';
            draggingItem.style.top = '';
            draggingItem.style.left = '';
            draggingItem = null;

            guide.style.display = 'none';

            if (hoverItem) {
                hoverItem.style.borderLeft = '';
                hoverItem.style.filter = '';
                hoverItem.style.display = 'flex';
            }
            if (previewTimeout) clearTimeout(previewTimeout);
            if (previewReplica) {
                list.removeChild(previewReplica);
                previewReplica = null;
            }
            hoverItem = null;
        }
    });

    return list;
}