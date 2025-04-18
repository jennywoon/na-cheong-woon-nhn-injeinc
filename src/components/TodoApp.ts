import { Todo } from "../types/todo";
import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

let idCounter = 0;

export function createTodoApp(): HTMLDivElement {
    const todos: Todo[] = [];

    const todoInput = createTodoInput((value: string) => {
        const timestamp = Date.now();
        todos.unshift({ id: idCounter++, text: value, isComplete: false, timestamp });
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