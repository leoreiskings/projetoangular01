import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosEdicaoComponent } from './funcionarios-edicao.component';

describe('FuncionariosEdicaoComponent', () => {
  let component: FuncionariosEdicaoComponent;
  let fixture: ComponentFixture<FuncionariosEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
