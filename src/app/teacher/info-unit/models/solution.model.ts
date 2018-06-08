import { Justification } from './justification.model';

export class Solution {
    private _id: number;
    private isCorrect: boolean;
    private text: string;
    private justifications: Justification[];

    constructor(text: string, isCorrect: boolean) {
        this.text = text;
        this.isCorrect = isCorrect;
        this.justifications = [];
    }

    setId(id: number) {
        this._id = id;
    }
    setIsCorrect(isCorrect: boolean) {
        this.isCorrect = isCorrect;
    }
    setText(text: string) {
        this.text = text;
    }
    setJustifications(justifications: Justification[]) {
        this.justifications = justifications;
    }
    getId(): number {
        return this._id;
    }
    getIsCorrect(): boolean {
        return this.isCorrect;
    }
    getText(): string {
        return this.text;
    }
    getJustifications(): Justification[] {
        return this.justifications;
    }
}
