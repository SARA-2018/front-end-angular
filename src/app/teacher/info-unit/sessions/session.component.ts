import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Itinerary } from '../../../shared/models/itinerary.model';
import { ItineraryService } from '../../../shared/services/itinerary.service';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from '../input-dialog.component';
import { CreateSessionOutputDto } from '../dtos/create-session-output.dto';
import { SessionService } from '../../../shared/services/session.service';
import { DtoConverter } from '../../../shared/dto-converter';
import { ExerciseUnitComponent } from '../../exercise-unit/exercise-unit.component';
import { GraphUnitComponent } from '../../graph-unit/graph-unit.component';
import { VideoUnitComponent } from '../../video-unit/video-unit.component';
import { Exercise } from '../../../shared/models/exercise.model';
import { Video } from '../../../shared/models/video.model';

@Component({
    selector: 'app-session',
    templateUrl: 'session.component.html'
})

export class SessionComponent {

    @Input() itinerary: Itinerary;

    @Input() exerciseUnitComponent: ExerciseUnitComponent;
    @Input() graphUnitComponent: GraphUnitComponent;
    @Input() videoUnitComponent: VideoUnitComponent;

    @Output() openExerciseInfo = new EventEmitter<Exercise>();
    @Output() openVideoInfo = new EventEmitter<Video>();

    constructor(private itineraryService: ItineraryService, public dialog: MatDialog,
        private sessionService: SessionService) {
        }

    updateItinerary() {
        this.itineraryService.getById(this.itinerary.getId()).subscribe(
            (itineraryDto) => {
                this.itinerary = new DtoConverter().convertItinerary(itineraryDto);
            }
        );
    }

    addSession() {
        const name = '';
        const message = 'Nombre de la sesión';
        this.dialog.open(InputDialogComponent, { data: { name: name, message: message } }).afterClosed().subscribe(
            result => {
                if (result) {
                    const sessionDto: CreateSessionOutputDto = {
                        itineraryId: this.itinerary.getId(),
                        name: result
                    };
                    this.sessionService.create(sessionDto).subscribe(
                        () => {
                            this.updateItinerary();
                        }
                    );
                }
            }
        );
    }

    openExercise(exercise: Exercise) {
        this.openExerciseInfo.emit(exercise);
    }

    openVideo(video: Video) {
        this.openVideoInfo.emit(video);
    }
}
