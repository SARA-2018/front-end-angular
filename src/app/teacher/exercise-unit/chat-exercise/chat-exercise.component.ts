import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';

import { Exercise } from '../../shared/exercise.model';
import { Solution } from '../../shared/solution.model';
import { Justification } from '../../shared/justification.model';
import { MessageTypeEnumerator } from './message/message-type-enum';
import { WelcomeMotor } from './models/welcome-motor.model';
import { TextMotor } from './models/text-motor.model';
import { MultipleChoiseMotor } from './models/multiple-choise-motor.model';
import { ExerciseMotor } from './models/exercise-motor.model';
import { DicotomicMotor } from './models/dicotomic-motor.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']
})

export class ChatExerciseComponent implements OnInit {

  @Input('messages')
  public messages: Message[] = [];
  private exercise: Exercise;
  private exerciseMotor: ExerciseMotor;

  constructor() {
  }

  ngOnInit() {
    const welcome = new WelcomeMotor();
    this.print(welcome.welcomeMessage());
    // GET Peticion
    const json = '{ "name":"¿Cuándo se descubrió América ?", "solutions":[ { "text": "2018", "isCorrect": false, "justifications": [ {"text": " Justificacion1", "isCorrect": true}, {"text": " Justificacion2", "isCorrect": true} ] }, { "text": "1492 ", "isCorrect": true, "justifications": [ ] },{ "text": "No se ha descubierto", "isCorrect": false, "justifications": [ ] }, { "text": "1742", "isCorrect": false, "justifications": [ ] },{ "text": "Solucion5", "isCorrect": true, "justifications": [ ] }, { "text": "Solucion6", "isCorrect": true, "justifications": [ ] }] }';
    const json2 = '{ "name":"Completa la frase", "solutions":[ { "text": "Cristobal Colon fue un héroe", "isCorrect": true, "justifications": [ {"text": " Justificacion1", "isCorrect": true}, {"text": " Justificacion2", "isCorrect": true} ] }, { "text": "Cristobal Colon fue un héroe", "isCorrect": true, "justifications": [ ] },{ "text": "Antonio Colon", "isCorrect": false, "justifications": [ ] }, { "text": "Cristobal Colon fue un héroe", "isCorrect": true, "justifications": [ ] },{ "text": "Cristobal Colon fue un héroe", "isCorrect": true, "justifications": [ ] }, { "text": "Cristobal Colon fue un héroe", "isCorrect": true, "justifications": [ ] }] }';
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
    this.generateExerciseTextMotor();
  }

  nextExercise() {
    if (this.exerciseMotor.getOvercome()) {
      if (this.exerciseMotor instanceof TextMotor) {
        this.generateDicotomicMotor();
      } else if (this.exerciseMotor instanceof DicotomicMotor) {
        this.generateExerciseMultipleMotor();
      }
    }
  }

  generateDicotomicMotor() {
    const motor = new DicotomicMotor(this.exercise);
    this.exerciseMotor = motor;
    this.print(motor.handMessage());
  }

  generateExerciseMultipleMotor() {
    const text = new MultipleChoiseMotor(this.exercise);
    this.exerciseMotor = text;
    this.print(text.handMessage());
    /*const sol = '2,5,6';
    const res = sol.split(',');
    const solutions: Solution[] = [];
    for (let i = 0; i < this.exercise.getSolutions().length; i++) {
      solutions.push(new Solution(this.exercise.getSolutions()[i].getText(), false));
    }
    for (const r of res) {
      solutions[Number(r) - 1].setIsCorrect(true);
    }
    this.print(text.handResponse(solutions));
    */
  }

  generateExerciseTextMotor() {
    const textMotor = new TextMotor(this.exercise);
    this.exerciseMotor = textMotor;
    this.print(this.exerciseMotor.handMessage());
  }

  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
    const studentSolution: Solution[] = [];
    studentSolution.push(new Solution(text, false));
    this.print(this.exerciseMotor.handResponse(studentSolution));
    this.nextExercise();
  }

  print(strings: string[]) {
    for (const string of strings) {
      this.messages.push(new Message(string, RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    }
  }
}
