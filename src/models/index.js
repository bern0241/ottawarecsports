// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const GameStatusEnum = {
  "NOT_STARTED": "NOT_STARTED",
  "STARTED": "STARTED",
  "CANCELLED": "CANCELLED",
  "SUBMITTED": "SUBMITTED",
  "FINISHED": "FINISHED"
};

const DivisionsEnum = {
  "D": "D",
  "C": "C",
  "B": "B",
  "A": "A",
  "AA": "AA",
  "AAA": "AAA"
};

const { SportsmanshipPoint, Player, Game, Division, Season, League, TeamNote, Team, PlayerNote, DivisionTeam, SoccerTeamStat, SoccerDivisionStat } = initSchema(schema);

export {
  SportsmanshipPoint,
  Player,
  Game,
  Division,
  Season,
  League,
  TeamNote,
  Team,
  PlayerNote,
  DivisionTeam,
  GameStatusEnum,
  DivisionsEnum,
  SoccerTeamStat,
  SoccerDivisionStat
};