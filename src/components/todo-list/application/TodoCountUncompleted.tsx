import React from 'react';
import { Todo } from '../model/Todo';

interface PropsTodoCountUncompleted {
  todos: Todo[];
}

export class TodoCountUncompleted extends React.Component<PropsTodoCountUncompleted> {
  private getUncompleatedTasks(): number {
    return this.props.todos.filter((todo) => !todo.completed).length;
  }

  render() {
    return (
      <div>
        <b>{this.getUncompleatedTasks()}</b> tasks remain to be finished.
      </div>
    );
  }
}
