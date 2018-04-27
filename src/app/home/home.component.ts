import {Component} from '@angular/core';
import Lex = require('lexical-parser');
import {error} from 'util';
import {UnitService} from './shared/unit.service';
import {Units} from './unit';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';

  constructor(private snackBar: MatSnackBar, private unitService: UnitService) {
  }

  /* EJEMPLO PARA ENRUTAR
  tickets() {
    this.router.navigate([HomeComponent.URL, TicketsComponent.URL]);
  }
  */

  onEnter(code: string) {
// You can specify an exact string or a regex for the token
    const tokenMatchers = [
      'new', '#',
      ['integer', /[0-9]+/],
      ['id', /[a-zA-Z][a-zA-Z0-9]*/]
    ];

    const ignorePattern = '[\n\s \t]+';

    const lex = new Lex(code, tokenMatchers, ignorePattern);
    const id = lex.nextToken();
    try {
      if (id['name'] !== 'id') {
        throw error();
      } else {
        const sharp = lex.nextToken();
        if (sharp['name'] !== '#') {
          throw error();
        } else {
          const news = lex.nextToken();
          if (news['name'] === 'new') {
            const unit = new Units().names(id['lexeme']);
            this.createUnit(unit);
          }
        }
      }
    } catch (err) {
      // Error handling
      if (err.code === 'LEXICAL_ERROR') {
        console.log(`\n${err.message}\n`);
        console.log(`Position: ${err.position}`);
        console.log(`Character: ${err.character}`);
        console.log(`Nearby code: ${err.nearbyCode}`);
      } else {
        this.snackBar.open(err, 'X', {
          duration: 8000
        });
      }
    }
  }

  createUnit(body: Object): void {
    this.unitService.create(body).subscribe(data => {
      body = data;
      this.snackBar.open('Creado Correctamente !', 'X', {
        duration: 8000
      });
    });
  }
}
