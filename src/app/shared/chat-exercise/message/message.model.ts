import { RolMessage } from './rol-message.enum';
import { TypeMessage } from './type-message.enum';

export class Message {

    text: string;
    rol: RolMessage;
    type: TypeMessage;

    constructor(text: string, rol: RolMessage, type: TypeMessage) {
        this.text = text;
        this.rol = rol;
        this.type = type;
    }

    getText(): string {
        return this.text;
    }

    getRol(): RolMessage {
        return this.rol;
    }

    getType(): TypeMessage {
        return this.type;
    }
}
