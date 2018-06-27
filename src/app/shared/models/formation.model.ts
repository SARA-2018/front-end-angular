export class Formation {

    private _id: string;

    constructor() {

    }

    setId(id: string) {
        this._id = id;
    }

    getId(): string {
        return this._id;
    }
}
