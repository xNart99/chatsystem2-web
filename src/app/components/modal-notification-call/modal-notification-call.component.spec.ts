import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificationCallComponent } from './modal-notification-call.component';

describe('ModalNotificationCallComponent', () => {
  let component: ModalNotificationCallComponent;
  let fixture: ComponentFixture<ModalNotificationCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNotificationCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotificationCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
