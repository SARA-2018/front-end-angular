import { Component } from '@angular/core';
import { TrueOrFalseExercise } from './models/true-or-false-exercise.model';
import {TextExercise} from './models/text-exercise.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']

})

export class ChatExerciseComponent {

  constructor() {
     const exercise: TextExercise = new TextExercise('{ "name":"¿En que año murio Cristobal Colon?", "solutions":[{ "text": "ayer", "isCorrect": true, "justification": [] }]}');

     const TF: TrueOrFalseExercise = new TrueOrFalseExercise('{ "name":"Prueba", "solutions":[ { "text": "Solucion", "isCorrect": true, "justification": [] }, { "text": "Solucion2", "isCorrect": true, "justification": [] }] }');
  }
}
