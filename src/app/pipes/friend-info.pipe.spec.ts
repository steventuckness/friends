import { FriendInfoPipe } from './friend-info.pipe';

describe('FriendInfoPipe', () => {
  it('should create an instance', () => {
    const pipe = new FriendInfoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return correctly formatted friend string', () => {
    const pipe = new FriendInfoPipe();
    const friend = {
      id: 0,
      name: 'Joe A',
      age: 31,
      weight: 133,
      friendIds: [0, 1, 2],
    };
    const result = pipe.transform(friend);
    expect(result).toEqual('Joe A, 31 yrs., 133 lbs, 3 friend(s)');
  });
});
