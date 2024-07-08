import {
  addTodo,
  lookToDo,
  resetTodos,
  toggleTodo,
} from "../controllers/todos.js";

export class ToDo {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
  date = new Date();
  isComplete = false;
}

export class ToDos {
  constructor(todos) {
    this.todos = todos;
  }

  addTodo = addTodo;

  lookToDo = lookToDo;

  toggleTodo = toggleTodo;

  resetTodos = resetTodos;
}
