package com.cognizant.digital.technology.exercise.service;

import com.cognizant.digital.technology.exercise.entity.Movie;
import com.cognizant.digital.technology.exercise.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovie(long movieId) {
        return movieRepository.findById(movieId).orElse(null);
    }

    public void save(long movieId, Movie movie) {

    }
}
