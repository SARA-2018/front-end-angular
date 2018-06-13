export class Message {

    private text: string;
    private date: Date;

    constructor(text: string) {
        this.text = text;
        this.date = new Date();
    }

    getText(): string {
        return this.text;
    }

    getDate(): Date {
        return this.date;
    }
}
