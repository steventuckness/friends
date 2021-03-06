import {
  selectAllFriends,
  selectIsFriendsLoaded,
} from '../../store/friends.selectors';
import { friendAdded, loadFriends } from '../../store/friends.actions';
import { Friend } from '../../models/friend';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { filter, take, tap } from 'rxjs/operators';
import { State } from '../../store';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  friendsForm: FormGroup;
  friendsIsLoaded$ = this.store.pipe(select(selectIsFriendsLoaded));
  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));
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

  addNewPotentialFriend(): void {
    this.getFriendsFormArray().push(this.buildNewFriendForm());
  }

  removePotentialFriend(index: number): void {
    this.getFriendsFormArray().removeAt(index);
  }

  commitFriend(event: { friend: Friend; index: number }): void {
    this.store.dispatch(
      friendAdded({
        friend: event.friend,
      })
    );

    this.getFriendsFormArray().removeAt(event.index);
  }

  getFriendsFormArray(): FormArray {
    return this.friendsForm.get('friends') as FormArray;
  }

  getFriendsFormArrayControls(): AbstractControl[] {
    return this.getFriendsFormArray().controls;
  }

  getFormGroup(friend: AbstractControl): FormGroup {
    return friend as FormGroup;
  }

  ngOnDestroy(): void {
    this.destroySub$.next(null);
    this.destroySub$.complete();
  }
}
