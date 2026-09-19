import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCreado } from './pedido-creado';

describe('PedidoCreado', () => {
  let component: PedidoCreado;
  let fixture: ComponentFixture<PedidoCreado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoCreado],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoCreado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
