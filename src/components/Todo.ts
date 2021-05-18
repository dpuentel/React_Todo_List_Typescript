import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string;
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
    this.id = uuidv4();
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
    return todo;
  }
}
