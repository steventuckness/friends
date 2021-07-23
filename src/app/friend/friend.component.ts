import { friendAdded } from './../store/friends.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { State } from '../reducers';
import { Friend } from '../models/friend';
import { Store } from '@ngrx/store';
import { FriendState } from '../store/friends.reducer';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  friendForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    friends: new FormControl(''),
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

  friendsList = [
    'John Smith',
    'Joe',
    'Sarah',
    'Jack',
    'Jill',
    'Renu',
    'Amanda',
    'Sam',
    'Bill',
  ];

  constructor(private store: Store<FriendState>) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  commit(): void {
    console.log('TODO: commit');
    console.log(this.friendForm.value);
    // TODO: dispatch to the parent and have dispatch to store
    this.store.dispatch(
      friendAdded({ friend: { ...this.friendForm.value, friends: {} } })
    );
  }

  remove(): void {
    console.log('TDOO: remove');
  }
}
