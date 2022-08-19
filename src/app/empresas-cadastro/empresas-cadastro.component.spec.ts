import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasCadastroComponent } from './empresas-cadastro.component';

describe('EmpresasCadastroComponent', () => {
  let component: EmpresasCadastroComponent;
  let fixture: ComponentFixture<EmpresasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
