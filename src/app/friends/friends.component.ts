import {
  selectAllFriends,
  selectFriendState,
  selectTotalFriendsCount,
} from './../store/friends.selectors';
import { loadFriends } from './../store/friends.actions';
import { FriendState } from './../store/friends.reducer';
import { Friend } from './../models/friend';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { State } from '../store';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsForm = new FormGroup({
    friends: new FormArray([]),
  });

  friends = new Array(1);
  friendState$ = this.store.select(selectFriendState);
  friends$: Observable<Friend[]> = this.store.select(selectAllFriends);
  friendCount$: Observable<number> = this.store.select(selectTotalFriendsCount);

  destroySub$: Subject<null> = new Subject();

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadFriends());

    this.friendState$
      .pipe(tap((value) => console.log('friendState" ', value)))
      .subscribe();
    this.friends$
      .pipe(tap((value) => console.log('friends: ', value)))
      .subscribe();
    this.friendCount$
      .pipe(
        takeUntil(this.destroySub$),
        filter((a) => a !== undefined),
        tap((value) => console.log('friendcount: ' + value))
      )
      .subscribe();

    // TODO: only do once and on a form that needs it...
  }

  addNewFriend(): void {
    // (this.friendsForm.get('friends') as FormArray)?.push(
    //   new FormControl({} as Friend)
    // );
    this.friends.push('');
    console.log('push');

    // TODO: hide as well...
  }

  removeLastFriend(): void {
    this.friends.pop();
  }

  ngOnDestroy(): void {
    this.destroySub$.next(null);
    this.destroySub$.complete();
  }
}
