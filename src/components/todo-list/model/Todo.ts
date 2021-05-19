import { TodoId } from './value-object/todo-id';

export class Todo {
  id: TodoId;
  task: string;
  completed: boolean;
  completedAt: number | undefined;
  createdAt: number;
  workingTime: number;
  workingStartTime!: number;
  woekingEndTime!: number;
  started: boolean;
  notes: string;
  parentId!: string;
  children: Todo[];

  constructor(task: string, parentId?: string) {
    this.id = TodoId.create();
    this.completed = false;
    this.createdAt = Date.now();
    this.workingTime = 0;
    this.started = false;
    this.notes = '';
    this.children = [];
    this.task = task;
    if (parentId) {
      this.parentId = parentId;
    }
  }

  static create(task: string) {
    return new Todo(task);
  }

  private setCompleted() {
    this.completed = true;
    this.completedAt = Date.now();
  }

  private setUncompleted() {
    this.completed = false;
    this.completedAt = undefined;
  }

  public toogleCompleted() {
    if (!this.completed) {
      this.setCompleted();
    } else {
      this.setUncompleted();
    }
  }

  static createFromUntypedObject(untypedObject: Todo) {
    let todo = new Todo(untypedObject.task);
    Object.assign(todo, untypedObject);
    todo.id = new TodoId(untypedObject.id.id);
    return todo;
  }
}
