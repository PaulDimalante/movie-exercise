import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private httpClient: HttpClient) { }

  getOne(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(environment.moviesURL + '/' + id);
  }

  getAll(): Observable<Array<Movie>> {
    return this.httpClient.get<Array<Movie>>(environment.moviesURL);
  }

  save(movie: Movie): Observable<any> {
    return this.httpClient.put(environment.moviesURL + '/' + movie.id, movie);    
  }

}
