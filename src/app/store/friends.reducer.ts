import { loadFriendsSuccess, friendAdded } from './friends.actions';
import { createReducer, on } from '@ngrx/store';
import { Friend } from '../models/friend';

export const friendsFeatureKey = 'friends';

export interface FriendState {
  areFriendsLoaded: boolean;
  friends: Friend[];
}

export const initialState: FriendState = {
  areFriendsLoaded: false,
  friends: [],
};

export const friendReducer = createReducer(
  initialState,
  on(loadFriendsSuccess, (state, action) => ({
    ...state,
    areFriendsLoaded: true,
    friends: [...action.friends],
  })),
  on(friendAdded, (state, action) => ({
    ...state,
    friends: [...state.friends, action.friend],
  }))
);
