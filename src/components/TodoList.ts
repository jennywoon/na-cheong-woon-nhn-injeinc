import { Todo } from "../types/todo";

export function createTodoList(todos: Todo[], onToggleCheck: (id: number) => void): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    list.style.listStyleType = 'none';
    list.style.padding = '0 15px';

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');
        todoListItem.dataset.timestamp = todo.timestamp.toString();

        const todoContent = document.createElement('div');
        todoContent.style.display = 'flex';
        todoContent.style.alignItems = 'center';
        todoContent.style.gap = '8px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.status === 'checked';

        const textNode = document.createTextNode(todo.text);
        const textSpan = document.createElement('span');
        textSpan.appendChild(textNode);
        if (todo.status !== '') {
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
            onToggleCheck(todo.id);
        });

        checkbox.addEventListener('click', () => {
            onToggleCheck(todo.id);
        })

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';

        // 리스트 삭제
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.removeChild(todoListItem);
        })

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Clear Compltetd';
        undoButton.style.marginLeft = '10px';

        undoButton.addEventListener('click', (event) => {
            event.stopPropagation();
        
            const completedItems = Array.from(list.children) as HTMLElement[]; 
        
            completedItems.forEach((todoListItem) => { 
                if (todoListItem.classList.contains('finish')) {
                    todoListItem.classList.remove('finish');
                    const originTime = todoListItem.dataset.timestamp;
        
                    if (originTime) {
                        const items = Array.from(list.children) as HTMLElement[];
                        items.sort((a, b) => {
                            const aTime = parseInt(a.dataset.timestamp || '0');
                            const bTime = parseInt(b.dataset.timestamp || '0');
                            return bTime - aTime;
                        });
        
                        items.forEach(item => list.appendChild(item));
                    }
                }
            });
        });

        todoContent.appendChild(checkbox);
        todoContent.appendChild(textSpan);

        todoListItem.appendChild(todoContent);
        todoListItem.appendChild(deleteButton);
        todoListItem.appendChild(undoButton);
        
        list.appendChild(todoListItem);
    })

    return list;
}