package com.cognizant.digital.technology.exercise.controller;

import com.cognizant.digital.technology.exercise.entity.Movie;
import com.cognizant.digital.technology.exercise.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping()
    public ResponseEntity<List<Movie>> get() {
        return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK);
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> get(@PathVariable long movieId) {
        Movie movie = this.movieService.getMovie(movieId);
        HttpStatus status;
        if(movie == null) {
            status = HttpStatus.NOT_FOUND;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<Movie>(movie, status);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> put(@PathVariable long movieId, @RequestBody Movie movie) {
        Movie movieSaved = this.movieService.save(movieId, movie);
        HttpStatus status;
        if(movieSaved == null) {
            status = HttpStatus.BAD_REQUEST;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<Movie>(movie, status);
    }
}
