import { loadFriends } from './friends.actions';
import { friendReducer, FriendState } from './friends.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  friends: FriendState;
}

// export const getFriendsState = createFeatureSelector<State>('friends');

export const reducers: ActionReducerMap<State> = {
  friends: friendReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
