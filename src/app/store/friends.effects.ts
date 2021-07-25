import {
  loadFriends,
  loadFriendsSuccess,
  loadFriendsFailure,
} from './friends.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import { Friend } from '../models/friend';

@Injectable()
export class FriendsEffects {
  loadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriends),
      switchMap(() => {
        // TODO: call fake service or in memory api until real service is added
        let friends = [
          {
            name: 'Joe',
            weight: 150,
            age: 31,
            id: 0,
            friendIds: [1],
          } as Friend,
          {
            name: 'Catherine',
            weight: 122,
            age: 30,
            id: 1,
            friendIds: [0],
          } as Friend,
          { name: 'Jack', weight: 175, age: 38, id: 2 } as Friend,
        ];

        return of(friends).pipe(
          map((friends) => loadFriendsSuccess({ friends })),
          // TODO: pass data in
          catchError((error) => of(loadFriendsFailure()))
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}
