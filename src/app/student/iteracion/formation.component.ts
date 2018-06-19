import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import {ItineraryService} from '../../shared/itinerary.service';
import {ItineraryDto} from '../dtos/itinerary.dto';
import {FormationDto} from '../dtos/formation.dto';



@Component({
    selector: 'app-formation',
    templateUrl: 'formation.component.html',
    styleUrls: ['formation.component.css']

})

export class FormationComponent implements OnInit {

  itinerarys: ItineraryDto[] = [];
  formations: FormationDto[] = [];
    constructor(public dialog: MatDialog, private itineraryService: ItineraryService) {
    }

  ngOnInit(): void {
    this.getItinerarys();
    console.log(this.itinerarys);
  }

  getItinerarys(): ItineraryDto[] {
    this.itineraryService.getAll().subscribe(data => {
      this.formations = data;
      for (let i = 0; i < data.length; i++) {
        this.itinerarys.push(data[i].itinerary);
      }
    });
    return this.itinerarys;
  }




    /*openItineraryInfo(formations: Formation) {
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
    }*/

}
