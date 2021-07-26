import { loadFriendsSuccess, friendAdded } from './friends.actions';
import { createReducer, on } from '@ngrx/store';
import { Friend } from '../models/friend';

export const friendsFeatureKey = 'friends';

export interface FriendState {
  currentId: number; // TODO: needs a better name
  isLoaded: boolean;
  friends: Friend[];
}

export const initialState: FriendState = {
  currentId: 6,
  isLoaded: false,
  friends: [],
};

export const friendReducer = createReducer(
  initialState,
  on(loadFriendsSuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    friends: [...action.friends],
  })),
  on(friendAdded, (state, action) => {
    let friendIds = [...action.friends.map((friend) => friend.id)];
    let newFriendId = state.currentId;

    return {
      ...state,
      friends: [
        ...state.friends.map((friend) => {
          if (friendIds.includes(friend.id)) {
            return {
              ...friend,
              friendIds: [...friend.friendIds, newFriendId],
            };
          }
          return friend;
        }),
        {
          ...action.friend,
          id: state.currentId,
          friendIds,
        },
      ],
      currentId: state.currentId + 1,
    };
  })
);
