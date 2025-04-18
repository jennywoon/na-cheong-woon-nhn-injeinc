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

            const minTop = 0;
            const maxTop = list.offsetHeight - draggingItem.offsetHeight;
            const clampedTop = Math.max(minTop, Math.min(newTop, maxTop));
            draggingItem.style.top = `${clampedTop}px`;
    
            const items = Array.from(list.children) as HTMLElement[];
            const draggingRect = draggingItem.getBoundingClientRect();
    
            let inserted = false;
            for (const item of items) {
                if (item === draggingItem) continue;
                const itemRect = item.getBoundingClientRect();
                const draggingCenter = draggingRect.top + draggingRect.height / 2;
                const itemCenter = itemRect.top + itemRect.height / 2;
    
                if (draggingCenter < itemCenter) {
                    list.insertBefore(guide, item);
                    guide.style.display = 'block';
                    inserted = true;
                    break;
                }
                if (!inserted) {
                    list.appendChild(guide);
                    guide.style.display = 'block';
                }
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (draggingItem) {
            if (guide.parentElement === list) {
                list.insertBefore(draggingItem, guide);
            }
            draggingItem.style.zIndex = '';
            draggingItem.style.position = '';
            draggingItem.style.top = '';
            draggingItem.style.left = '';
            draggingItem = null;

            guide.style.display = 'none';
        }
    });

    return list;
}