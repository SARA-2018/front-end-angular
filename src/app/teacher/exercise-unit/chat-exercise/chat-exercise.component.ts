import { Component, Input } from '@angular/core';
import { Message } from './message-item/message.model';
import { RolMessage } from './message-item/rol-message.enum';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  @Input('messages')
  private messages: Message[] = [];

  constructor() {
    this.messages.push(new Message('¡Bienvenido pringaete!', RolMessage.TEACHER));
    this.messages.push(new Message('Qué es lo que quieres?', RolMessage.STUDENT));
    this.messages.push(new Message('¿Sabe usted qué es lo que quiero?', RolMessage.TEACHER));
    this.messages.push(new Message('¡¡ LA TARJETA DEL HORMIGUERO !!', RolMessage.STUDENT));
  }
}
