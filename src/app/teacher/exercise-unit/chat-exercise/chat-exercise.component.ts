import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';
import { Exercise } from '../../shared/exercise.model';
import { Solution } from '../../shared/solution.model';
import { Justification } from '../../shared/justification.model';
import { MessageTypeEnumerator } from './message/message-type-enum';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent implements OnInit {

  @Input('messages')
  public messages: Message[] = [];
  private exercise: Exercise;

  constructor() {

    this.messages.push(new Message('¡Hola Pelidiosa!', RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('Qué es lo que quieres?', RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('¿Sabe usted qué es lo que quiero?', RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    this.messages.push(new Message('https://www.w3schools.com/html/pic_trulli.jpg', RolMessage.STUDENT, MessageTypeEnumerator.IMAGE));
  }

  ngOnInit() {
    // GET Peticion
    const json = '{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justifications": [ {"text": " Justificacion1", "isCorrect": true}, {"text": " Justificacion2", "isCorrect": true} ] }, { "text": "Solucion2", "isCorrect": true, "justifications": [ ] },{ "text": "Solucion3", "isCorrect": true, "justifications": [ ] }, { "text": "Solucion4", "isCorrect": true, "justifications": [ ] },{ "text": "Solucion5", "isCorrect": true, "justifications": [ ] }, { "text": "Solucion6", "isCorrect": true, "justifications": [ ] }] }';
    this.createModels(json);
  }

  createModels(json: string) {
    const objJson = JSON.parse(json);
    this.exercise = new Exercise(objJson.name);
    if (objJson.solutions.length > 0) {
      for (let i = 0; i < objJson.solutions.length; i++) {
        const solution = new Solution(objJson.solutions[i].text, objJson.solutions[i].isCorrect);
        if (objJson.solutions[i].justifications.length > 0 ) {
          for (let j = 0; j < objJson.solutions[i].justifications.length; j++) {
            solution.addJustification(new Justification(objJson.solutions[i].justifications[j].text,
              objJson.solutions[i].justifications[j].isCorrect));
          }
        }
        this.exercise.addSolution(solution);
      }
    }
  }

  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
  }
}
