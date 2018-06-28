import { Component, Input, OnChanges } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';

import { Exercise } from '../models/exercise.model';
import { AutoMessageMotor } from './models/auto-message-motor.model';
import { TextMotor } from './models/text-motor.model';
import { MultipleChoiseMotor } from './models/multiple-choise-motor.model';
import { ExerciseMotor } from './models/exercise-motor.model';
import { DicotomicMotor } from './models/dicotomic-motor.model';
import { FillBlankMotor } from './models/fill-blank-motor.model';
import { TypeMessage } from './message/type-message.enum';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']
})

export class ChatExerciseComponent implements OnChanges {

  @Input('messages')
  public messages: Message[] = [];
  private exerciseMotor: ExerciseMotor;
  text = '';
  @Input() exercise: Exercise;
  private motors: ExerciseMotor[] = [];

  constructor() { }


  ngOnChanges() {
    this.motors = [new TextMotor(this.exercise),
    new DicotomicMotor(this.exercise),
    new MultipleChoiseMotor(this.exercise),
    new FillBlankMotor(this.exercise)];
    this.messages = [];
    this.messages.push(new Message('../../../assets/chat-image.jpg',
      RolMessage.TEACHER, TypeMessage.IMAGE));
    this.print(new AutoMessageMotor().welcomeMessage());
    this.nextExercise();
  }

  nextExercise() {
    let i = 0;
    while (i < this.motors.length && this.motors[i].getOvercome()) {
      i++;
    }
    if (i < this.motors.length) {
      if (!this.motors[i].getOvercome()) {
        this.updateMotor(this.motors[i]);
      }
    } else {
      this.print(new AutoMessageMotor().statisticsMessage(this.exercise));
      this.print(new AutoMessageMotor().goodbyeMessage());
    }
  }

  updateMotor(exerciseMotor: ExerciseMotor) {
    this.exerciseMotor = exerciseMotor;
    this.print(this.exerciseMotor.handMessage());
  }

  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT, TypeMessage.TEXT));
    this.print(this.exerciseMotor.handResponse(text));
    this.nextExercise();
    this.text = '';
  }

  print(strings: string[]) {
    for (const string of strings) {
      this.messages.push(new Message(string, RolMessage.TEACHER, TypeMessage.TEXT));
    }
  }
}
