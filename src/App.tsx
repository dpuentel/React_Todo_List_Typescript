import { Fragment, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoControl } from './components/TodoControl';
import './App.css';
import { Todo } from './components/Todo';

const LOCAL_STORAGE_KEY: string = 'todoApp.todos';

export function App() {
  const [todos, setTodos] = useState([new Todo('Tarea 1')]);

  useEffect(() => {
    let todosFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedTodos: Todo[] = todosFromStorage ? (JSON.parse(todosFromStorage) as Todo[]) : [];
    let storedTodosTyped: Todo[] = [];

    if (storedTodos.length !== 0) {
      storedTodos.forEach((todo) => {
        let typedTodo: Todo = Todo.createFromUntypedObject(todo);
        storedTodosTyped.push(typedTodo);
      });
    }

    if (storedTodosTyped) {
      setTodos(storedTodosTyped);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toogleTodoCompleted: (id: string) => void = (id: string) => {
    const newTodos = [...todos];
    const todoToComplete = newTodos.find((todo) => todo.id === id);
    if (todoToComplete) {
      todoToComplete.toogleCompleted();
      setTodos(newTodos);
    }
  };

  const removeTodo: (id: string) => void = (id: string) => {
    const todosToKeep = todos.filter((todo) => todo.id !== id);
    setTodos(todosToKeep);
  };

  return (
    <Fragment>
      <TodoControl todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} toogleTodoCompleted={toogleTodoCompleted} removeTodo={removeTodo} />
    </Fragment>
  );
}
