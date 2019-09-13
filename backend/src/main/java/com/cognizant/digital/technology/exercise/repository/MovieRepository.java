package com.cognizant.digital.technology.exercise.repository;

import com.cognizant.digital.technology.exercise.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
