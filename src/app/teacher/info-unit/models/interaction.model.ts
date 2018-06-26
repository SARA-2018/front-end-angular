export abstract class Interaction  {

    private _id: string;

    getId(): string {
        return this._id;
    }

    setId(id: string) {
        this._id = id;
    }

    public abstract getText(): string;

    isExercise(): boolean {
        return false;
    }
}

