import { Todo } from './Todo';

interface Props {
  todos: Todo[];
}
export function TodoCountUncompleted({ todos }: Props) {
  const getUncompleatedTasks: () => number = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  return (
    <div>
      <b>{getUncompleatedTasks()}</b> tasks remain to be finished.
    </div>
  );
}
