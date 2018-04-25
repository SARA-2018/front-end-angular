import {Component} from '@angular/core';
import {Units} from './unit';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';

  constructor() {
  }

  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  onEnter(value: string) {
    const parse = value.split('#new', 1);
    const unit = new Units().names(parse[0]);
    unit.toJson();
    console.log(unit.toJson());
  }

}
