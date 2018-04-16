import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
})

export class HomeComponent implements OnDestroy {

  static URL = 'home';

  constructor() {
  }

  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  ngOnDestroy(): void {
    // Cerrar todas las subscripciones
  }

}
