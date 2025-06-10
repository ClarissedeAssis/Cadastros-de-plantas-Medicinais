import { TestBed } from '@angular/core/testing';

import { PlantaUsuarioService } from './plantaUsuario.service';

describe('ComentarioService', () => {
  let service: PlantaUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantaUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
