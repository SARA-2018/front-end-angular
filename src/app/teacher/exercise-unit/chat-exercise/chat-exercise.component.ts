import { Component, Input } from '@angular/core';
import { Message } from './message-item/message.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  @Input('messages')
  private messages: Message[] = [];

  constructor() {
    this.messages.push(new Message('¡Bienvenido pringaete!'));
    this.messages.push(new Message('Qué es lo que quieres?'));
  }
}
