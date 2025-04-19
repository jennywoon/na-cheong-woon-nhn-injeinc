import { createTodoApp } from "../src/components/TodoApp"

describe("createTodoApp", () => {
    let app: HTMLDivElement;

    // 테스트 시작 전 초기화
    beforeEach(() => {
        app = createTodoApp();
        document.body.innerHTML = '';
        document.body.appendChild(app);
    });

    test("처음 Todo 리스트는 비어 있다.", () => {
        const todoList = document.querySelector(".todo-list");
        expect(todoList?.children.length).toBe(0);
    });

    test("Todo inpu 입력 시, Todo 리스트에 추가된다", () => {
        const input = app.querySelector("input") as HTMLInputElement;
        input.value = 'Test Todo Input';

        const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
        input.dispatchEvent(enterEvent);

        const todoList = document.querySelector(".todo-list");
        expect(todoList?.children.length).toBe(1);
        expect(todoList?.textContent).toContain("Test Todo Input");
    })
});