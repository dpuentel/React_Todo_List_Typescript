import { TodoAdd } from './TodoAdd';
import { TodoRemoveCompleted } from './TodoRemoveCompleted';
import { TodoCountUncompleted } from './TodoCountUncompleted';
import { Todo } from '../model/Todo';

interface Props {
  todos: Todo[];
  deleteCompleted: () => Promise<void>;
  addTodo: (todo: Todo) => Promise<void>;
}

export function TodoControl({ todos, deleteCompleted, addTodo }: Props) {
  return (
    <div id="myDIV" className="header">
      <h2>To Do List</h2>
      <TodoAdd addTodo={addTodo} />
      <TodoRemoveCompleted deleteCompleted={deleteCompleted} />
      <TodoCountUncompleted todos={todos} />
    </div>
  );
}
