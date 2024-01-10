namespace dmHelper {
  export class Chapter {

    private _name: string;
    private _subheader: string;
    private _approximateDurationInMinutes: number;
    private _records: [Record];


    constructor(name: string, subheader: string, approximateDurationInMinutes: number, records: [Record]) {
      this._name = name;
      this._subheader = subheader;
      this._approximateDurationInMinutes = approximateDurationInMinutes;
      this._records = records;
    }


    get name(): string {
      return this._name;
    }

    get subheader(): string {
      return this._subheader;
    }

    get approximateDurationInMinutes(): number {
      return this._approximateDurationInMinutes;
    }

    get records(): [Record] {
      return this._records;
    }


    set name(value: string) {
      this._name = value;
    }

    set subheader(value: string) {
      this._subheader = value;
    }

    set approximateDurationInMinutes(value: number) {
      this._approximateDurationInMinutes = value;
    }

    set records(value: [Record]) {
      this._records = value;
    }
  }
}
