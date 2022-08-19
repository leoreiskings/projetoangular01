import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosConsultaComponent } from './funcionarios-consulta.component';

describe('FuncionariosConsultaComponent', () => {
  let component: FuncionariosConsultaComponent;
  let fixture: ComponentFixture<FuncionariosConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
