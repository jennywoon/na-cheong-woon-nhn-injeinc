export function createTodoList(todos: string[]): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    list.style.listStyleType = 'none';
    list.style.padding = '0 15px';

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');

        const todoContent = document.createElement('div');
        todoContent.style.display = 'flex';
        todoContent.style.alignItems = 'center';
        todoContent.style.gap = '8px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');

        const textNode = document.createTextNode(todo);
        const textSpan = document.createElement('span');
        textSpan.appendChild(textNode);
        textSpan.classList.add('todo-text');

        todoListItem.style.borderBottom = '1px solid #ddd';
        todoListItem.style.padding = '10px';
        todoListItem.style.fontWeight = '600';
        todoListItem.style.cursor = 'pointer';
        todoListItem.style.display = 'flex';
        todoListItem.style.justifyContent = 'space-between';

        // 리스트 완료 여부
        const completeCheck = () => {
            if (todoListItem.classList.contains('check')){
                todoListItem.style.color = '#a4a4a4';
                todoListItem.style.textDecoration = 'line-through';
                checkbox.checked = true;
            } else {
                todoListItem.style.color = '';
                todoListItem.style.textDecoration = 'none';
                checkbox.checked = false;
            }
             
        }

        textSpan.addEventListener('click', () => {
            todoListItem.classList.toggle('check');
            completeCheck();
            checkbox.checked = todoListItem.classList.contains('check');
        });

        checkbox.addEventListener('click', () => {
            todoListItem.classList.toggle('check');
            completeCheck();
        })

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';

        // 리스트 삭제
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.removeChild(todoListItem);
        })

        // 완료 버튼
        const completeButton = document.createElement('button');
        completeButton.textContent = '완료';
        completeButton.style.marginLeft = '10px';

        completeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (checkbox.checked) {
                todoListItem.classList.add('finish');
                todoListItem.classList.remove('check');
                completeCheck();
            }
        });

        todoContent.appendChild(checkbox);
        todoContent.appendChild(textSpan);

        todoListItem.appendChild(todoContent);
        todoListItem.appendChild(completeButton);
        todoListItem.appendChild(deleteButton);
        list.appendChild(todoListItem);
    })

    return list;
}