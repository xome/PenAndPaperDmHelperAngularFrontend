namespace dmHelper {
  export class Picture implements Record {

    private _base64: string;
    private _fileFormat: string;
    private _isShareableWithGroup: boolean;


    constructor(base64: string, fileFormat: string, isShareableWithGroup: boolean) {
      this._base64 = base64;
      this._fileFormat = fileFormat;
      this._isShareableWithGroup = isShareableWithGroup;
    }

    get base64(): string {
      return this._base64;
    }

    set base64(value: string) {
      this._base64 = value;
    }

    get fileFormat(): string {
      return this._fileFormat;
    }

    set fileFormat(value: string) {
      this._fileFormat = value;
    }

    get isShareableWithGroup(): boolean {
      return this._isShareableWithGroup;
    }

    set isShareableWithGroup(value: boolean) {
      this._isShareableWithGroup = value;
    }
  }
}
