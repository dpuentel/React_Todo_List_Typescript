import { idbCon } from './JsStore.service';

export class BaseRepositoryJsStore {
  get connection() {
    return idbCon;
  }
}
