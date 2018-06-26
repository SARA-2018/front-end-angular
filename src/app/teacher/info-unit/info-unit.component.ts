import { Component, Input, OnChanges } from '@angular/core';
import { Unit } from '../graph-unit/models/unit.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InputDialogComponent } from './input-dialog.component';
import { Itinerary } from './models/itinerary.model';
import { ExerciseUnitComponent } from '../exercise-unit/exercise-unit.component';
import { VideoUnitComponent } from '../video-unit/video-unit.component';
import { GraphUnitComponent } from '../graph-unit/graph-unit.component';
import { UnitService } from '../shared/unit.service';
import { ItineraryService } from '../../shared/itinerary.service';
import { DtoConverter } from '../../shared/dto-converter';
import { CreateItineraryDto } from './dtos/create-itinerary.dto';


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

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,
    private unitService: UnitService, private itineraryService: ItineraryService) {
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
