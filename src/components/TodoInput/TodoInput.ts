import "./TodoInput.css";

export function createTodoInput(onSubmitTodo: (value: string) => void): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    input.id = 'todo-input';
    input.classList.add('todo-input')

    function handleFocus() {
        input.classList.add('focused');
    };

    function handleBlur() {
        input.classList.remove('focused');
    };

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const value = input.value.trim();
            if (value) {
                onSubmitTodo(value);
                input.value = '';
                console.log('todo 등록');
            };
        };
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur)
    input.addEventListener('keydown', handleKeyDown);

    return input;
}