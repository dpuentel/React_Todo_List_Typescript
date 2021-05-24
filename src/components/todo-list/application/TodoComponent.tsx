import { Fragment, useEffect, useState } from 'react';
import { TodoList } from '../application/TodoList';
import { TodoControl } from '../application/TodoControl';
import '../../../App.css';
import { Todo } from '../model/Todo';
import { TodoId } from '../model/value-object/todo-id';
import { TodoRepository } from '../model/TodoRepository';

interface PropsTodoComponent {
  todoRepository: TodoRepository;
}

export function TodoComponent({ todoRepository }: PropsTodoComponent) {
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

  const addTodo: (todo: Todo) => Promise<void> = async (todoToSave: Todo) => {
    await todoRepository.set(todoToSave);
    const todosToSave = [...todos, todoToSave];
    setTodos(todosToSave);
  };

  const toogleTodoCompleted: (todoId: TodoId) => Promise<void> = async (todoId: TodoId) => {
    const newTodos = [...todos];
    const todoToComplete = newTodos.find((todo) => todoId.equalsTo(todo.id));
    if (todoToComplete) {
      todoToComplete.toogleCompleted();
      await todoRepository.setCompleted(todoToComplete);
      setTodos(newTodos);
    }
  };

  const removeTodo: (todo: Todo) => Promise<void> = async (todoToRemove: Todo) => {
    await todoRepository.delete(todoToRemove);
    const todosToKeep = todos.filter((todo) => todo.id.get() !== todoToRemove.id.get());
    setTodos(todosToKeep);
  };

  const deleteCompleted: () => Promise<void> = async () => {
    await todoRepository.deleteCompleted();
    const newTodos = todos.filter((todo: Todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <TodoControl todos={todos} deleteCompleted={deleteCompleted} addTodo={addTodo} />
      <TodoList todos={todos} toogleTodoCompleted={toogleTodoCompleted} removeTodo={removeTodo} />
    </Fragment>
  );
}
