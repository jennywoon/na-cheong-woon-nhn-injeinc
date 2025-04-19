import { FilterType, Todo } from "../types/todo";
import { setStyles } from "../utils/setStyles";
import { createFooterInfoSection } from "./TodoFooterInfoSection/TodoFooterInfoSection";
import { createTodoInput } from "./TodoInput/TodoInput";
import { createTodoList } from "./TodoList/TodoList";

let idCounter = 0;

export function createTodoApp(): HTMLDivElement {
    let todos: Todo[] = [];
    let currentFilter: FilterType = 'all'; 

    const app = document.createElement('div');
    app.classList.add('todo-app');

    setStyles(app, {
        border: '3px solid #959595',
        padding: '20px',
        maxWidth: '780px'
    })

    const footer = createFooterInfoSection(
        () => {
            todos = todos.filter(todo => !todo.isCompleted);
            renderTodoList();
        }, 
        () => todos.filter(todo => !todo.isCompleted).length,
        () => todos.filter(todo => todo.isCompleted).length,
        (filter) => {
            currentFilter = filter;
            renderTodoList();
        },
    );

    const renderTodoList = () => {
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') {
                return !todo.isCompleted;
            }
            if (currentFilter === 'completed') {
                return todo.isCompleted;
            }
            return true;
        });

        const sorted = [...filteredTodos].sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
            }
            return b.timestamp - a.timestamp;
        });

        const list = createTodoList(sorted, toggleTodoComplete);
        const existingList = app.querySelector('.todo-list');
        if (existingList) {
            app.replaceChild(list, existingList);
        } else {
            app.insertBefore(list, footer);
        }
        footer.updateCount()
    };

    const toggleTodoComplete = (id: number) => {
        todos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
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
            isCompleted: false,
            timestamp 
        });
        
        renderTodoList();
    });
    
    app.appendChild(todoInput);
    app.appendChild(footer);


    return app;
}