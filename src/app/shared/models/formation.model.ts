export class Formation {

    private _id: string;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    setId(id: string) {
        this._id = id;
    }

    getId(): string {
        return this._id;
    }

    getName(): string {
        return this.name;
    }

    setName() {
        this.name = name;
    }
}
