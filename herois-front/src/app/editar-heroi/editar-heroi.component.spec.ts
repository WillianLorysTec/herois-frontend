import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHeroiComponent } from './editar-heroi.component';

describe('EditarHeroiComponent', () => {
  let component: EditarHeroiComponent;
  let fixture: ComponentFixture<EditarHeroiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHeroiComponent]
    });
    fixture = TestBed.createComponent(EditarHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
