import { Todo } from '../model/Todo';
import { TodoRepository } from '../model/TodoRepository';
import { TodoId } from '../model/value-object/todo-id';

export class TodoRepositoryLocalStorage implements TodoRepository {
  private LOCAL_STORAGE_KEY: string = 'todoApp.todos';
  async findById(todoId: TodoId): Promise<Todo[]> {
    console.log(todoId);
    return [new Todo('test')];
  }

  async getAll(): Promise<Todo[]> {
    let todosFromStorage = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const storedTodos: Todo[] = todosFromStorage ? (JSON.parse(todosFromStorage) as Todo[]) : [];
    let storedTodosTyped: Todo[] = [];

    if (storedTodos.length !== 0) {
      storedTodos.forEach((todo) => {
        let typedTodo: Todo = Todo.createFromUntypedObject(todo);
        storedTodosTyped.push(typedTodo);
      });
    }

    return storedTodosTyped;
  }

  async setAll(todos: Todo[]) {
    return new Promise<void>((resolve) => {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(todos));
      resolve();
    });
  }
}
