import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaPlantaPage } from './categoria-planta.page';

describe('CategoriaPlantaPage', () => {
  let component: CategoriaPlantaPage;
  let fixture: ComponentFixture<CategoriaPlantaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaPlantaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
