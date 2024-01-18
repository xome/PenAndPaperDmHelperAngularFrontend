import {Record} from "./record";
export class BackgroundMusic implements Record {
    private _name: string;
    private _data: string;

    constructor(name: string, data: string) {
      this._name = name;
      this._data = data;
    }

    get name(): string {
      return this._name;
    }

    set name(value: string) {
      this._name = value;
    }

    get data(): string {
      return this._data;
    }

    set data(value: string) {
      this._data = value;
    }
}
