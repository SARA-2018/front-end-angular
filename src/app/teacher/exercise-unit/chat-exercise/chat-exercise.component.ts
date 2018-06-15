import { Component, Input } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';
import { TrueOrFalseExercise } from './models/dicotomica-motor.model';
import { TextExercise} from './models/text-exercise.model';
import { MultipleChoise } from './models/multiple-choise.model';
import { FillExercise} from './models/fill-exercise.model';
import { MessageTypeEnumerator } from './message/message-type-enum';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  @Input('messages')
  public messages: Message[] = [];

  constructor() {

    this.messages.push(new Message('¡Hola Pelidiosa!', RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('Qué es lo que quieres?', RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('¿Sabe usted qué es lo que quiero?', RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('https://www.w3schools.com/html/pic_trulli.jpg', RolMessage.STUDENT, MessageTypeEnumerator.IMAGE));
  }


  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
  }
}
