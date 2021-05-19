import { v4 as uuidv4 } from 'uuid';

export class TodoId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static create(): TodoId {
    return new TodoId(uuidv4());
  }

  get(): string {
    return this.id;
  }

  equalsTo(todoId: TodoId): boolean {
    return this.id === todoId.get();
  }
}
