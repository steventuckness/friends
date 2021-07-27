import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Friend } from '../models/friend';
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
  }> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}

  removeClicked(): void {
    this.remove.emit(this.index);
  }

  commitClicked(): void {
    this.friendForm.markAllAsTouched();

    if (this.friendForm.valid) {
      this.commit.emit({
        friend: {
          ...this.friendForm.value,
          friends: undefined,
          friendIds: this.friendForm
            .get('friends')
            ?.value.map((friend: Friend) => friend.id),
        },
        index: this.index,
      });
    }
  }
}
