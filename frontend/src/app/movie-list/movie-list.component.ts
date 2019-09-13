import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList: Array<Movie>;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAll().subscribe((data) => {
      this.movieList = data;
    });
  }
}
