export function createTodoList(todos: string[]): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    list.style.listStyleType = 'none';
    list.style.padding = '0 15px';

    todos.forEach(todo => {
        const todoListItem = document.createElement('li');
        todoListItem.textContent = todo;

        todoListItem.style.borderBottom = '1px solid #ddd';
        todoListItem.style.padding = '10px';
        todoListItem.style.fontWeight = '600';
        todoListItem.style.cursor = 'pointer';

        todoListItem.addEventListener('click', () => {
            todoListItem.classList.toggle('check');
            if (todoListItem.classList.contains('check')) {
                todoListItem.style.backgroundColor = '#dcdcdc';
            } else {
                todoListItem.style.backgroundColor = '';
            }
        });

        list.appendChild(todoListItem);
    })

    return list;
}