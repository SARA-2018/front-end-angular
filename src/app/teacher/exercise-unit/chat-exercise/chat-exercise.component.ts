import { Component } from '@angular/core';
import { TrueOrFalseExercise } from './models/trueOrFalseExercise.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  constructor() {
    // const TF: TrueOrFalseExercise = new TrueOrFalseExercise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion", "isCorrect": true, "justification": [] }] }');

  }
}
