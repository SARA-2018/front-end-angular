import { RolMessage } from './rol-message.enum';

export class Message {

    private text: string;
    private date: Date;
    private rol: RolMessage;

    constructor(text: string, rol: RolMessage) {
        this.text = text;
        this.date = new Date();
        this.rol = rol;
    }

    getText(): string {
        return this.text;
    }

    getDate(): Date {
        return this.date;
    }

    getRol(): RolMessage {
        return this.rol;
    }
}
