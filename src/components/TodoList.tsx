import { Todo } from './Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  toogleTodoCompleted: (id: string) => void;
  removeTodo: (id: string) => void;
}

export function TodoList({ todos, toogleTodoCompleted, removeTodo }: Props) {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} toogleTodoCompleted={toogleTodoCompleted} removeTodo={removeTodo} />
      ))}
    </ul>
  );
}
