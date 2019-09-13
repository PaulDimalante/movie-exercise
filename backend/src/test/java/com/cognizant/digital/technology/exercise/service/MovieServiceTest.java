package com.cognizant.digital.technology.exercise.service;

import com.cognizant.digital.technology.exercise.entity.Movie;
import com.cognizant.digital.technology.exercise.entity.Rating;
import com.cognizant.digital.technology.exercise.repository.MovieRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

public class MovieServiceTest {

    private MovieRepository mockedMovieRepository;
    private MovieService movieService;

    @Before
    public void setup() {
        mockedMovieRepository = Mockito.mock(MovieRepository.class);
        movieService = new MovieService(mockedMovieRepository);
    }

    @Test
    public void findAllMoviesReturnsListOfAllMovies() {
        Mockito.when(mockedMovieRepository.findAll()).thenReturn(Collections.singletonList((new Movie())));
        List<Movie> movieList = movieService.getAllMovies();
        assertEquals(1, movieList.size());
    }

    @Test
    public void findAllMoviesReturnsListOfSpecificMovies() {
        Mockito.when(mockedMovieRepository.findAll()).thenReturn(createMovieList());
        List<Movie> movieList = movieService.getAllMovies();
        Movie movie1 = movieList.get(0);
        Movie movie2 = movieList.get(1);

        assertEquals((Long) 123L, movie1.getId());
        assertEquals("Movie 1 description", movie1.getDescription());
        assertEquals("Movie 1", movie1.getName());
        assertEquals(Rating.BAD, movie1.getRating());

        assertEquals((Long) 321L, movie2.getId());
        assertEquals("Movie 2 description", movie2.getDescription());
        assertEquals("Movie 2", movie2.getName());
        assertEquals(Rating.GOOD, movie2.getRating());
    }

    @Test
    public void findMovieReturnsMovie() {
        Movie movie1 = new Movie();
        movie1.setId(123L);
        movie1.setName("Movie 1");
        movie1.setDescription("Movie 1 description");
        movie1.setRating(Rating.BAD);
        Mockito.when(mockedMovieRepository.findById(anyLong())).thenReturn(Optional.of(movie1));

        Movie result = movieService.getMovie(1L);

        Movie movie2 = new Movie();
        movie2.setId(123L);
        movie2.setName("Movie 1");
        movie2.setDescription("Movie 1 description");
        movie2.setRating(Rating.BAD);

        assertEquals(movie2, result);
    }

    @Test
    public void findMovieReturnsNullIfNoneFound() {
        Movie movie1 = new Movie();
        movie1.setId(123L);
        movie1.setName("Movie 1");
        movie1.setDescription("Movie 1 description");
        movie1.setRating(Rating.BAD);

        Mockito.when(mockedMovieRepository.findById(123L)).thenReturn(Optional.of(movie1));
        Mockito.when(mockedMovieRepository.findById(1L)).thenReturn(Optional.empty());

        Movie result1 = movieService.getMovie(123L);
        Movie result2 = movieService.getMovie(1L);

        assertEquals(movie1, result1);
        assertNull(result2);

    }

    private List<Movie> createMovieList() {
        List<Movie> movieList = new ArrayList<>();
        Movie movie1 = new Movie();
        movie1.setId(123L);
        movie1.setName("Movie 1");
        movie1.setDescription("Movie 1 description");
        movie1.setRating(Rating.BAD);

        Movie movie2 = new Movie();
        movie2.setId(321L);
        movie2.setName("Movie 2");
        movie2.setDescription("Movie 2 description");
        movie2.setRating(Rating.GOOD);

        movieList.add(movie1);
        movieList.add(movie2);

        return movieList;
    }

}