import { Todo } from '../../components/todo-list/model/Todo';
import { TodoRepository } from '../../components/todo-list/model/TodoRepository';
import { TodoId } from '../../components/todo-list/model/value-object/todo-id';

export class TodoRepositoryLocalStorage implements TodoRepository {
  private LOCAL_STORAGE_KEY: string = 'todoApp.todos';
  async findById(todoId: TodoId): Promise<Todo | undefined> {
    console.log(todoId);
    return new Todo('test');
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

  async set(todo: Todo) {
    return new Promise<void>((resolve) => {
      console.log(todo);
      resolve();
    });
  }

  async setCompleted(todo: Todo) {
    return new Promise<void>((resolve) => {
      console.log(todo);
      resolve();
    });
  }

  async delete(todo: Todo) {
    return new Promise<void>((resolve) => {
      console.log(todo);
      resolve();
    });
  }

  async deleteCompleted() {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}
