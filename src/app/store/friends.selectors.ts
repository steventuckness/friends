import { createSelector } from '@ngrx/store';
import { State } from '.';
import { Friend } from '../models/friend';
import { FriendState } from './friends.reducer';

// TODO: create root app state and pull from that
export const selectFriendState = (state: State) => state.friends; // TODO: state.friends

// export const selectAllFriends = createSelector(
//   selectFriendState,
//   (state: FriendState) => state.friends
// );
// export const selectTotalFriendCount = createSelector(
//   selectAllFriends,
//   (friends: Friend[]) => friends.length
// );
