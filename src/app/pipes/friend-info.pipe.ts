import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../models/friend';

@Pipe({
  name: 'friendInfo',
})
export class FriendInfoPipe implements PipeTransform {
  transform(friend: Friend): string {
    if (!friend) {
      return '';
    }

    return `${friend.name}, ${friend.age} yrs., ${friend.weight} lbs, ${
      friend.friendIds?.length || 0
    } friend(s)`;
  }
}
