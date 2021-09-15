// import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  // beforeEach(() => TestBed.configureTestingModule({}));
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  })

  it('should return true from isAuthenticated when there is a token', () => {
   localStorage.setItem('userToken', '12345');
   expect(service.isAuthenticated()).toBeTruthy();
  });

afterEach(() => {
  localStorage.removeItem('userToken');
})

});
