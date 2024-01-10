namespace dmHelper {
  export class EnvironmentLightning implements Record {


    private _rgb: [number, number, number];
    private _brightness: number;

    constructor(rgb: [number, number, number], brightness: number) {
      this._rgb = rgb;
      this._brightness = brightness;
    }

    get rgb(): [number, number, number] {
      return this._rgb;
    }

    set rgb(value: [number, number, number]) {
      this._rgb = value;
    }

    get brightness(): number {
      return this._brightness;
    }

    set brightness(value: number) {
      this._brightness = value;
    }
  }
}
