import {
  loadFriends,
  loadFriendsSuccess,
  loadFriendsFailure,
} from './friends.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import { HardCodedFriendData } from '../models/hard-coded-friend-data';

@Injectable()
export class FriendsEffects {
  loadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriends),
      switchMap(() => {
        // TODO: call fake service or in memory api until real service is added

        return of(HardCodedFriendData).pipe(
          map((friends) => loadFriendsSuccess({ friends })),
          // TODO: pass data in
          catchError((error) => of(loadFriendsFailure()))
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}
