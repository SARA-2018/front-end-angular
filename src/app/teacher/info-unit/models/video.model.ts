import { Interaction } from './interaction.model';

export class Video extends Interaction  {
    private _id: number;
    private url: string;
    private kind: string;

    constructor(url: string) {
        super();
        this.url = url;
    }
    setId(id: number): Video {
        this._id = id;
        return this;
    }
    setUrl(url: string): Video {
        this.url = url;
        return this;
    }
    setKind(kind: string) {
        this.kind = kind;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getUrl(): string {
        return this.url;
    }
}
