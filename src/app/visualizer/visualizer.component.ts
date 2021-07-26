import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Friend } from '../models/friend';
import { State } from '../store';
import { loadFriends } from '../store/friends.actions';
import {
  selectAllFriends,
  selectIsFriendsLoaded,
} from '../store/friends.selectors';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
})
export class VisualizerComponent implements OnInit {
  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));
  friendsIsLoaded$ = this.store.pipe(select(selectIsFriendsLoaded));

  destroySub$: Subject<null> = new Subject();

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.friendsIsLoaded$
      .pipe(
        take(1),
        filter((value) => !value),
        tap(() => this.store.dispatch(loadFriends()))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySub$.next(null);
    this.destroySub$.complete();
  }
}
