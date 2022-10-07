import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor(private gifsService: GifsService) { }  

  // Si no se especifica el tipo, adquiere el genérico <T>
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  buscar(){

    const valor = this.txtBuscar.nativeElement.value;
    // console.log(valor);

    if( valor.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

  // Primera forma
  /* buscar(termino: string){
    console.log(termino);
  } */
}
