import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';
import { TrueOrFalseExercise } from './models/true-or-false-exercise.model';
import { TextExercise } from './models/text-exercise.model';
import { MultipleChoise } from './models/multiple-choise.model';
import { FillExercise } from './models/fill-exercise.model';
import { Exercise } from '../../shared/exercise.model';
import { Solution } from '../../shared/solution.model';
import { Justification } from '../../shared/justification.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent implements OnInit {

  @Input('messages')
  private messages: Message[] = [];
  private exercise: Exercise;

  constructor() {
    // const TE: TextExercise = new TextExercise('{ "name":"¿En que año murio Cristobal Colon?", "solutions":[{ "text": "1506", "isCorrect": true, "justification": [] }]}');
    // const TF: TrueOrFalseExercise = new TrueOrFalseExercise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion2", "isCorrect": true, "justification": [] }] }');
    // const FE: FillExercise = new FillExercise('{ "name":"¿En que año murio __________ Colon?", "solutions":[ { "text": "Cristobal", "isCorrect": true, "justification": [] }, { "text": "Antonio", "isCorrect": false, "justification": [] }] }');
    // const MC: MultipleChoise = new MultipleChoise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion2", "isCorrect": true, "justification": [] },{ "text": "Solucion3", "isCorrect": true, "justification": [] }, { "text": "Solucion4", "isCorrect": true, "justification": [] },{ "text": "Solucion5", "isCorrect": true, "justification": [] }, { "text": "Solucion6", "isCorrect": true, "justification": [] }] }');

    this.messages.push(new Message('¡Bienvenido pringaete!', RolMessage.TEACHER));
    this.messages.push(new Message('Qué es lo que quieres?', RolMessage.STUDENT));
    this.messages.push(new Message('¿Sabe usted qué es lo que quiero?', RolMessage.TEACHER));
    this.messages.push(new Message('¡¡ LA TARJETA DEL HORMIGUERO !!', RolMessage.STUDENT));
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
    this.messages.push(new Message(text, RolMessage.STUDENT));
  }
}
