import { Friend } from '../models/friend';
import { FriendNode } from '../models/friend-node';
import { FriendsToFriendNodesPipe } from './friends-to-friend-nodes.pipe';

describe('FriendsToFriendNodesPipe', () => {
  it('should create an instance', () => {
    const pipe = new FriendsToFriendNodesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an array of FriendNode when there are friends', () => {
    const friends: Friend[] = [
      {
        name: 'Joe S',
        weight: 150,
        age: 31,
        id: 0,
        friendIds: [1],
      } as Friend,
      {
        name: 'Catherine D',
        weight: 122,
        age: 30,
        id: 1,
        friendIds: [0],
      } as Friend,
    ];

    const expectedNodes: FriendNode[] = [
      { id: 0, group: 0, label: 'Joe S', level: 0 } as FriendNode,
      { id: 1, group: 0, label: 'Catherine D', level: 0 } as FriendNode,
    ];

    const pipe = new FriendsToFriendNodesPipe();
    const result = pipe.transform(friends);
    expect(result).toEqual(expectedNodes);
  });

  it('should return an empty array when there are no friends', () => {
    const pipe = new FriendsToFriendNodesPipe();
    const result = pipe.transform([]);
    expect(result).toEqual([]);
  });
});
