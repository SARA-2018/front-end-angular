import { Interaction } from './interaction.model';

export class Video extends Interaction  {
    private _id: string;
    private url: string;
    private kind: string;

    constructor(url?: string) {
        super();
        this.url = url;
    }
    setId(id: string): Video {
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
    getId(): string {
        return this._id;
    }
    getUrl(): string {
        return this.url;
    }
}
