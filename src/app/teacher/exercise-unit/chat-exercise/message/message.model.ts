import { RolMessage } from './rol-message.enum';
import { MessageTypeEnumerator } from './message-type-enum';
export class Message {

    text: string;
    rol: RolMessage;
    type: MessageTypeEnumerator;

    constructor(text: string, rol: RolMessage, type: MessageTypeEnumerator) {
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
    getType(): MessageTypeEnumerator {
        return this.type;
    }
}
