import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Friend } from '../models/friend';
import { Store } from '@ngrx/store';
import { FriendState } from '../store/friends.reducer';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  @Input() index = 0;
  @Input() friendForm: FormGroup = new FormGroup({});
  @Input() friends: Friend[] = [];

  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() commit: EventEmitter<{
    friend: Friend;
    index: number;
    friends: Friend[];
  }> = new EventEmitter();

  constructor(private store: Store<FriendState>) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  removeClicked(): void {
    this.remove.emit(this.index);
  }

  commitClicked(): void {
    this.friendForm.markAllAsTouched();

    if (this.friendForm.valid) {
      this.commit.emit({
        friend: { ...this.friendForm.value, friends: undefined },
        index: this.index,
        friends: this.friendForm.get('friends')?.value,
      });
    }
  }
}
