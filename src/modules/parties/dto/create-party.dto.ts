export class CreatePartyDto {
  name: string;
  isPublic: boolean;
  players: string[];
  createdAt: Date;
  moneyToWin: number;
  isWaiting: boolean;
  isStarted: boolean;
}
