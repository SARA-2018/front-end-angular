import { RolMessage } from './rol-message.enum';

export class Message {

    private text: string;
    private rol: RolMessage;

    constructor(text: string, rol: RolMessage) {
        this.text = text;
        this.rol = rol;
    }

    getText(): string {
        return this.text;
    }

    getRol(): RolMessage {
        return this.rol;
    }
}
