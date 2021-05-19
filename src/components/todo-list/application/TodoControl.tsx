import React from 'react';
import { TodoAdd } from './TodoAdd';
import { TodoRemoveCompleted } from './TodoRemoveCompleted';
import { TodoCountUncompleted } from './TodoCountUncompleted';
import { Todo } from '../model/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoControl({ todos, setTodos }: Props) {
  return (
    <div id="myDIV" className="header">
      <h2>To Do List</h2>
      <TodoAdd setTodos={setTodos} />
      <TodoRemoveCompleted todos={todos} setTodos={setTodos} />
      <TodoCountUncompleted todos={todos} />
    </div>
  );
}
