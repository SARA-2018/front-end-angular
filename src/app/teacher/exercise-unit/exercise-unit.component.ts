import {Component, HostBinding, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { Exercise } from '../../shared/models/exercise.model';
import { ExerciseService } from '../../shared/services/exercise.service';
import { MatSnackBar } from '@angular/material';
import { Solution } from '../../shared/models/solution.model';
import { Justification } from '../../shared/models/justification.model';

@Component({
  selector: 'app-exercise-unit',
  templateUrl: 'exercise-unit.component.html',
  styleUrls: ['exercise-unit.component.css']
})

export class ExerciseUnitComponent implements OnChanges {

  exerciseJSON: string;
  @Input() exercise: Exercise;
  @Output() openExerciseChat = new EventEmitter<Exercise>();
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private exerciseService: ExerciseService, private snackBar: MatSnackBar) {
  }

  ngOnChanges() {
    this.exerciseJSON = JSON.stringify(this.exercise);
    this.openExerciseChat.emit(this.exercise);
  }

  createModelFromJson(json: string): Exercise {
    this.exerciseJSON = JSON.parse(JSON.stringify(json));
    const objJson = JSON.parse(json);
    this.exercise = new Exercise(objJson.formulation);
    this.exercise.setId(objJson.id);
    if (objJson.solutions.length > 0) {
      for (let i = 0; i < objJson.solutions.length; i++) {
        const solution = new Solution(objJson.solutions[i].text, objJson.solutions[i].isCorrect);
        if (objJson.solutions[i].justifications.length > 0) {
          for (let j = 0; j < objJson.solutions[i].justifications.length; j++) {
            solution.addJustification(new Justification(objJson.solutions[i].justifications[j].text,
              objJson.solutions[i].justifications[j].isCorrect));
          }
        }
        this.exercise.addSolution(solution);
      }
    }
    return this.exercise;
  }

  saveExercise() {
    if (this.verify()) {
      this.exerciseService.update(this.createModelFromJson(this.exerciseJSON)).subscribe();
    } else {
      this.snackBar.open('Json invalido', '', {
        duration: 2000
      });
    }
  }

  verify(): boolean {
    let input: any = this.exerciseJSON;

    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      console.log(e);
      this.snackBar.open(e.message, '', {
        duration: 5000
      });
      const eMesage: string[] = e.message.split(' ');
      input = input.split('');
      input.splice(Number(eMesage[eMesage.length - 1]), 0, '←');
      let inputString = '';
      input.forEach(element => {
        inputString += element;
      });
      this.exerciseJSON = inputString;
      return false;
    }
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
}

