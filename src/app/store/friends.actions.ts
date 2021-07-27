import { Friend } from './../models/friend';
import { createAction, props } from '@ngrx/store';

export const loadFriends = createAction('[Friends] Load Friends');

export const loadFriendsSuccess = createAction(
  '[Friends] Load Friends Success',
  props<{ friends: Friend[] }>()
);

export const loadFriendsFailure = createAction(
  '[Friends] Load Friends Failure'
);

export const friendAdded = createAction(
  '[Friends] Friend Added',
  props<{ friend: Friend }>()
);
