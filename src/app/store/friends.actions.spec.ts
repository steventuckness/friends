import { Friend } from '../models/friend';
import * as fromFriends from './friends.actions';

describe('loadFriends', () => {
  it('should return an action', () => {
    expect(fromFriends.loadFriends().type).toBe('[Friends] Load Friends');
  });
});

describe('loadFriendsSuccess', () => {
  it('should return an action', () => {
    const friends: Friend[] = [
      {
        id: 0,
        name: 'Tom',
        age: 50,
        weight: 159,
        friendIds: [0, 1, 2],
      } as Friend,
    ];

    const loadFriendsSuccess = fromFriends.loadFriendsSuccess({ friends });

    expect(loadFriendsSuccess.type).toBe('[Friends] Load Friends Success');
    expect(loadFriendsSuccess.friends).toEqual(friends);
  });
});

describe('loadFriendsFailure', () => {
  it('should return an action', () => {
    expect(fromFriends.loadFriendsFailure().type).toBe(
      '[Friends] Load Friends Failure'
    );
  });
});

describe('friendAdded', () => {
  it('should return an action', () => {
    const friend: Friend = {
      id: 0,
      name: 'Tom',
      age: 50,
      weight: 159,
      friendIds: [0, 1, 2],
    } as Friend;

    const friends: Friend[] = [
      {
        name: 'Catherine D',
        weight: 122,
        age: 30,
        id: 1,
        friendIds: [0],
      } as Friend,
      {
        name: 'Jack D',
        weight: 175,
        age: 38,
        id: 2,
        friendIds: [5],
      } as Friend,
    ];

    let friendAdded = fromFriends.friendAdded({
      friend,
      // friends,
    });

    expect(friendAdded.type).toBe('[Friends] Friend Added');
    expect(friendAdded.friend).toEqual(friend);
    // expect(friendAdded.friends).toEqual(friends);
  });
});
