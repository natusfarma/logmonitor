import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitorArquivosComponent } from './leitor-arquivos.component';

describe('LeitorArquivosComponent', () => {
  let component: LeitorArquivosComponent;
  let fixture: ComponentFixture<LeitorArquivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeitorArquivosComponent]
    });
    fixture = TestBed.createComponent(LeitorArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
