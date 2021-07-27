import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '.';
import { Friend } from '../models/friend';
import { FriendState } from './friends.reducer';

export const friendsKey = 'friends';

export const selectFriendState = createFeatureSelector<State, FriendState>(
  friendsKey
);

export const selectIsFriendsLoaded = createSelector(
  selectFriendState,
  (state: FriendState) => state.isLoaded
);

export const selectAllFriends = createSelector(
  selectFriendState,
  (state: FriendState) => state.friends
);

export const selectTotalFriendsCount = createSelector(
  selectAllFriends,
  (friends: Friend[]) => friends?.length || 0
);
