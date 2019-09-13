import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  host: {'class': 'container-fluid'}
})
export class MovieDetailsComponent implements OnInit {
  
  movie: Movie;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.loadMovie(+params.get('id'));
    });
  }

  shouldHighlight(rating: String): boolean {
    if (!this.movie) {
      return false;
    }

    switch(this.movie.rating) {
      case 'BAD':
        return rating === 'BAD';
      case 'OKAY':
        return rating === 'BAD' || rating == 'OKAY';
      case 'GOOD':
        return rating === 'BAD' || rating === 'OKAY' || rating === 'GOOD';
      case 'GREAT':
        return rating === 'BAD' || rating === 'OKAY' || rating === 'GOOD' || rating === 'GREAT';
      default:
        return false;
      }
  }

  updateRating(rating: String) {
    this.movie.rating = rating;
    this.movieService.save(this.movie).subscribe(
      () => {console.log('movie updated successfully')},
      () => {
        this.errorMessage = "Unable to update movie";
      }
    );
  }

  private loadMovie(id: number) {
    this.movieService.getOne(id).subscribe(
      (data) => {
        this.movie = data;
      },
      () => {
        this.errorMessage = "Movie not found";
      });
  }
}
