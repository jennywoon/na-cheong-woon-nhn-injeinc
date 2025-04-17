import { createTodoInput } from "./components/TodoInput";

const input = createTodoInput((value: string) => {
    console.log('value', value);
});

document.body.appendChild(input);