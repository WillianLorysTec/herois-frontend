import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHeroisComponent } from './listar-herois.component';

describe('ListarHeroisComponent', () => {
  let component: ListarHeroisComponent;
  let fixture: ComponentFixture<ListarHeroisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarHeroisComponent]
    });
    fixture = TestBed.createComponent(ListarHeroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
