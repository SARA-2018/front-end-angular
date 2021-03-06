import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../../shared/models/session.model';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from '../input-dialog.component';
import { CreateLessonOutputDto } from '../dtos/create-lesson-output.dto';
import { DtoConverter } from '../../../shared/dto-converter';
import { Lesson } from '../../../shared/models/lesson.model';
import { CreateExerciseOutputDto } from '../dtos/create-exercise-output.dto';
import { CreateVideoOutputDto } from '../dtos/create-video-output.dto';
import { Interaction } from '../../../shared/models/interaction.model';
import { ExerciseUnitComponent } from '../../exercise-unit/exercise-unit.component';
import { GraphUnitComponent } from '../../graph-unit/graph-unit.component';
import { VideoUnitComponent } from '../../video-unit/video-unit.component';
import { Exercise } from '../../../shared/models/exercise.model';
import { Video } from '../../../shared/models/video.model';
import { VideoService } from '../../../shared/services/video.service';
import { ExerciseService } from '../../../shared/services/exercise.service';
import { SessionService } from '../../../shared/services/session.service';
import { LessonService } from '../../../shared/services/lesson.service';

@Component({
    selector: 'app-lesson',
    templateUrl: 'lesson.component.html',
    styleUrls: ['lesson.component.css']
})

export class LessonComponent {

    @Input() session: Session;

    @Input() exerciseUnitComponent: ExerciseUnitComponent;
    @Input() graphUnitComponent: GraphUnitComponent;
    @Input() videoUnitComponent: VideoUnitComponent;

    @Output() openExercise = new EventEmitter<Exercise>();
    @Output() openVideo = new EventEmitter<Video>();

    constructor(public dialog: MatDialog, private lessonService: LessonService,
        private exerciseService: ExerciseService,
        private videoService: VideoService,
        private sessionService: SessionService
    ) { }

    updateSession() {
        this.sessionService.getById(this.session.getId()).subscribe(
            (sessionDto) => {
                this.session = new DtoConverter().convertSession(sessionDto);
            }
        );
    }

    addLesson() {
        const name = '';
        const message = 'Nombre de la lección';
        this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
            result => {
                if (result) {
                    const lessonDto: CreateLessonOutputDto = {
                        sessionId: this.session.getId(),
                        name: result
                    };
                    this.lessonService.create(lessonDto).subscribe(
                        () => this.updateSession()
                    );
                }
            }
        );
    }

    addExercise(lesson: Lesson) {
        this.graphUnitComponent.close();
        this.exerciseUnitComponent.open();
        this.videoUnitComponent.close();
        const exerciseDtoOutput: CreateExerciseOutputDto = {
            formulation: '',
            solutions: [],
            lessonId: lesson.getId()
        };
        this.exerciseService.create(exerciseDtoOutput).subscribe(
            (exerciseDtoInput) => {
                this.updateSession();
                this.openExercise.emit(new DtoConverter().convertExercise(exerciseDtoInput));
            }
        );
    }

    addVideo(lesson: Lesson) {
        this.graphUnitComponent.close();
        this.exerciseUnitComponent.close();
        this.videoUnitComponent.open();
        const videoDtoOutput: CreateVideoOutputDto = {
            lessonId: lesson.getId(),
            url: ''
        };
        this.videoService.create(videoDtoOutput).subscribe(
            (videoDtoInput) => {
                this.updateSession();
                this.openVideo.emit(new DtoConverter().convertVideo(videoDtoInput));
            }
        );
    }

    showInteraction(interaction: Interaction) {
        if (interaction.isExercise()) {
            this.graphUnitComponent.close();
            this.exerciseUnitComponent.open();
            this.videoUnitComponent.close();
            this.exerciseService.getById(interaction.getId()).subscribe(
                (exerciseDto) => {
                    this.openExercise.emit(new DtoConverter().convertExercise(exerciseDto));
                }
            );
        } else {
            this.graphUnitComponent.close();
            this.exerciseUnitComponent.close();
            this.videoUnitComponent.open();
            this.videoService.getById(interaction.getId()).subscribe(
                (videoDto) => {
                    this.openVideo.emit(new DtoConverter().convertVideo(videoDto));
                }
            );
        }
    }
}
