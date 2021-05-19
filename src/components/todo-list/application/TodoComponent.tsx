import { Fragment, useEffect, useState } from 'react';
import { TodoList } from '../application/TodoList';
import { TodoControl } from '../application/TodoControl';
import '../../../App.css';
import { Todo } from '../model/Todo';
import { TodoId } from '../model/value-object/todo-id';
import { TodoRepositoryLocalStorage } from '../infrastructure/TodoRepositoryLocalStorage';
import { TodoRepository } from '../model/TodoRepository';

export function TodoComponent() {
  const todoRepository: TodoRepository = new TodoRepositoryLocalStorage();

  const [todos, setTodos] = useState([new Todo('Tarea 1')]);

  useEffect(() => {
    // Create an scoped async function in the hook to can use await.
    async function loadTodos() {
      let storedTodos = await todoRepository.getAll();
      if (storedTodos) {
        setTodos(storedTodos);
      }
    }
    // Execute the created function directly.
    loadTodos();
  }, []);

  useEffect(() => {
    async function saveTodos(todosToSave: Todo[]) {
      await todoRepository.setAll(todosToSave);
    }
    saveTodos(todos);
  }, [todos]);

  const toogleTodoCompleted: (todoId: TodoId) => void = (todoId: TodoId) => {
    const newTodos = [...todos];
    const todoToComplete = newTodos.find((todo) => todoId.equalsTo(todo.id));
    if (todoToComplete) {
      todoToComplete.toogleCompleted();
      setTodos(newTodos);
    }
  };

  const removeTodo: (id: string) => void = (id: string) => {
    const todosToKeep = todos.filter((todo) => todo.id.get() !== id);
    setTodos(todosToKeep);
  };

  return (
    <Fragment>
      <TodoControl todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} toogleTodoCompleted={toogleTodoCompleted} removeTodo={removeTodo} />
    </Fragment>
  );
}
