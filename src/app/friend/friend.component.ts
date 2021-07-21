import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}

  commit(): void {
    console.log('TODO: commit');
  }

  remove(): void {
    console.log('TDOO: remove');
  }
}
