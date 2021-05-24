import React, { Fragment } from 'react';
import { Todo } from '../model/Todo';

interface Props {
  addTodo: (todo: Todo) => Promise<void>;
}

export function TodoAdd({ addTodo }: Props) {
  const todoTaskInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const getInputValue: () => string = () => {
    let value = '';
    if (todoTaskInputRef && todoTaskInputRef.current) {
      value = todoTaskInputRef.current.value;
    }
    return value;
  };

  const clearInputValue = () => {
    if (todoTaskInputRef && todoTaskInputRef.current) {
      todoTaskInputRef.current.value = '';
    }
  };

  const handleTodoAdd = () => {
    const task = getInputValue();
    if (task === '') return;

    addTodo(new Todo(task));

    clearInputValue();
  };

  return (
    <Fragment>
      <input ref={todoTaskInputRef} type="text" placeholder="New task" />
      <button onClick={handleTodoAdd} className="addBtn">
        ➕
      </button>
    </Fragment>
  );
}
