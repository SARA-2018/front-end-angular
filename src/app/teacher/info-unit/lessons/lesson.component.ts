import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../../shared/session.model';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from '../input-dialog.component';
import { CreateLessonDto } from '../dtos/create-lesson.dto';

import { DtoConverter } from '../../../shared/dto-converter';
import { Lesson } from '../../../shared/lesson.model';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';

import { CreateVideoDto } from '../dtos/create-video.dto';

import { Interaction } from '../../../shared/interaction.model';
import { ExerciseUnitComponent } from '../../exercise-unit/exercise-unit.component';
import { GraphUnitComponent } from '../../graph-unit/graph-unit.component';
import { VideoUnitComponent } from '../../video-unit/video-unit.component';
import { Exercise } from '../../../shared/exercise.model';
import { Video } from '../../../shared/video.model';
import {VideoService} from '../../../shared/video.service';
import {ExerciseService} from '../../../shared/exercise.service';
import {SessionService} from '../services/session.service';
import {LessonService} from '../../../shared/lesson.service';

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
                    const lessonDto: CreateLessonDto = {
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
        const exerciseDtoOutput: CreateExerciseDto = {
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
        const videoDtoOutput: CreateVideoDto = {
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
