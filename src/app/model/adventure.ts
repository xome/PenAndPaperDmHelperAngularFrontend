import {Chapter} from "./chapter";

export class Adventure {
  private _name: string;
  private _chapters: Chapter[];

  constructor(name: string, chapters: Chapter[]) {
    this._name = name;
    this._chapters = chapters;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get chapters(): Chapter[] {
    return this._chapters;
  }

  set chapters(value: Chapter[]) {
    this._chapters = value;
  }
}
