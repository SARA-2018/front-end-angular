import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Message } from './message/message.model';
import { RolMessage } from './message/rol-message.enum';

import { Exercise } from '../../shared/exercise.model';
import { Solution } from '../../shared/solution.model';
import { Justification } from '../../shared/justification.model';
import { MessageTypeEnumerator } from './message/message-type-enum';
import { AutoMessageMotor } from './models/auto-message-motor.model';
import { TextMotor } from './models/text-motor.model';
import { MultipleChoiseMotor } from './models/multiple-choise-motor.model';
import { ExerciseMotor } from './models/exercise-motor.model';
import { DicotomicMotor } from './models/dicotomic-motor.model';
import { FillBlankMotor } from './models/fill-blank-motor.model';

@Component({
  selector: 'app-chat-exercise',
  templateUrl: 'chat-exercise.component.html',
  styleUrls: ['chat-exercise.component.css']
})

export class ChatExerciseComponent implements OnChanges {

  @Input('messages')
  public messages: Message[] = [];
  private exerciseMotor: ExerciseMotor;
  private text = '';
  @Input() exercise: Exercise;

  constructor() {}

  ngOnChanges() {
    this.messages = [];
    this.print(new AutoMessageMotor().welcomeMessage());
    this.updateMotor(new TextMotor(this.exercise));
  }

  nextExercise() {
    if (this.exerciseMotor.getOvercome()) {
      if (this.exerciseMotor instanceof TextMotor) {
        this.updateMotor(new DicotomicMotor(this.exercise));
      } else if (this.exerciseMotor instanceof DicotomicMotor) {
        this.updateMotor(new MultipleChoiseMotor(this.exercise));
      } else if (this.exerciseMotor instanceof MultipleChoiseMotor) {
        this.updateMotor(new FillBlankMotor(this.exercise));
      } else {
        this.print(new AutoMessageMotor().statisticsMessage(this.exercise));
        this.print(new AutoMessageMotor().goodbyeMessage());
      }
    }
  }

  updateMotor(exerciseMotor: ExerciseMotor) {
    this.exerciseMotor = exerciseMotor;
    this.print(this.exerciseMotor.handMessage());
  }

  send(text: string) {
    this.messages.push(new Message(text, RolMessage.STUDENT, MessageTypeEnumerator.TEXT));
    this.print(this.exerciseMotor.handResponse(text));
    this.nextExercise();
    this.text = '';
  }

  print(strings: string[]) {
    for (const string of strings) {
      this.messages.push(new Message(string, RolMessage.TEACHER, MessageTypeEnumerator.TEXT));
    }
  }
}
