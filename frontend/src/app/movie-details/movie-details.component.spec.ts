import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { Movie } from '../movie';
import { of, throwError, Observable } from 'rxjs';
import { MovieService } from '../movie.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let dom: HTMLElement;

  const mockedMovie = new Movie(1, "Movie Name 1", "Movie Description 1", "BAD");

  const mockGetOne = function(id: number) {
    if(id === 1) {
      return of(mockedMovie);
    } else {
      return throwError("not found");
    }
  }

  let saveShouldFail = false;

  const mockSave = function(movie: Movie) {
    if(saveShouldFail) {
      return throwError("bad request");
    } else {
      return of("OK");
    }
  }

  let movieId = 1;

  let mockedActivatedRoute = {
    paramMap: of({get: function() {return movieId}})
  };

  const mockMovieService = jasmine.createSpyObj<MovieService>("MovieService", ["getOne", "save"]);
  let getOneSpy = mockMovieService.getOne.and.callFake(mockGetOne);
  let saveSpy = mockMovieService.save.and.callFake(mockSave);

  let createComponent = () => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports: [FormsModule, FontAwesomeModule]
    })
    .overrideComponent(MovieDetailsComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useValue: mockedActivatedRoute },
          { provide: MovieService, useValue: mockMovieService }
        ]
      }
    })
    .compileComponents();
    
    movieId = 1;
    saveShouldFail = false;
    createComponent();
  }));

  afterEach(() => {
    getOneSpy.calls.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain image element', () => {
    expect(dom.querySelector("img")).toBeTruthy();
  });

  it('should have a label for movie name', () => {
    expect(dom.querySelector("#movie-name .label").textContent).toEqual("Name:");
  });

  it('should have a label for movie description', () => {
    expect(dom.querySelector("#movie-description .label").textContent).toEqual("Description:");
  });

  it('should have a label for rating', () => {
    expect(dom.querySelector("#movie-rating .label").textContent).toEqual("Rating:");
  });

  it('should retrieve movie from a service', () => {
    expect(component.movie).toEqual(mockedMovie);
  });

  it('should have an error message element if movie not found', () => {
    movieId = 2;
    createComponent();

    expect(dom.querySelector("#error-message")).toBeTruthy();
    expect(dom.querySelector("#error-message").textContent).toEqual("Movie not found");
  });

  it('should not have an error message element if movie is found', () => {
    expect(dom.querySelector("#error-message")).toBeFalsy();
  });

  it('should have an image with src based on movie id', () => {
    expect(dom.querySelector("img").src).toContain("assets/1.jpg");
    
    component.movie = new Movie(2, "name", "description", "BAD");
    fixture.detectChanges();
    expect(dom.querySelector("img").src).toContain("assets/2.jpg");
  });
 
  it('should have a matching movie name', () => {
    expect(dom.querySelector("#movie-name .value").textContent).toEqual("Movie Name 1");
    
    component.movie = new Movie(2, "name", "description", "BAD");
    fixture.detectChanges();
    expect(dom.querySelector("#movie-name .value").textContent).toEqual("name");
  });

  it('should have a matching movie description', () => {
    expect(dom.querySelector("#movie-description .value").textContent).toEqual("Movie Description 1");
    
    component.movie = new Movie(2, "name", "description", "BAD");
    fixture.detectChanges();
    expect(dom.querySelector("#movie-description .value").textContent).toEqual("description");
  });

  it('should contain all options for movie rating', () => {
    expect(dom.querySelectorAll("#movie-rating fa-icon").length).toEqual(4);
  });

  it('should highlight relevant movie options based on movie rating', () => {
    expect(dom.querySelectorAll("#movie-rating fa-icon.highlighted").length).toEqual(1);

    component.movie.rating = 'GOOD';
    fixture.detectChanges();
    expect(dom.querySelectorAll("#movie-rating fa-icon.highlighted").length).toEqual(3);
  });

  it('should allow changing movie rating', async(() => {
    let rating = dom.querySelectorAll("#movie-rating fa-icon").item(3) as HTMLElement;
    rating.click();
    fixture.detectChanges();
    expect(component.movie.rating).toEqual("GREAT");
  }));

  it('should pass updated movie to service when rating is updated', () => {
    component.updateRating("GREAT");
    expect(saveSpy.calls.count()).toEqual(1);
    expect(saveSpy.calls.mostRecent().args[0]).toEqual(new Movie(1, "Movie Name 1", "Movie Description 1", "GREAT"));
  });

  it('should present error message if service has failed to save update movie', () => {
    saveShouldFail = true;
    createComponent();

    component.updateRating("GOOD");

    fixture.detectChanges();

    expect(dom.querySelector("#error-message")).toBeTruthy();
    expect(dom.querySelector("#error-message").textContent).toEqual("Unable to update movie");
  });

});
