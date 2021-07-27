import { friendAdded, loadFriendsSuccess } from './friends.actions';
import { Friend } from '../models/friend';
import { friendReducer, initialState, FriendState } from './friends.reducer';

describe('Friends Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = friendReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadFriendsSuccess action', () => {
    it('should load friends', () => {
      const newState = {
        currentId: 3,
        isLoaded: true,
        friends: [
          {
            id: 0,
            name: 'John C',
            age: 83,
            weight: 150,
            friendIds: [],
          },
          {
            id: 1,
            name: 'Sam H',
            age: 15,
            weight: 133,
            friendIds: [3],
          },
        ],
      } as FriendState;

      const action = loadFriendsSuccess({
        friends: [
          {
            id: 0,
            name: 'John C',
            age: 83,
            weight: 150,
            friendIds: [],
          },
          {
            id: 1,
            name: 'Sam H',
            age: 15,
            weight: 133,
            friendIds: [3],
          },
        ],
      });
      const state = friendReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('friendAdded action', () => {
    describe('when there are no other friends', () => {
      it('should return state with a new friend', () => {
        const friends: Array<Friend> = [
          {
            id: 0,
            name: 'John C',
            age: 83,
            weight: 150,
            friendIds: [],
          },
        ];

        const newState = {
          currentId: 1,
          isLoaded: false,
          friends,
        } as FriendState;

        const action = friendAdded({ friend: friends[0] });
        const state = friendReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
      });
    }),
      describe('when there are other friends', () => {
        it('should return state with the new friend', () => {
          const currentState = {
            currentId: 3,
            isLoaded: true,
            friends: [
              {
                id: 0,
                name: 'John C',
                age: 83,
                weight: 150,
                friendIds: [],
              },
              {
                id: 1,
                name: 'Sam H',
                age: 15,
                weight: 133,
                friendIds: [],
              },
              {
                id: 2,
                name: 'Steve M',
                age: 8,
                weight: 70,
                friendIds: [],
              },
            ],
          };

          const newState = {
            currentId: 4,
            isLoaded: true,
            friends: [
              {
                id: 0,
                name: 'John C',
                age: 83,
                weight: 150,
                friendIds: [],
              },
              {
                id: 1,
                name: 'Sam H',
                age: 15,
                weight: 133,
                friendIds: [3],
              },
              {
                id: 2,
                name: 'Steve M',
                age: 8,
                weight: 70,
                friendIds: [3],
              },
              {
                id: 3,
                name: 'Sarah L',
                age: 19,
                weight: 133,
                friendIds: [1, 2],
              },
            ],
          } as FriendState;

          const action = friendAdded({
            friend: {
              id: 3,
              name: 'Sarah L',
              age: 19,
              weight: 133,
              friendIds: [1, 2],
            } as Friend,
          });
          const state = friendReducer(currentState, action);

          expect(state).toEqual(newState);
          expect(state).not.toBe(newState);
        });
      });
  });
});
