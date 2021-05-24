import React, { Fragment } from 'react';
import { Todo } from '../model/Todo';

interface PropsTodoAdd {
  addTodo: (todo: Todo) => Promise<void>;
}

export class TodoAdd extends React.Component<PropsTodoAdd> {
  private todoTaskInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  getInputValue: () => string = () => {
    let value = '';
    if (this.isDefinedTodoTaskInput()) {
      value = this.todoTaskInputRef.current!.value;
    }
    return value;
  };

  clearInputValue: () => void = () => {
    if (this.isDefinedTodoTaskInput()) {
      this.todoTaskInputRef.current!.value = '';
    }
  };

  private isDefinedTodoTaskInput(): boolean {
    if (this.todoTaskInputRef && this.todoTaskInputRef.current) {
      return true;
    } else {
      return false;
    }
  }

  handleTodoAdd: () => void = () => {
    const task = this.getInputValue();
    if (task === '') return;

    this.props.addTodo(new Todo(task));

    this.clearInputValue();
  };

  render() {
    return (
      <Fragment>
        <input ref={this.todoTaskInputRef} type="text" placeholder="New task" />
        <button onClick={this.handleTodoAdd} className="addBtn">
          ➕
        </button>
      </Fragment>
    );
  }
}
