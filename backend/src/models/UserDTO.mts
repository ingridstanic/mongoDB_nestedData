import type { GameDTO } from "./GameDTO.mjs";

export type UserDTO = {
  id: number;
  name: string;
  games: GameDTO[];
};
