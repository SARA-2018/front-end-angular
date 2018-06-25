export abstract class Interaction  {

    private id: string;

    getId(): string {
        return this.id;
    }

    setId(id: string) {
        this.id = id;
    }

    public abstract getText(): string;

    isExercise(): boolean {
        return false;
    }
}

