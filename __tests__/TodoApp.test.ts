import { createTodoApp } from "../src/components/TodoApp"

describe("createTodoApp", () => {
    let app: HTMLDivElement;

    // 테스트 시작 전 초기화
    beforeEach(() => {
        document.body.innerHTML = '';
        app = createTodoApp();
        document.body.appendChild(app);
    });

    test("처음 Todo 리스트는 비어 있다.", () => {
        const todoList = document.querySelector(".todo-list");
        const todoItems = Array.from(todoList?.children || []).filter(item => !item.classList.contains('todo-guide'));
        expect(todoItems.length).toBe(0);
    });

    test("Todo inpu 입력 시, Todo 리스트에 추가된다", () => {
        const input = app.querySelector("input") as HTMLInputElement;
        input.value = 'Test Todo Input';

        const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
        input.dispatchEvent(enterEvent);

        const todoList = document.querySelector(".todo-list");
        const todoItems = Array.from(todoList?.children || []).filter(item => !item.classList.contains('todo-guide'));
        expect(todoItems.length).toBe(1);
        expect(todoList?.textContent).toContain("Test Todo Input");
    });

    test("입력한 Todo를 클릭하여 완료 처리할 수 있다", () => {
        const input = app.querySelector("input") as HTMLInputElement;
        input.value = "Test Complete Toggle";
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

        setTimeout(() => {
            const todoItem = document.querySelector('[data-id="0"]') as HTMLElement;
            if (todoItem) {
                todoItem.click();   
                expect(todoItem.classList.contains("completed")).toBe(true);
            }
        }, 0);
    });

    test("삭제 버튼 클릭시, 해당되는 Todo 아이템을 삭제 한다.", () => {
        const input = app.querySelector("input") as HTMLInputElement;
        input.value = "Test Clear Completed";
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

        const todoItem = document.querySelector(".todo-item") as HTMLElement;
        expect(todoItem).not.toBeNull();
        
        // 삭제 버튼 클릭
        const deleteButton = todoItem.querySelector("button") as HTMLButtonElement;
        deleteButton.click();

        const todoList = document.querySelector(".todo-list");
        expect(todoList?.children.length).toBe(0);
    });
});