import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersManagerInfoComponent } from './members-manager-info.component';

describe('MembersManagerInfoComponent', () => {
  let component: MembersManagerInfoComponent;
  let fixture: ComponentFixture<MembersManagerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersManagerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersManagerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
