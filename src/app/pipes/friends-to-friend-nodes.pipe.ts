import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../models/friend';
import { FriendNode } from '../models/friend-node';

@Pipe({
  name: 'friendsToFriendNodes',
})
export class FriendsToFriendNodesPipe implements PipeTransform {
  transform(friends: Friend[]): FriendNode[] {
    if (!friends.length) {
      return [];
    }

    return friends.map((friend) => ({
      id: friend.id,
      group: 0,
      label: friend.name,
      level: 0,
    }));
  }
}
