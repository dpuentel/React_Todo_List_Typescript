import { Todo } from './Todo';
import { TodoId } from './value-object/todo-id';

export interface TodoRepository {
  findById(todoId: TodoId): Promise<Todo[]>;
  getAll(): Promise<Todo[]>;
  setAll(todos: Todo[]): Promise<void>;
}
