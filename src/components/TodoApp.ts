import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

export function createTodoApp(): HTMLDivElement {
    const todos: { text: string, timestamp: number }[] = [];

    const todoInput = createTodoInput((value: string) => {
        const timestamp = Date.now();
        todos.unshift({ text: value, timestamp });
        const todoList = createTodoList(todos);

        const app = document.querySelector('.todo-app');
        if (app) {
            const existingList = app.querySelector('.todo-list');
            if (existingList) {
                app.replaceChild(todoList, existingList);
            } else {
                app.appendChild(todoList);
            }
        }
    });
    
    const app = document.createElement('div');
    app.classList.add('todo-app');
    app.appendChild(todoInput);


    return app;
}