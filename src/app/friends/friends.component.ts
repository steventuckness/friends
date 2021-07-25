import {
  selectAllFriends,
  selectFriendState,
  selectIsFriendsLoaded,
  selectTotalFriendsCount,
} from './../store/friends.selectors';
import { friendAdded, loadFriends } from './../store/friends.actions';
import { Friend } from './../models/friend';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { State } from '../store';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendsForm: FormGroup;
  friendsIsLoaded$ = this.store.pipe(select(selectIsFriendsLoaded));
  friendState$ = this.store.select(selectFriendState);
  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));
  friendCount$: Observable<number> = this.store.pipe(
    select(selectTotalFriendsCount)
  );
  destroySub$: Subject<null> = new Subject();

  constructor(private readonly store: Store<State>, private fb: FormBuilder) {
    this.friendsForm = this.fb.group({
      friends: this.fb.array([this.buildNewFriendForm()]),
    });
  }

  ngOnInit(): void {
    this.friendsIsLoaded$
      .pipe(
        take(1),
        filter((value) => !value),
        tap(() => this.store.dispatch(loadFriends()))
      )
      .subscribe();

    this.friendState$
      .pipe(
        tap((value) => console.log('friendState" ', value)),
        takeUntil(this.destroySub$)
      )
      .subscribe();

    this.friendCount$
      .pipe(
        tap((value) => console.log('friendcount: ' + value)),
        takeUntil(this.destroySub$)
      )
      .subscribe();
  }

  buildNewFriendForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      friends: new FormControl([]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(1000),
      ]),
    });
  }

  addNewFriend(): void {
    this.getFriendsFormArray().push(this.buildNewFriendForm());
  }

  removeLastFriend(): void {
    this.getFriendsFormArray().removeAt(this.getFriendsFormArray().length - 1);
  }

  ngOnDestroy(): void {
    this.destroySub$.next(null);
    this.destroySub$.complete();
  }

  getFriendsFormArray(): FormArray {
    return this.friendsForm.get('friends') as FormArray;
  }

  getFriendsFormArrayControls(): AbstractControl[] {
    return this.getFriendsFormArray().controls;
  }

  commitFriend(event: {
    friend: Friend;
    index: number;
    friends: Friend[];
  }): void {
    this.store.dispatch(
      friendAdded({
        friend: event.friend,
        friends: event.friends,
      })
    );

    this.getFriendsFormArray().removeAt(event.index);
  }

  removePotentialFriend(index: number): void {
    this.getFriendsFormArray().removeAt(index);
  }

  getFormGroup(friend: AbstractControl): FormGroup {
    return friend as FormGroup;
  }
}
