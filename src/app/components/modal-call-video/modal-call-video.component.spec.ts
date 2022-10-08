import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCallVideoComponent } from './modal-call-video.component';

describe('ModalCallVideoComponent', () => {
  let component: ModalCallVideoComponent;
  let fixture: ComponentFixture<ModalCallVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCallVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCallVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
