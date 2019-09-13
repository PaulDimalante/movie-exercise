package com.cognizant.digital.technology.exercise.controller;

import com.cognizant.digital.technology.exercise.entity.Movie;
import com.cognizant.digital.technology.exercise.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;

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
        return null;
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> put(@PathVariable long movieId, @RequestBody Movie movie) {
        return null;
    }
}