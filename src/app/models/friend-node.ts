import { SimulationNodeDatum } from 'd3';

export interface FriendNode extends SimulationNodeDatum {
  id: number;
  group: number;
  label: string;
  level: number;
  x?: number;
}
