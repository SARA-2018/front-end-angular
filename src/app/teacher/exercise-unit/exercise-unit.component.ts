import {Component, HostBinding, Input, OnChanges} from '@angular/core';
import { Exercise } from '../shared/exercise.model';
import { ExerciseService } from '../shared/exercise.service';
import { MatSnackBar } from '@angular/material';
import { Solution } from '../shared/solution.model';
import { Justification } from '../shared/justification.model';

@Component({
  selector: 'app-exercise-unit',
  templateUrl: 'exercise-unit.component.html',
  styleUrls: ['exercise-unit.component.css']
})

export class ExerciseUnitComponent implements OnChanges {

  exerciseJSON: string;
  @Input() exercise: Exercise;
  @HostBinding('class.is-open')
  isOpen = false;

  constructor(private exerciseService: ExerciseService, private snackBar: MatSnackBar) {
  }

  ngOnChanges() {
    this.exerciseJSON = JSON.stringify(this.exercise);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  createModels(json: string) {
    this.exerciseJSON = JSON.parse(JSON.stringify(json));
    const objJson = JSON.parse(json);
    this.exercise = new Exercise(objJson.name);
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

  saveUnitContent() {
    if (this.verify()) {
      this.exerciseService.setContent(this.createModels(this.exerciseJSON)).subscribe();
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
}

