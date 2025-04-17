export function createTodoList(): HTMLUListElement {
    const ul = document.createElement('ul');
    ul.id = 'todo-list';
    return ul;
}