import { loadFriendsSuccess, friendAdded } from './friends.actions';
import { createReducer, on } from '@ngrx/store';
import { Friend } from '../models/friend';

export const friendsFeatureKey = 'friends';

export interface FriendState {
  currentId: number;
  isLoaded: boolean;
  friends: Friend[];
}

export const initialState: FriendState = {
  currentId: 0,
  isLoaded: false,
  friends: [],
};

export const friendReducer = createReducer(
  initialState,
  on(loadFriendsSuccess, (state, action) => ({
    ...state,
    currentId: action.friends.length + 1,
    isLoaded: true,
    friends: [...action.friends],
  })),
  on(friendAdded, (state, action) => {
    let newFriendId = state.currentId;

    return {
      ...state,
      friends: [
        ...state.friends.map((friend) => {
          if (action.friend.friendIds.includes(friend.id)) {
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
        },
      ],
      currentId: state.currentId + 1,
    };
  })
);
