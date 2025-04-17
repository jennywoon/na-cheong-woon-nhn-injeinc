export function createTodoInput(){
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    input.id = 'todo-input';

    input.style.padding = '10px';
    input.style.border = '1px dotted #ff3a3a';
    input.style.outline = 'none';

    input.addEventListener('focus', () => {
        input.style.outline = '1px solid #ff3a3a';
    })

    input.addEventListener('blur', () => {
        input.style.outline = 'none';
    })

    return input;
}