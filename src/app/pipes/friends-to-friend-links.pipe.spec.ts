import { FriendsToFriendLinksPipe } from './friends-to-friend-links.pipe';
import { Friend } from '../models/friend';
import { FriendLink } from '../models/friend-link';
import { FriendNode } from '../models/friend-node';

describe('FriendsToFriendLinksPipe', () => {
  it('should create an instance', () => {
    const pipe = new FriendsToFriendLinksPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return array of FriendLink<FriendNode> when there are friends', () => {
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

    const expectedLinks: FriendLink<FriendNode>[] = [
      { target: 1, source: 0, strength: 0.1 } as FriendLink<FriendNode>,
      { target: 0, source: 1, strength: 0.1 } as FriendLink<FriendNode>,
    ];

    const pipe = new FriendsToFriendLinksPipe();
    const result = pipe.transform(friends);
    expect(result).toEqual(expectedLinks);
  });

  it('should return an empty array when there are no friends', () => {
    const pipe = new FriendsToFriendLinksPipe();
    const result = pipe.transform([]);
    expect(result).toEqual([]);
  });
});
