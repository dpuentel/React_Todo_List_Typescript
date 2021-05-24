import * as JsStore from 'jsstore';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';
import { Todo } from '../../components/todo-list/model/Todo';
declare var require: any;

const getWorkerPath = () => {
  //if (environment.production) {
  //return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
  //} else {
  return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js');
  //}
};

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.
export const idbCon = new JsStore.Connection(new Worker(getWorkerPath().default));
export const dbname = 'todo_app';

const getDatabase = () => {
  const tblTodo: ITable = {
    name: 'Todo',
    columns: {
      id: {
        notNull: true,
        dataType: DATA_TYPE.Object,
        unique: true,
      },
      uuid: {
        notNull: true,
        dataType: DATA_TYPE.String,
        unique: true,
        primaryKey: true,
      },
      task: {
        notNull: true,
        dataType: DATA_TYPE.String,
      },
      completed: {
        notNull: true,
        dataType: DATA_TYPE.Boolean,
        enableSearch: true,
      },
      completedAt: {
        dataType: DATA_TYPE.Number,
        notNull: false,
      },
      createdAt: {
        dataType: DATA_TYPE.Number,
        notNull: true,
        //default: 'male',
      },
      workingTime: {
        dataType: DATA_TYPE.Number,
        notNull: false,
      },
      workingStartTime: {
        dataType: DATA_TYPE.Number,
        notNull: false,
      },
      workingEndTime: {
        dataType: DATA_TYPE.Number,
        notNull: false,
      },
      started: {
        dataType: DATA_TYPE.Boolean,
        notNull: false,
      },
      notes: {
        dataType: DATA_TYPE.String,
        notNull: false,
      },
      parentId: {
        dataType: DATA_TYPE.String,
        notNull: false,
      },
    },
  };
  const dataBase: IDataBase = {
    name: dbname,
    tables: [tblTodo],
  };
  return dataBase;
};

function getAvailableTodo() {
  const availableTodo: Todo[] = [new Todo('Task example')];
  return availableTodo;
}

export const initJsStore = async () => {
  const dataBase = getDatabase();
  const isDbCreated = await idbCon.initDb(dataBase);
  if (isDbCreated) {
    idbCon.insert({
      into: 'Todo',
      values: getAvailableTodo(),
    });
  }
};
