package com.cognizant.digital.technology.exercise.controller;

import com.cognizant.digital.technology.exercise.entity.Movie;
import com.cognizant.digital.technology.exercise.entity.Rating;
import com.cognizant.digital.technology.exercise.service.MovieService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;

public class MovieControllerTest {

    private MovieController movieController;
    private MovieService mockedMovieService;
    private Movie movie2;

    @Before
    public void setup() {
        mockedMovieService = Mockito.mock(MovieService.class);
        movieController = new MovieController(mockedMovieService);
        movie2 = new Movie();
        movie2.setId(123L);
        movie2.setName("Movie 1");
        movie2.setDescription("Movie 1 description");
        movie2.setRating(Rating.GOOD);
    }

    @Test
    public void getReturnsAllMoviesGivenNoId() {

        List<Movie> movieList = Arrays.asList(new Movie());

        Mockito.when(mockedMovieService.getAllMovies()).thenReturn(movieList);

        List<Movie> result = movieController.get().getBody();

        assertEquals(1, result.size());
    }

    @Test
    public void getReturnsAllMoviesFromServiceGivenNoId() {
        List<Movie> movieList = Arrays.asList(movie2);

        Mockito.when(mockedMovieService.getAllMovies()).thenReturn(movieList);

        List<Movie> result = movieController.get().getBody();
        assertEquals(movieList, result);
    }

    @Test
    public void getReturnsMovie() {
        Mockito.when(mockedMovieService.getMovie(123L)).thenReturn(movie2);

        Movie result = movieController.get(123L).getBody();

        assertNotNull(result);
    }

    @Test
    public void getReturnsMovieByProvidedId() {
        Mockito.when(mockedMovieService.getMovie(123L)).thenReturn(movie2);

        Movie result = movieController.get(123L).getBody();

        assertEquals(movie2, result);
    }


    @Test
    public void getReturnsNotFoundWhenMovieDoesNotExist() {
        Mockito.when(mockedMovieService.getMovie(anyLong())).thenReturn(null);

        ResponseEntity<Movie> response = movieController.get(123L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void put_NoRequestBodyReturns400BadRequest() {
        ResponseEntity<Movie> response = movieController.put(1, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void put_NoRatingReturns400BadRequest() {
        Movie movie = new Movie();
        movie.setRating(null);
        ResponseEntity<Movie> response = movieController.put(1, movie);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void put_callsMovieServiceSave() {
        movieController.put(1, movie2);
        Mockito.verify(mockedMovieService).save(1L, movie2);
    }
}