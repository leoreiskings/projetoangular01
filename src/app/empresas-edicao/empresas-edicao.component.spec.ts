import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasEdicaoComponent } from './empresas-edicao.component';

describe('EmpresasEdicaoComponent', () => {
  let component: EmpresasEdicaoComponent;
  let fixture: ComponentFixture<EmpresasEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
