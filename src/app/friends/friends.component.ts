import {
  selectTotalFriendCount,
  selectAllFriends,
  selectFriendState,
} from './../store/friends.selectors';
import { loadFriends } from './../store/friends.actions';
import { FriendState } from './../store/friends.reducer';
import { Friend } from './../models/friend';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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

  friendState$: Observable<FriendState> = this.store.select(selectFriendState);
  // friendCount$: Observable<number> = this.store.select(selectTotalFriendCount);
  // friends$: Observable<Friend[]> = this.store.select(selectAllFriends);

  destroySub$: BehaviorSubject<null> = new BehaviorSubject(null);

  constructor(private readonly store: Store<FriendState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadFriends());

    // this.friendCount$
    //   .pipe(
    //     // takeUntil(this.destroySub$),
    //     tap((value) => 'friendcount: ' + console.log(value))
    //   )
    //   .subscribe();

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
