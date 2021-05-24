import { Todo } from '../model/Todo';
import { TodoRepository } from '../model/TodoRepository';
import { TodoId } from '../model/value-object/todo-id';
import { BaseRepositoryJsStore } from './BaseRepositoryJsStore';
import { initJsStore } from './JsStore.service';

export class TodoRepositoryJsStore extends BaseRepositoryJsStore implements TodoRepository {
  private tableName = 'Todo';

  constructor() {
    super();
    this.init();
  }

  private async init() {
    await initJsStore();
    this.addUuidKeyToTodosOnInsert();
  }

  private addUuidKeyToTodosOnInsert() {
    this.connection.addMiddleware(function (request: { name: string; query: any }, next: () => void) {
      if (request.name === 'insert' && request.query.into === 'Todo') {
        let todosToInsert = request.query.values;
        for (let index = 0; index < todosToInsert.length; index++) {
          const todoToInsert = todosToInsert[index];
          todoToInsert.uuid = todoToInsert.id.id;
        }
      }
      next();
    });
  }

  async setAll(todos: Todo[]): Promise<void> {
    await this.deleteAll();
    for await (const todo of todos) {
      await this.set(todo);
    }
  }

  async set(todo: Todo): Promise<void> {
    try {
      await this.connection.insert<Todo>({
        into: this.tableName,
        return: true, // as id is autoincrement, so we would like to get the inserted value
        values: [todo],
      });
    } catch (error) {
      console.error('TodoRepositoryJsStore => set(todo)', error.message);
    }
  }

  async getAll(): Promise<Todo[]> {
    const storedTodos: Todo[] = await this.connection.select<Todo>({
      from: this.tableName,
      order: {
        by: 'createdAt',
        type: 'asc', //supprted sort type is - asc,desc
      },
    });
    let storedTodosTyped: Todo[] = [];

    if (storedTodos.length !== 0) {
      storedTodos.forEach((todo) => {
        let typedTodo: Todo = Todo.createFromUntypedObject(todo);
        storedTodosTyped.push(typedTodo);
      });
    }

    return storedTodosTyped;
  }

  async findById(todoId: TodoId): Promise<Todo | undefined> {
    let uuid = todoId.get();
    let result = await this.connection.select({
      from: this.tableName,
      where: {
        uuid: uuid,
      },
    });
    if (result && result.length) {
      return Todo.createFromUntypedObject(result[0] as Todo);
    } else {
      return undefined;
    }
  }

  async delete(todo: Todo): Promise<void> {
    let uuid = todo.id.get();
    try {
      await this.connection.remove({
        from: this.tableName,
        where: {
          uuid: uuid,
        },
      });
    } catch (error) {
      console.error('TodoRepositoryJsStore => delete(todo)', error.message);
    }
  }

  async deleteCompleted(): Promise<void> {
    // Can't read table by boolean so...
    let allTodos = await this.getAll();
    let completedTodos = allTodos.filter((todo: Todo) => todo.completed);
    for await (const todo of completedTodos) {
      await this.delete(todo);
    }
  }

  async setCompleted(todo: Todo): Promise<void> {
    let uuid = todo.id.get();
    try {
      await this.connection.update({
        in: this.tableName,
        set: {
          completed: todo.completed,
          completedAt: todo.completedAt,
        },
        where: {
          uuid: uuid,
        },
      });
    } catch (error) {
      console.error('TodoRepositoryJsStore => setCompleted(todo)', error.message);
    }
  }

  private async deleteAll() {
    try {
      await this.connection.remove({
        from: this.tableName,
      });
    } catch (error) {
      console.error('TodoRepositoryJsStore => deleteAll()', error.message);
    }
  }
}
