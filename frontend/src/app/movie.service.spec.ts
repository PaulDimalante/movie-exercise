import { TestBed, inject } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { Movie } from './movie';
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { environment } from "../environments/environment";

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));

  it('should return list of movies', inject([MovieService], (service: MovieService) => {
    service.getAll().subscribe((response: Array<Movie>) => {
      expect(response.length).toBe(1);
    });
  }));

  it('should return all movies by calling http service', 
    inject([MovieService, HttpTestingController], (service: MovieService, httpMock: HttpTestingController) => {

      const mockResponse = [
        new Movie(1, "Movie Name", "Movie Description", "Movie Rating"),
        new Movie(2, "Movie Name 2", "Movie Description 2", "Movie Rating 2"),
        
      ]
      
      service.getAll().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      
      const mockReq = httpMock.expectOne(environment.moviesURL);

      mockReq.flush(mockResponse);

      httpMock.verify();
  }));

  it('should return single movie by calling http service', 
    inject([MovieService, HttpTestingController], (service: MovieService, httpMock: HttpTestingController) => {

      const mockResponse = new Movie(1, "Movie Name", "Movie Description", "Movie Rating");
      
      service.getOne(1).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      
      const mockReq = httpMock.expectOne(environment.moviesURL + '/1');

      expect(mockReq.request.method).toEqual("GET");

      mockReq.flush(mockResponse);

      httpMock.verify();
  }));

  it('should post supplied movie via http', 
  inject([MovieService, HttpTestingController], (service: MovieService, httpMock: HttpTestingController) => {
    const mockArg = new Movie(1, "Movie Name", "Movie Description", "Movie Rating");
      
    service.save(mockArg).subscribe();
    
    const mockReq = httpMock.expectOne(environment.moviesURL + '/1');

    expect(mockReq.request.method).toEqual("PUT");
    expect(mockReq.request.body).toEqual(mockArg);

    mockReq.flush({});

    httpMock.verify();
  }));

});
