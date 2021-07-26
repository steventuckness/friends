import { SimulationLinkDatum } from 'd3';

export interface FriendLink<T> extends SimulationLinkDatum<T> {
  strength: number;
}
