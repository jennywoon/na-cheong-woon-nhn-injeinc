import "./TodoInput.css";

export function createTodoInput(onSubmitTodo: (value: string) => void): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    input.id = 'todo-input';
    input.classList.add('todo-input')

    input.addEventListener('focus', () => {
        input.classList.add('focused');
    })

    input.addEventListener('blur', () => {
        input.classList.remove('focused');
    })

    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const value = input.value.trim();
            if(value){
                onSubmitTodo(value);
                input.value = '';
                console.log('todo 등록');
            };
        };
    });

    return input;
}