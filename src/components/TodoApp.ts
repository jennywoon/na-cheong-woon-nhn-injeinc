import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

export function createTodoApp(): HTMLDivElement {
    const todoInput = createTodoInput((value: string) => {
        console.log('value', value);
    });
    
    const todoList = createTodoList();

    const app = document.createElement('div');
    app.appendChild(todoInput);
    app.appendChild(todoList);

    return app;
}