import { Todo } from './Todo';
import { TodoId } from './value-object/todo-id';

export interface TodoRepository {
  findById(todoId: TodoId): Promise<Todo | undefined>;
  getAll(): Promise<Todo[]>;
  setAll(todos: Todo[]): Promise<void>;
  set(todo: Todo): Promise<void>;
  setCompleted(todo: Todo): Promise<void>;
  delete(todo: Todo): Promise<void>;
  deleteCompleted(): Promise<void>;
}
