// set up interface for each container
import { Containerable } from "./types";


export default abstract class Container implements Containerable {
    //this class sets up the container
    constructor(
        private _backgroundColor: string = 'white',
        private _borderColor: string = 'black',
        private _borderRadius: string = '0px',
        private _borderWidth: string = '1px',
        private _borderStyle: string = 'solid',
        private _zIndex: number = 0
    ){}

    public get attributes(): Partial<Containerable> {
        return {
            backgroundColor: this._backgroundColor,
            borderColor: this._borderColor,
            borderRadius: this._borderRadius,
            borderWidth: this._borderWidth,
            borderStyle: this._borderStyle,
            zIndex: this._zIndex
        }
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
    }
    public set backgroundColor(value: string) {
        this._backgroundColor = value;
    }

    public get borderColor(): string {
        return this._borderColor;
    }
    public set borderColor(value: string) {
        this._borderColor = value;
    }

    public get borderRadius(): string {
        return this._borderRadius;
    }
    public set borderRadius(value: string) {
        this._borderRadius = value;
    }

    public get borderWidth(): string {
        return this._borderWidth;
    }
    public set borderWidth(value: string) {
        this._borderWidth = value;
    }

    public get borderStyle(): string {
        return this._borderStyle;
    }
    public set borderStyle(value: string) {
        this._borderStyle = value;
    }

    public get zIndex(): number {
        return this._zIndex;
    }
    public set zIndex(value: number) {
        this._zIndex = value;
    }
}