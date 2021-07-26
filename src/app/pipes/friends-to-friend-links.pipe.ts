import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../models/friend';
import { FriendLink } from '../models/friend-link';
import { FriendNode } from '../models/friend-node';

@Pipe({
  name: 'friendsToFriendLinks',
})
export class FriendsToFriendLinksPipe implements PipeTransform {
  transform(friends: Friend[]): FriendLink<FriendNode>[] {
    let links: FriendLink<FriendNode>[] = [];
    friends.forEach((friend) => {
      friend.friendIds.forEach((friendId) => {
        links.push({
          target: friendId,
          source: friend.id,
          strength: 0.1,
        });
      });
    });

    return links;
  }
}
