import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastarHeroisComponent } from './cadastar-herois.component';

describe('CadastarHeroisComponent', () => {
  let component: CadastarHeroisComponent;
  let fixture: ComponentFixture<CadastarHeroisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastarHeroisComponent]
    });
    fixture = TestBed.createComponent(CadastarHeroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
