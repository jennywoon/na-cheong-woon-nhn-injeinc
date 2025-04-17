import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

export function createTodoApp(): HTMLDivElement {
    const todos: string[] = [];

    const todoInput = createTodoInput((value: string) => {
        todos.unshift(value);
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