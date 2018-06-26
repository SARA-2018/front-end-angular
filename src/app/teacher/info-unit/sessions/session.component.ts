import { Component, Input } from '@angular/core';
import { Itinerary } from '../models/itinerary.model';
import { ItineraryService } from '../../../shared/itinerary.service';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from '../input-dialog.component';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { SessionService } from '../services/session.service';
import { DtoConverter } from '../../../shared/dto-converter';
import { ExerciseUnitComponent } from '../../exercise-unit/exercise-unit.component';
import { GraphUnitComponent } from '../../graph-unit/graph-unit.component';
import { VideoUnitComponent } from '../../video-unit/video-unit.component';

@Component({
    selector: 'app-session',
    templateUrl: 'session.component.html'
})

export class SessionComponent {

    @Input() itinerary: Itinerary;

    @Input() exerciseUnitComponent: ExerciseUnitComponent;
    @Input() graphUnitComponent: GraphUnitComponent;
    @Input() videoUnitComponent: VideoUnitComponent;

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
                    const sessionDto: CreateSessionDto = {
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
}
