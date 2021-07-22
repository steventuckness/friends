import { Action, createReducer, on } from '@ngrx/store';
import { Friend } from '../models/friend';

export const friendsFeatureKey = 'friends';

export interface State {
  friends: Friend[];
}

export const initialState: State = {
  friends: [],
};

export const reducer = createReducer(initialState);
