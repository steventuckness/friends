import { createSelector } from '@ngrx/store';
import { getFriendsState, State } from '.';
import { Friend } from '../models/friend';
import { FriendState } from './friends.reducer';

export const selectFriendState = (state: State) => state.friends;

export const selectAllFriends = createSelector(
  selectFriendState,
  (state: FriendState) => state.friends
);

export const selectTotalFriendsCount = createSelector(
  selectAllFriends,
  (friends: Friend[]) => friends.length
);
