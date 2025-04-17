export function createTodoList(todos: string[]): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    list.style.listStyleType = 'none';
    list.style.padding = '0 15px';

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');

        const textNode = document.createTextNode(todo);
        todoListItem.appendChild(textNode);

        todoListItem.style.borderBottom = '1px solid #ddd';
        todoListItem.style.padding = '10px';
        todoListItem.style.fontWeight = '600';
        todoListItem.style.cursor = 'pointer';

        todoListItem.addEventListener('click', () => {
            todoListItem.classList.toggle('check');
            if (todoListItem.classList.contains('check')) {
                todoListItem.style.color = '#a4a4a4';
                todoListItem.style.textDecoration = 'line-through';
            } else {
                todoListItem.style.color = '';
                todoListItem.style.textDecoration = 'none';
            }
        });

        list.appendChild(todoListItem);
    })

    return list;
}