import { TestBed } from '@angular/core/testing';

describe('nameService', () => {
  let service: nameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(nameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});