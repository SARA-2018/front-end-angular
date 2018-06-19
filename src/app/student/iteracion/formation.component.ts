import { Component } from '@angular/core';
import { Itinerary } from '../../teacher/info-unit/models/itinerary.model';
import { Formation } from '../../teacher/info-unit/models/formation.model';
import { Session } from '../../teacher/info-unit/models/session.model';
import { MatDialog } from '@angular/material';
import { FormationDialogComponent } from './formation-dialog.component';



@Component({
    selector: 'app-formation',
    templateUrl: 'formation.component.html',
    styleUrls: ['formation.component.css']

})

export class FormationComponent {

    private itinerarys: Itinerary[] = [];
    constructor(public dialog: MatDialog) {
        const it1 = new Itinerary();
        const it2 = new Itinerary();
        it1.setName('Itinerario dfjklasdñfljadlskfjañlsdkfj');
        it2.setName('Nombre del Itinerario 2');
        this.itinerarys.push(it2);
        it1.setFormations([new Session('blablabla'), it2]);
        this.itinerarys.push(it1);
        this.itinerarys.push(it1);
        console.log(this.itinerarys);
    }

    openItineraryInfo(formations: Formation) {
        this.dialog.open(FormationDialogComponent, { data: { formations: formations}  }).afterClosed().subscribe(
            result => {
              if (result) {
                const itinerary: Itinerary = new Itinerary();
                itinerary.setName(result);
                this.itinerarys.push(itinerary);
                // this.itineraryService.create(itinerary).subscribe();
              }
            }
          );
    }

}
