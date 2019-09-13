import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({template: ''})
class DummyMovieDetailsComponent {
  
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let dom;


  const mockedMovieList = [
    new Movie(1, "Movie Name 1", "Movie Description 1", "Movie Rating 1"),
    new Movie(2, "Movie Name 2", "Movie Description 2", "Movie Rating 2"),
  ];

  class MockMovieService {
    getAll() {
      return of(mockedMovieList);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieListComponent,
        DummyMovieDetailsComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([{path: 'movie/:id', component: DummyMovieDetailsComponent}])
      ]
    })
    .overrideComponent(MovieListComponent, {
      set: {
        providers: [
          { provide: MovieService, useClass: MockMovieService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a container element', () => {
    expect(dom.querySelector("div#container")).toBeTruthy();
  });

  it('should have list of items inside container', () => {
    expect(dom.querySelectorAll("div#container>.list-item").length).toBeGreaterThan(0);
  });

  it('should contain item list with a movie name element', () => {
    expect(dom.querySelector(".list-item .movie-name")).toBeTruthy();
  });

  it('should contain item list with a movie descrption element', () => {
    expect(dom.querySelector(".list-item .movie-description")).toBeTruthy();
  });

  it('should retrieve list of movies from a service', () => {
    expect(component.movieList).toEqual(mockedMovieList);
  });

  it('should contain list of movies from the component', () => {
    component.movieList.push( new Movie(3, "Movie Name 3", "Movie Description 3", "Movie Rating 3"));
    fixture.detectChanges();
    expect(dom.querySelectorAll("div#container>.list-item").length).toEqual(3);
  });

  it('should display movie name', () => {
    const elementArray = dom.querySelectorAll(".list-item .movie-name");
    expect(elementArray[0].textContent).toEqual("Movie Name 1");
    expect(elementArray[1].textContent).toEqual("Movie Name 2");
  });

  it('should display movie description', () => {
    const elementArray = dom.querySelectorAll(".list-item .movie-description");
    expect(elementArray[0].textContent).toEqual("Movie Description 1");
    expect(elementArray[1].textContent).toEqual("Movie Description 2");
  });

  it('should navigate to movie details route when clicking movie name',
    inject([Location], (location: Location) => {
      const targetMovie = dom.querySelectorAll("a.movie-name").item(0) as HTMLElement;
      targetMovie.click();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/movie/1');
      });
    })
  );
});
