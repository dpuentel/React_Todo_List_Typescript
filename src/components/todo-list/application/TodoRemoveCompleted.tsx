import React from 'react';
import { Todo } from '../model/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoRemoveCompleted({ todos, setTodos }: Props) {
  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo: Todo) => !todo.completed);
    setTodos(newTodos);
  };

  return <button onClick={handleClearCompleted}>➖ Clear completed tasks</button>;
}
