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

const GenderEnum = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { PlayersSoccer, Games, Divisions, Seasons, Leagues, TeamNotes, Teams, UserNotes, Users, TeamDivisionStats, PlayerDivisionStats } = initSchema(schema);

export {
  PlayersSoccer,
  Games,
  Divisions,
  Seasons,
  Leagues,
  TeamNotes,
  Teams,
  UserNotes,
  Users,
  GameStatusEnum,
  DivisionsEnum,
  GenderEnum,
  TeamDivisionStats,
  PlayerDivisionStats
};