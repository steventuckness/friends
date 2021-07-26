import { Friend } from './friend';

export const HardCodedFriendData: Friend[] = [
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
