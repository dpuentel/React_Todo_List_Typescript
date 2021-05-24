import { Todo } from '../model/Todo';
import { TodoId } from '../model/value-object/todo-id';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  toogleTodoCompleted: (todoId: TodoId) => void;
  removeTodo: (todo: Todo) => void;
}

export function TodoList({ todos, toogleTodoCompleted, removeTodo }: Props) {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id.get()} todo={todo} toogleTodoCompleted={toogleTodoCompleted} removeTodo={removeTodo} />
      ))}
    </ul>
  );
}
