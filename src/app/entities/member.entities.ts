import { Attempt } from './attempt.entities';
import { Rank } from './test.entities';

interface Dictionary<T> {
  [key: string]: T;
}

export class Member {
  id: string;
  roomId: string;
  login: string;
  email: string;
  isRegistered: boolean;
  isApproved: boolean;
  fields: Dictionary<string>;
  attempts: Attempt[];

  calculated: CalculatedMember;
}

export class CalculatedMember {
  correctPoints: number = 0;
  penalPoints: number = 0;

  correctRatio: number = 0;
  penalRatio: number = 0;

  correctRank: Rank;
  penalRank: Rank;

  timeMinute: number = 0;
}
