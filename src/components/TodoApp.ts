import { Todo } from "../types/todo";
import { createFooterInfoSection } from "./TodoFooterInfoSection";
import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

let idCounter = 0;

export function createTodoApp(): HTMLDivElement {
    let todos: Todo[] = [];

    const app = document.createElement('div');
    app.classList.add('todo-app');

    const footer = createFooterInfoSection(() => {
        toggleTodoComplete();
    });

    const renderTodoList = () => {
        const sorted = [...todos].sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'completed' ? 1 : -1;
            } 
            return b.timestamp - a.timestamp;
        });

        const list = createTodoList(sorted, toggleTodoCheck);
        const existingList = app.querySelector('.todo-list');
        if (existingList) {
            app.replaceChild(list, existingList);
        } else {
            app.insertBefore(list, footer);
        }
    };

    const toggleTodoCheck = (id: number) => {
        todos = todos.map((todo) => {
            if (todo.id === id){
                return { ...todo, status: todo.status === 'checked' ? '' : 'checked' };
            }
            return todo;
        });
        renderTodoList();
    };

    const toggleTodoComplete = () => {
        todos = todos.map((todo) => {
            if (todo.status === 'checked') {
                return { ...todo, status: 'completed' };
            }
            return todo;
        });
        renderTodoList();
    };

    const todoInput = createTodoInput((value: string) => {
        const timestamp = Date.now();
        todos.unshift({ 
            id: idCounter++, 
            text: value, 
            status: '',
            timestamp 
        });
        
        renderTodoList();
    });
    
    app.appendChild(todoInput);
    app.appendChild(footer);


    return app;
}