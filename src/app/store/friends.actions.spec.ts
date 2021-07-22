import * as fromFriends from './friends.actions';

describe('loadFriends', () => {
  it('should return an action', () => {
    expect(fromFriends.loadFriends().type).toBe('[Friends] Load Friends');
  });
});
