import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersManagerComponent } from './members-manager.component';

describe('MembersManagerComponent', () => {
  let component: MembersManagerComponent;
  let fixture: ComponentFixture<MembersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
