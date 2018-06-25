import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Unit } from '../graph-unit/models/unit.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InputDialogComponent } from './input-dialog.component';
import { Itinerary } from './models/itinerary.model';
import { Session } from './models/session.model';
import { Formation } from './models/formation.model';
import { Lesson } from './models/lesson.model';
import { ExerciseUnitComponent } from '../exercise-unit/exercise-unit.component';
import { VideoUnitComponent } from '../video-unit/video-unit.component';
import { GraphUnitComponent } from '../graph-unit/graph-unit.component';
import { UnitService } from '../shared/unit.service';
import { ItineraryService } from '../../shared/itinerary.service';
import { SessionService } from './services/session.service';
import { LessonService } from '../../shared/lesson.service';
import { Exercise } from '../shared/exercise.model';
import { ExerciseService } from '../shared/exercise.service';
import { DtoConverter } from '../../shared/dto-converter';
import { CreateSessionDto } from './dtos/create-session.dto';
import { CreateItineraryDto } from './dtos/create-itinerary.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { Interaction } from './models/interaction.model';
import { VideoService } from './services/video.service';
import { Video } from './models/video.model';
import { CreateVideoDto } from './dtos/create-video.dto';

@Component({
  selector: 'app-info-unit',
  templateUrl: 'info-unit.component.html',
  styleUrls: ['info-unit.component.css']
})

export class InfoUnitComponent implements OnChanges {

  public itinerarys: Itinerary[] = [];

  @Input() unit: Unit;
  @Input() exerciseUnit: ExerciseUnitComponent;
  @Input() graphUnit: GraphUnitComponent;
  @Input() videoUnit: VideoUnitComponent;
  @Output() openExercise = new EventEmitter<Exercise>();
  @Output() openVideo = new EventEmitter<Video>();

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private unitService: UnitService,
    private sessionService: SessionService,
    private lessonService: LessonService,
    private exerciseService: ExerciseService,
    private videoService: VideoService,
    private itineraryService: ItineraryService) {
  }

  ngOnChanges() {
    this.updateUnit();
  }

  updateUnit() {
    this.itinerarys = [];
    this.unitService.getByCode(this.unit).subscribe(
      (unitDto) => {
        this.unit = new DtoConverter().convertUnit(unitDto);
        for (const itinerary of this.unit.getItineraries()) {
          this.itineraryService.getById(itinerary.getId()).subscribe(
            (itineraryDto) => {
              this.itinerarys.push(new DtoConverter().convertItinerary(itineraryDto));
            }
          );
        }
      }
    );
  }

  addLesson(itineraryIndex: number, sessionIndex: number) {
    const name = '';
    const message = 'Nombre de la lección';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          const lessonDto: CreateLessonDto = {
            sessionId: this.itinerarys[itineraryIndex].getFormations()[sessionIndex].getId(),
            name: result
          };
          console.log(lessonDto);
          this.lessonService.create(lessonDto).subscribe(
            (lessonDtoInput) => {
              const lesson: Lesson = new Lesson(lessonDtoInput.name);
              lesson.setId(lessonDtoInput.id);
              const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
              const session: Session = <Session>formationArray[sessionIndex];
              console.log(session.getId());
              const lessonArray: Lesson[] = session.getLessons();
              lessonArray.push(lesson);
              session.setLessons(lessonArray);
            }
          );
        }
      }
    );
  }

  addSession(itineraryIndex: number) {
    const name = '';
    const message = 'Nombre de la sesión';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          const sessionDto: CreateSessionDto = {
            itineraryId: this.itinerarys[itineraryIndex].getId().toString(),
            name: result
          };
          this.sessionService.create(sessionDto).subscribe(
            (sessionDtoInput) => {
              const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
              const session = new Session(sessionDtoInput.name);
              session.setId(sessionDtoInput.id);
              formationArray.push(<Formation>session);
              this.itinerarys[itineraryIndex].setFormations(formationArray);
            }
          );
        }
      }
    );
  }

  addItinerary() {
    const name = '';
    const message = 'Nombre del itinerario';
    this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
      result => {
        if (result) {
          const itinerary: CreateItineraryDto = {
            unitCode: this.unit.getCode().toString(),
            name: result
          };
          this.itineraryService.create(itinerary).subscribe(
            () => {
              this.updateUnit();
            }
          );
        }
      }
    );
  }

  addExercise(itineraryIndex: number, sessionIndex: number, lessonIndex: number) {
    this.graphUnit.toggle();
    this.exerciseUnit.toggle();
    if (this.videoUnit['isOpen'] === true) {
      this.graphUnit.toggle();
      this.videoUnit.toggle();
    }
    const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
    const session: Session = <Session>formationArray[sessionIndex];
    const lessonArray: Lesson[] = session.getLessons();
    const exercise: Exercise = new Exercise('');
    lessonArray[lessonIndex].addInteractions(exercise);
    const exerciseDto: CreateExerciseDto = {
      formulation: '',
      solutions: [],
      lessonId: lessonArray[lessonIndex].getId()
    };
    this.exerciseService.create(exerciseDto).subscribe();

  }

  addVideo(itineraryIndex: number, sessionIndex: number, lessonIndex: number) {
    const formationArray: Formation[] = this.itinerarys[itineraryIndex].getFormations();
    const session: Session = <Session>formationArray[sessionIndex];
    const lessonArray: Lesson[] = session.getLessons();
    const exercise: Video = new Video('');
    lessonArray[lessonIndex].addInteractions(exercise);
    const videoDto: CreateVideoDto = {
      lessonId: lessonArray[lessonIndex].getId(),
      url: ''
    };
    this.videoService.create(videoDto).subscribe(
      (videoInputDto) => {
        this.infoUnitVideo.emit(new DtoConverter().convertVideo(videoInputDto));
      }
    );
    this.videoUnit.toggle();
    this.graphUnit.toggle();
    if (this.exerciseUnit['isOpen'] === true) {
      this.graphUnit.toggle();
      this.exerciseUnit.toggle();
    }
  }

  showInteraction(interaction: Interaction) {
    if (interaction.isExercise()) {
      this.exerciseService.getById(interaction.getId()).subscribe(
        (exerciseDto) => {
          this.openExercise.emit(new DtoConverter().convertExercise(exerciseDto));
          this.graphUnit.toggle();
          this.exerciseUnit.toggle();
        }
      );
    } else {
      this.videoService.getById(interaction.getId()).subscribe(
        (videoDto) => {
          this.openVideo.emit(new DtoConverter().convertVideo(videoDto));
          this.graphUnit.toggle();
          this.videoUnit.toggle();
        }
      );
    }
  }

  saveUnitContent() {
    if (this.verify()) {
      this.unitService.setContent(this.unit).subscribe();
    } else {
      this.snackBar.open('Json invalido', '', {
        duration: 2000
      });
    }
  }
  verify(): boolean {
    let input: any = this.unit.getContent();

    try {
      JSON.parse(input);
      return true;
    } catch (e) {
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
      this.unit.setContent(inputString);
      return false;
    }
  }
}
