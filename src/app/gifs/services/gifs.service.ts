import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'fMCQQVNBwe0WMATPmC1T3mMQiGq0DkhH';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //Cambiar any por el tipo de dato correspondiente
  public resultados: Gif[] = [];

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  get historial(){
    this._historial = this. _historial.splice(0, 10);
    return [...this._historial];
  }

  buscarGifs( query: string){

    if( !this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }    

    // console.log(this._historial);

    // Usando Promises
    // ---------------------------------------------------------
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=fMCQQVNBwe0WMATPmC1T3mMQiGq0DkhH&q=dragon ball z&limit=10')
      .then( resp => {
        resp.json().then(data => {
          console.log(data);
        })
      }); */

    // Forma más limpia, para hacerlo de esta forma, el método ha de ser asíncrono
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=fMCQQVNBwe0WMATPmC1T3mMQiGq0DkhH&q=dragon ball z&limit=10');
    // const data = await resp.json();
    // ---------------------------------------------------------

    // Usando Observables
    /* this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=fMCQQVNBwe0WMATPmC1T3mMQiGq0DkhH&q=${ query }&limit=10`)      
      .subscribe( (resp ) => {
        // console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      }); */
    
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})      
    .subscribe( (resp ) => {      
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    
  }
}
