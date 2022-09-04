import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddMemberComponent } from './create-add-member.component';

describe('CreateAddMemberComponent', () => {
  let component: CreateAddMemberComponent;
  let fixture: ComponentFixture<CreateAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
