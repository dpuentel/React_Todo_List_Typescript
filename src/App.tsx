import React from 'react';
import { TodoComponent } from './components/todo-list/application/TodoComponent';
import { TodoRepositoryJsStore } from './components/todo-list/infrastructure/TodoRepositoryJsStore';
import { TodoRepository } from './components/todo-list/model/TodoRepository';

/* export function App() {
  return <TodoComponent />;
} */

export class App extends React.Component {
  private todoRepository: TodoRepository;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.todoRepository = new TodoRepositoryJsStore();
  }
  render() {
    return <TodoComponent todoRepository={this.todoRepository} />;
  }
}
