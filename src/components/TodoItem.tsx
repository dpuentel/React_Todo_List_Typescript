import React from 'react';
import { Todo } from './Todo';

interface Props {
  todo: Todo;
  toogleTodoCompleted: (id: string) => void;
  removeTodo: (id: string) => void;
}

export function TodoItem({ todo, toogleTodoCompleted, removeTodo }: Props) {
  const handleToogleTodoCompleted = () => {
    toogleTodoCompleted(todo.id);
  };

  const handleRemoveTodo = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    e.stopPropagation();
    removeTodo(todo.id);
  };

  const getTodoCreateDateFormated: () => string = () => {
    return todo.completedAt ? timestampToDateFormated(todo.createdAt) : '';
  };

  const getTodoCompletedDateFormated: () => string = () => {
    return todo.completedAt ? timestampToDateFormated(todo.completedAt) : '';
  };

  const timestampToDateFormated: (timestamp: number) => string = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <li className={todo.completed ? 'checked' : ''} onClick={handleToogleTodoCompleted}>
      <span className="todo-created-date"># {getTodoCreateDateFormated()}</span> <span>{todo.task}</span>
      {todo.completed && <span className="todo-completed-date">Completed at # {getTodoCompletedDateFormated()}</span>}
      <span className="close" onClick={handleRemoveTodo}>
        ×
      </span>
    </li>
  );
}
