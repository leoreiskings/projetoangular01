import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosCadastroComponent } from './funcionarios-cadastro.component';

describe('FuncionariosCadastroComponent', () => {
  let component: FuncionariosCadastroComponent;
  let fixture: ComponentFixture<FuncionariosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
