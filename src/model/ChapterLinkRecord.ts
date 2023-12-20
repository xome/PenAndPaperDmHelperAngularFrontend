class ChapterLinkRecord implements ChapterRecord {
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
