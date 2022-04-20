import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendTargetComponent } from './friend-target.component';

describe('FriendTargetComponent', () => {
  let component: FriendTargetComponent;
  let fixture: ComponentFixture<FriendTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
