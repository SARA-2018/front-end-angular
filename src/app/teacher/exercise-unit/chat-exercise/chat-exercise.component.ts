import { Component, Input } from '@angular/core';
import { Message } from './message-item/message.model';
import { RolMessage } from './message-item/rol-message.enum';
import { TrueOrFalseExercise } from './models/true-or-false-exercise.model';
import { TextExercise} from './models/text-exercise.model';
import { MultipleChoise } from './models/multiple-choise.model';
import { FillExercise} from './models/fill-exercise.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  @Input('messages')
  private messages: Message[] = [];

  constructor() {
    const TE: TextExercise = new TextExercise('{ "name":"¿En que año murio Cristobal Colon?", "solutions":[{ "text": "1506", "isCorrect": true, "justification": [] }]}');
    const TF: TrueOrFalseExercise = new TrueOrFalseExercise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion2", "isCorrect": true, "justification": [] }] }');
    const FE: FillExercise = new FillExercise('{ "name":"¿En que año murio __________ Colon?", "solutions":[ { "text": "Cristobal", "isCorrect": true, "justification": [] }, { "text": "Antonio", "isCorrect": false, "justification": [] }] }');
    const MC: MultipleChoise = new MultipleChoise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion2", "isCorrect": true, "justification": [] },{ "text": "Solucion3", "isCorrect": true, "justification": [] }, { "text": "Solucion4", "isCorrect": true, "justification": [] },{ "text": "Solucion5", "isCorrect": true, "justification": [] }, { "text": "Solucion6", "isCorrect": true, "justification": [] }] }');

    this.messages.push(new Message('¡Bienvenido pringaete!', RolMessage.TEACHER));
    this.messages.push(new Message('Qué es lo que quieres?', RolMessage.STUDENT));
    this.messages.push(new Message('¿Sabe usted qué es lo que quiero?', RolMessage.TEACHER));
    this.messages.push(new Message('¡¡ LA TARJETA DEL HORMIGUERO !!', RolMessage.STUDENT));
  }


  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT));
  }
}
