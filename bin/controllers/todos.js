import table from "text-table";
import { formatTanggal } from "../utils.js";
import boxen from "boxen";
import { ToDo } from "../model/todos.js";
import { updateData } from "../data.js";

export function addTodo(name) {
  const number = this.todos.length + 1;
  const todo = new ToDo(name, number);

  this.todos.push(todo);

  this.lookToDo();

  updateData("todos");
}

export function lookToDo() {
  const todoTable = [
    ["No.", "Name", "Tanggal", ""],
    ["", "", "", ""],
  ];

  this.todos.forEach((todo) => {
    const isComplete = todo.isComplete ? "[x]" : "[ ]";
    todoTable.push([
      todo.number,
      todo.name,
      formatTanggal(todo.date),
      isComplete,
    ]);
  });

  const t = table(todoTable);
  console.log(
    boxen(t, {
      padding: 1,
      title: `To Do`,
      titleAlignment: "center",
    })
  );
}

export function toggleTodo(number) {
  this.todos.forEach((todo) => {
    if (todo.number === number) todo.isComplete = !todo.isComplete;
  });

  this.lookToDo();
  updateData("todos");
}

export function resetTodos() {
  this.todos = [];

  updateData("todos");
}
