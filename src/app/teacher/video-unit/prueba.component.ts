
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-prueba-component',
  templateUrl: './prueba.component.html'
})
export class PruebaComponent  {
  name = 'Angular 6';
  product: any[] = [
{id: 121, name: "iphone", url: 'https://www.gstatic.com/webp/gallery3/1.png'} ];
displayURL;



constructor(private sanitizer: DomSanitizer) {
  this.displayURL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tgbNymZ7vqY');
}

}
