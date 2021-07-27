import {
  selectAllFriends,
  selectIsFriendsLoaded,
} from './../store/friends.selectors';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FriendComponent } from './friend.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FriendComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendComponent],
      providers: [
        provideMockStore({
          initialState: { isLoaded: true, friends: [] },
          selectors: [
            { selector: selectIsFriendsLoaded, value: true },
            { selector: selectAllFriends, value: [] },
          ],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
