import {
  selectFriendState,
  selectIsFriendsLoaded,
  selectAllFriends,
  selectTotalFriendsCount,
} from './friends.selectors';
import { State } from '.';
import { Friend } from '../models/friend';

describe('Friends Selectors', () => {
  const friends = [
    {
      name: 'Joe S',
      weight: 150,
      age: 31,
      id: 0,
      friendIds: [1, 3, 4],
    } as Friend,
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
    {
      name: 'Mike R',
      weight: 200,
      age: 36,
      id: 3,
      friendIds: [0],
    } as Friend,
    {
      name: 'Sarah H',
      weight: 133,
      age: 19,
      id: 4,
      friendIds: [0],
    } as Friend,
    {
      name: 'Amanda M',
      weight: 125,
      age: 48,
      id: 5,
      friendIds: [2],
    } as Friend,
  ];

  const initialState: State = {
    friends: { currentId: 4, isLoaded: true, friends: friends },
  };

  it('should select the feature state', () => {
    const result = selectFriendState.projector(initialState.friends);
    expect(result).toEqual(initialState.friends);
  });

  it('should select the isLoaded flag', () => {
    const result = selectIsFriendsLoaded.projector(initialState.friends);
    expect(result).toEqual(initialState.friends.isLoaded);
  });

  it('should select the friends collection', () => {
    const result = selectAllFriends.projector(initialState.friends);
    expect(result).toEqual(friends);
  });

  it('should select the total friend count', () => {
    const result = selectTotalFriendsCount.projector(
      initialState.friends.friends
    );
    expect(result).toEqual(friends.length);
  });
});
