import React from 'react';
import { TodoAdd } from './TodoAdd';
import { TodoRemoveCompleted } from './TodoRemoveCompleted';
import { TodoCountUncompleted } from './TodoCountUncompleted';
import { Todo } from '../model/Todo';

interface PropsTodoControl {
  todos: Todo[];
  deleteCompleted: () => Promise<void>;
  addTodo: (todo: Todo) => Promise<void>;
}

export class TodoControl extends React.Component<PropsTodoControl> {
  render() {
    return (
      <div id="myDIV" className="header">
        <h2>To Do List</h2>
        <TodoAdd addTodo={this.props.addTodo} />
        <TodoRemoveCompleted deleteCompleted={this.props.deleteCompleted} />
        <TodoCountUncompleted todos={this.props.todos} />
      </div>
    );
  }
}
