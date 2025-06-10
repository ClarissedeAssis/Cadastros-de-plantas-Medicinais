import { TestBed } from '@angular/core/testing';

import { CategoriaPlantaService } from './categoria-planta.service';

describe('CategoriaPlantaService', () => {
  let service: CategoriaPlantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaPlantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
