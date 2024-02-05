import {Record} from "./record";
import {Chapter} from "./chapter";
export class ChapterLink implements Record {
  private _chapterTo: Chapter;

  constructor(chapterTo: Chapter) {
    this._chapterTo = chapterTo;
  }

  get chapterTo(): Chapter {
    return this._chapterTo;
  }

  set chapterTo(value: Chapter) {
    this._chapterTo = value;
  }
}
