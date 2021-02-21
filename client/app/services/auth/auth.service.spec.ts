import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from 'client/environments/environment';

describe('SecurityService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('authorize should return observable containing authorization token', () => {
    let username: string = "mocker";
    let password: string = "123455";
    let expectedToken: string = "12345678";
    service.authorize(username, password).subscribe((auth_token) => {
      expect(auth_token).toBe(expectedToken);
    });

    let req = httpMock.expectOne(`${environment.backendURL}/api/admin/authorize`);
    expect(req.request.method).toBe('POST');
    req.flush({
      success: true,
      auth_token: expectedToken,
      username: username
    });
  });

  it('isLoggedIn should return check if the user is logged in', () => {
    let expectedToken: string = "12345678";
    localStorage.setItem("auth_token", expectedToken);
    expect(service.isLoggedIn()).toBe(true);
  });
});
