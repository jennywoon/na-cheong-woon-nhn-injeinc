export function createTodoList(todos: string[]): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('todo-list');
    
    todos.forEach(todo => {
        const todoListItem = document.createElement('li');
        todoListItem.textContent = todo;
        list.appendChild(todoListItem);
    })

    return list;
}