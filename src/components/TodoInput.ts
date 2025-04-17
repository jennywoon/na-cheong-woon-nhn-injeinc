export function createTodoInput(onSubmitTodo: (value: string) => void): HTMLInputElement {
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

    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const value = input.value.trim();
            if(value){
                onSubmitTodo(value);
                input.value = '';
            };
        };
    });

    return input;
}