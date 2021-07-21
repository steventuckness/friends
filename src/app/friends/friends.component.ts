import { Friend } from './../models/friend';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}

  addNewFriend(): void {
    // (this.friendsForm.get('friends') as FormArray)?.push(
    //   new FormControl({} as Friend)
    // );
    this.friends.push('');
    console.log('push');
  }

  removeLastFriend(): void {
    this.friends.pop();
  }
}
