import { Todo } from "../types/todo";
import { createFooterInfoSection } from "./TodoFooterInfoSection";
import { createTodoInput } from "./TodoInput";
import { createTodoList } from "./TodoList";

let idCounter = 0;

export function createTodoApp(): HTMLDivElement {
    let todos: Todo[] = [];
    let currentFilter: 'all' | 'completed' = 'all';

    const app = document.createElement('div');
    app.classList.add('todo-app');

    const footer = createFooterInfoSection(
        () => {
            toggleTodoComplete();
        },
        () => {
            todos = todos.map(todo => 
                todo.status === 'completed' ? { ...todo, status: '' } : todo
            )
            renderTodoList();
        }, 
        () => todos.filter(todo => todo.status !== 'completed').length,
        (filter) => {
            currentFilter = filter;
            renderTodoList();
        }
    );

    const renderTodoList = () => {
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'completed') return todo.status === 'completed';
            return true;
        });

        const sorted = [...filteredTodos].sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') {
                return 1;
            } else if (a.status !== 'completed' && b.status === 'completed') {
                return -1
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
        footer.updateCount()
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