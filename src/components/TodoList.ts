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

        list.appendChild(todoListItem);
    })

    return list;
}