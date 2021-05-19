import React, { Fragment } from 'react';
import { Todo } from '../model/Todo';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoAdd({ setTodos }: Props) {
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

    setTodos((prevTodos: Todo[]) => {
      return [...prevTodos, new Todo(task)];
    });

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
